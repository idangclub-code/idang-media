# 미니 핫핑크 클로즈업에서 선명한 큐빅 로고를 따서 붙이는 공용 함수
from PIL import Image
import numpy as np, cv2
SRC = np.array(Image.open('/mnt/user-data/uploads/Downloads/idang_mini_hp_logo.png').convert('RGB')).astype(np.float32)
X0, X1, Y0, Y1 = 430, 1110, 400, 700          # 로고 + 여백

def logo_patch():
    S = SRC[Y0:Y1, X0:X1].copy()
    g = cv2.GaussianBlur(S, (0, 0), 25)                     # 가죽의 은은한 명암
    sat = S[..., 0] - S[..., 1]                             # 핑크 가죽은 R-G 가 큼, 금속은 작음
    body_sat = np.median(sat)
    metal = (sat < body_sat * 0.55).astype(np.uint8)
    diff = (np.linalg.norm(S - g, axis=-1) > 30).astype(np.uint8)
    m = metal * 255
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15)))
    # 큰 덩어리만 (로고), 노이즈 제거
    n, lab, st, _ = cv2.connectedComponentsWithStats(m)
    keep = np.zeros_like(m)
    for i in range(1, n):
        if st[i, cv2.CC_STAT_AREA] > 400: keep[lab == i] = 255
    # 구멍 메우기 (큐빅이 금속 테두리 안에 있음)
    keep = cv2.erode(keep, np.ones((2, 2), np.uint8))
    a = cv2.GaussianBlur(keep.astype(np.float32) / 255, (0, 0), 1.6)
    return S, a, g

def paste(out, cx, cy, width, rot=0.0):
    S, a, g = logo_patch()
    ys, xs = np.where(a > 0.5)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    pad = 20
    S = S[y0 - pad:y1 + pad, x0 - pad:x1 + pad]; a = a[y0 - pad:y1 + pad, x0 - pad:x1 + pad]; g = g[y0 - pad:y1 + pad, x0 - pad:x1 + pad]
    sc = width / (x1 - x0)
    W, H = int(S.shape[1] * sc), int(S.shape[0] * sc)
    S = cv2.resize(S, (W, H), interpolation=cv2.INTER_AREA)
    a = cv2.resize(a, (W, H), interpolation=cv2.INTER_AREA)
    g = cv2.resize(g, (W, H), interpolation=cv2.INTER_AREA)
    if rot:
        M = cv2.getRotationMatrix2D((W / 2, H / 2), rot, 1)
        S = cv2.warpAffine(S, M, (W, H), borderMode=cv2.BORDER_REPLICATE)
        a = cv2.warpAffine(a, M, (W, H)); g = cv2.warpAffine(g, M, (W, H), borderMode=cv2.BORDER_REPLICATE)
    px0, py0 = cx - W // 2, cy - H // 2
    reg = out[py0:py0 + H, px0:px0 + W]
    # 그림자: 원본 클로즈업에서 로고 주변이 가죽보다 어두운 정도를 그대로 옮김
    sh = np.clip(1 - (cv2.GaussianBlur(a, (0, 0), 6 * sc + 2) - a).clip(0) * 0.25, 0.85, 1)[..., None]
    reg = reg * sh
    # 금속 톤을 대상 사진 밝기에 맞추기
    tb = np.median(out[py0:py0 + H, px0:px0 + W].reshape(-1, 3), 0)
    sb = np.median(g.reshape(-1, 3), 0)
    k = (0.299 * tb[0] + 0.587 * tb[1] + 0.114 * tb[2]) / (0.299 * sb[0] + 0.587 * sb[1] + 0.114 * sb[2])
    S = np.clip(S * (0.5 + 0.5 * k), 0, 255)
    out[py0:py0 + H, px0:px0 + W] = reg * (1 - a[..., None]) + S * a[..., None]
    return out
