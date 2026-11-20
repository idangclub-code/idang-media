// 아이당 직원 릴스 업로드 Edge Function
// env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (자동), REELS_STAFF_CODE (직원 코드)
import { createClient } from "npm:@supabase/supabase-js@2";
const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
import { AwsClient } from "npm:aws4fetch@1.0.20";
const CODE = Deno.env.get("REELS_STAFF_CODE") || "";
// 영상·썸네일은 Cloudflare R2 (idang-reels). 키가 없으면 Supabase 저장소로
const R2_S3 = "https://555dc58398feb45076f2420485876ca1.r2.cloudflarestorage.com/idang-reels";
const R2_PUB = "https://pub-1364e7260edf46f8bcd01dfd03b6a275.r2.dev";
const R2_ID = Deno.env.get("R2_ACCESS_KEY_ID"), R2_KEY = Deno.env.get("R2_SECRET_ACCESS_KEY");
const r2 = R2_ID && R2_KEY ? new AwsClient({ accessKeyId: R2_ID, secretAccessKey: R2_KEY, service: "s3", region: "auto" }) : null;
const r2Put = async (path: string) => (await r2!.sign(new Request(`${R2_S3}/${path}?X-Amz-Expires=3600`, { method: "PUT" }), { aws: { signQuery: true } })).url;
const H = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS", "Content-Type": "application/json" };
const j = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: H });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: H });
  try {
    const b = await req.json();
    // 6자리라 무한 대입 막기: 15분 동안 틀린 코드 20번이면 전체 잠금 (직원도 15분 기다림)
    const since = new Date(Date.now() - 15 * 60e3).toISOString();
    const { count } = await sb.from("reels_fail").select("*", { count: "exact", head: true }).gte("at", since);
    if ((count ?? 0) >= 20) return j({ error: "잠시 잠겼어요. 15분 뒤에 다시 해 주세요" }, 429);
    if (!CODE || b.code !== CODE) { await sb.from("reels_fail").insert({}); return j({ error: "코드가 맞지 않아요" }, 401); }
    // 4개 몰 페이지에 그대로 들어가는 글자라 태그 글자는 뺌
    const clean = (v: unknown, n: number) => String(v ?? "").replace(/[<>"'&`]/g, "").slice(0, n);
    const pub = (p: string) => r2 ? `${R2_PUB}/${p}` : sb.storage.from("reels").getPublicUrl(p).data.publicUrl;
    switch (b.action) {
      case "check": return j({ ok: true });
      case "sign": {
        const id = crypto.randomUUID();
        const d = new Date().toISOString().slice(0, 10);
        const vp = `${d}/${id}.mp4`, pp = `${d}/${id}.jpg`;
        if (r2) return j({ id, video: { path: vp, url: await r2Put(vp) }, poster: { path: pp, url: await r2Put(pp) } });
        const v = await sb.storage.from("reels").createSignedUploadUrl(vp);
        const p = await sb.storage.from("reels").createSignedUploadUrl(pp);
        if (v.error || p.error) throw v.error || p.error;
        return j({ id, video: { path: vp, url: v.data.signedUrl, token: v.data.token }, poster: { path: pp, url: p.data.signedUrl, token: p.data.token } });
      }
      case "create": {
        const products = (Array.isArray(b.products) ? b.products : []).slice(0, 50).map((p: [unknown, unknown]) => [clean(p?.[0], 80), Math.floor(+(p?.[1] ?? 0))]).filter((p: [string, number]) => p[1] > 0);
        const idxs = products.map((p: [string, number]) => p[1]);
        if (!idxs.length) return j({ error: "상품을 골라 주세요" }, 400);
        const P = /^\d{4}-\d{2}-\d{2}\/[0-9a-f-]{36}\.(mp4|jpg)$/;
        if (!P.test(b.video_path || "") || (b.poster_path && !P.test(b.poster_path))) return j({ error: "파일 경로가 이상해요" }, 400);
        const row = { id: b.id, idxs, products, title: clean(b.title, 80), video_path: b.video_path, poster_path: b.poster_path, video_url: pub(b.video_path), poster_url: b.poster_path ? pub(b.poster_path) : "", uploader: clean(b.uploader, 30), sort: Date.now() / 1000 | 0 };
        const { error } = await sb.from("reels").insert(row);
        if (error) throw error;
        return j({ ok: true, row });
      }
      case "products": {
        // 사이트 상품 목록 (공개 상품만) — 12시간 캐시
        const KEY = "_cache/products.json";
        if (!b.refresh) {
          const c = await sb.storage.from("reels").download(KEY);
          if (!c.error) { const o = JSON.parse(await c.data.text()); if (Date.now() - o.at < 12 * 3600e3) return j(o); }
        }
        const list: [number, string][] = []; const MAX = 1300; let i = 1;
        const one = async (n: number) => { try { const r = await fetch(`https://www.idang.club/shop_view/?idx=${n}`); if (r.status !== 200) return; const h = await r.text(); const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1]?.split(" : ")[0].trim(); if (t && t !== "페이지 없음" && t !== "idang club") list.push([n, t]); } catch (_) { /* skip */ } };
        await Promise.all(Array.from({ length: 20 }, async () => { while (i <= MAX) await one(i++); }));
        list.sort((a, b) => a[0] - b[0]);
        const o = { at: Date.now(), products: list.map(([idx, name]) => ({ idx, name })) };
        await sb.storage.from("reels").upload(KEY, new Blob([JSON.stringify(o)], { type: "application/json" }), { upsert: true });
        return j(o);
      }
      case "name": {
        const r = await fetch(`https://www.idang.club/shop_view/?idx=${+b.idx}`); const h = r.status === 200 ? await r.text() : "";
        const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1]?.split(" : ")[0].trim();
        return j({ idx: +b.idx, name: t && t !== "페이지 없음" ? t : "", hidden: !t || t === "페이지 없음" });
      }
      case "list": {
        const { data, error } = await sb.from("reels").select("*").order("created_at", { ascending: false }).limit(200);
        if (error) throw error;
        return j({ rows: data });
      }
      case "update": {
        const u: Record<string, unknown> = {};
        if ("title" in b) u.title = clean(b.title, 80);
        if ("active" in b) u.active = !!b.active;
        if ("sort" in b) u.sort = Math.floor(+b.sort) || 0;
        const { error } = await sb.from("reels").update(u).eq("id", b.id);
        if (error) throw error;
        return j({ ok: true });
      }
      default: return j({ error: "unknown action" }, 400);
    }
  } catch (e) { return j({ error: String((e as Error)?.message || e) }, 500); }
});
