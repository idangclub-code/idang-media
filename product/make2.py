# 스쿨백 미디움 핫핑크 — 측면(사선) 누끼: 펄핑크 → 핫핑크 + 미니 큐빅 로고 합성
from PIL import Image
import numpy as np, cv2, sys
A = np.array(Image.open('/mnt/user-data/uploads/Downloads/idang_med_angle.png').convert('RGB')).astype(np.float32)
B = np.array(Image.open('/mnt/user-data/uploads/Downloads/idang_mini_hotpink.jpg').convert('RGB')).astype(np.float32)
sc = float(sys.argv[1]) if len(sys.argv) > 1 else 0.72
ref = np.array([240, 226, 232], np.float32)
tgt = np.array([233, 164, 182], np.float32) * (240/231)   # 앞면과 같은 밝기 비율로
lum = lambda x: 0.299*x[...,0] + 0.587*x[...,1] + 0.114*x[...,2]
m = np.clip((A[...,0]-A[...,1]-3)/7, 0, 1)
import recolor
out = recolor.recolor(A, m)
# 기존 금속 로고 지우기
x0,x1,y0,y1 = 1490,1735,3045,3260
box = out[y0:y1,x0:x1]; body = np.median(box.reshape(-1,3),0)
L = lum(A[y0:y1,x0:x1]).astype(np.uint8)
bl = cv2.medianBlur(L, 61).astype(np.float32)
lm = (((np.abs(L.astype(np.float32)-bl) > 7) | (m[y0:y1,x0:x1] < 0.6))).astype(np.uint8)*255
lm = cv2.morphologyEx(lm, cv2.MORPH_OPEN, np.ones((3,3),np.uint8))
lm = cv2.dilate(lm, np.ones((13,13),np.uint8))
full = np.zeros(out.shape[:2],np.uint8); full[y0:y1,x0:x1] = lm
img8 = np.clip(out,0,255).astype(np.uint8)
out = cv2.cvtColor(cv2.inpaint(cv2.cvtColor(img8,cv2.COLOR_RGB2BGR), full, 15, cv2.INPAINT_TELEA), cv2.COLOR_BGR2RGB).astype(np.float32)
# 미니 핫핑크 클로즈업의 선명한 큐빅 로고
import logo
out = logo.paste(out, 1612, 3160, 285)

o = Image.fromarray(np.clip(out,0,255).astype(np.uint8))
o.save('school_medium_hotpink_angle.jpg', quality=92)
o.resize((o.width*600//o.height,600)).save('prev2.jpg')
o.crop((1350,2950,1900,3350)).save('prev2_logo.jpg')
print('ok')
