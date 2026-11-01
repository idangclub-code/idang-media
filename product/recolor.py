# 펄핑크 가죽을 첨부 클로즈업(미니 핫핑크) 색감으로: 색상·채도·밝기 분포를 그대로 맞추고, 펄 특유의 얼룩 광택은 줄임
import numpy as np, cv2
REF_H, REF_S, REF_V, REF_V10 = 171, 69, 233, 200

def recolor(rgb, m):
    img = np.clip(rgb, 0, 255).astype(np.uint8)
    hsv = cv2.cvtColor(img, cv2.COLOR_RGB2HSV).astype(np.float32)
    V = hsv[..., 2]
    sig = max(img.shape[:2]) / 70
    low = cv2.GaussianBlur(V, (0, 0), sig)
    det = V - low
    sel = m > 0.8
    med, p10 = np.median(low[sel]), np.percentile(low[sel], 10)
    k = (REF_V - REF_V10) / max(med - p10, 1)
    Vo = np.clip(REF_V + (low - med) * k + det * 0.55, 0, 252)
    So = np.clip(REF_S + (REF_V - Vo) * 0.45, 55, 100)
    out = np.dstack([np.full_like(V, REF_H), So, Vo]).astype(np.uint8)
    out = cv2.cvtColor(out, cv2.COLOR_HSV2RGB).astype(np.float32)
    return rgb * (1 - m[..., None]) + out * m[..., None]
