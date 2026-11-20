// 아이당 직원 릴스 업로드 Edge Function
// env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (자동), REELS_STAFF_CODE (직원 코드)
import { createClient } from "npm:@supabase/supabase-js@2";
const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const CODE = Deno.env.get("REELS_STAFF_CODE") || "";
const H = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS", "Content-Type": "application/json" };
const j = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: H });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: H });
  try {
    const b = await req.json();
    if (!CODE || b.code !== CODE) return j({ error: "코드가 맞지 않아요" }, 401);
    const pub = (p: string) => sb.storage.from("reels").getPublicUrl(p).data.publicUrl;
    switch (b.action) {
      case "check": return j({ ok: true });
      case "sign": {
        const id = crypto.randomUUID();
        const d = new Date().toISOString().slice(0, 10);
        const vp = `${d}/${id}.mp4`, pp = `${d}/${id}.jpg`;
        const v = await sb.storage.from("reels").createSignedUploadUrl(vp);
        const p = await sb.storage.from("reels").createSignedUploadUrl(pp);
        if (v.error || p.error) throw v.error || p.error;
        return j({ id, video: { path: vp, url: v.data.signedUrl, token: v.data.token }, poster: { path: pp, url: p.data.signedUrl, token: p.data.token } });
      }
      case "create": {
        const idxs = (b.products || []).map((p: [string, number]) => +p[1]).filter((n: number) => n > 0);
        if (!idxs.length) return j({ error: "상품을 골라 주세요" }, 400);
        const row = { id: b.id, idxs, products: b.products, title: String(b.title || "").slice(0, 80), video_path: b.video_path, poster_path: b.poster_path, video_url: pub(b.video_path), poster_url: b.poster_path ? pub(b.poster_path) : "", uploader: String(b.uploader || "").slice(0, 30), sort: Date.now() / 1000 | 0 };
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
        for (const k of ["title", "active", "sort"]) if (k in b) u[k] = b[k];
        const { error } = await sb.from("reels").update(u).eq("id", b.id);
        if (error) throw error;
        return j({ ok: true });
      }
      default: return j({ error: "unknown action" }, 400);
    }
  } catch (e) { return j({ error: String((e as Error)?.message || e) }, 500); }
});
