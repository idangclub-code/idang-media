# 스쿨백 미디움 핫핑크 합성 이미지: 미디움(펄핑크) 누끼 색을 미니 핫핑크로 바꾸고, 로고를 미니의 큐빅 로고로 교체
from PIL import Image
import numpy as np, cv2

A = np.array(Image.open('/mnt/user-data/uploads/Downloads/idang_med_pearl.png').convert('RGBA')).astype(np.float32)
B = np.array(Image.open('/mnt/user-data/uploads/Downloads/idang_mini_hotpink.jpg').convert('RGB')).astype(np.float32)
rgb, al = A[..., :3], A[..., 3]

ref = np.array([231, 218, 221], np.float32)   # 미디움 펄핑크 몸판
tgt = np.array([233, 164, 182], np.float32)   # 미니 핫핑크 몸판
lum = lambda x: 0.299 * x[..., 0] + 0.587 * x[..., 1] + 0.114 * x[..., 2]
m = np.clip((rgb[..., 0] - rgb[..., 1] - 3) / 7, 0, 1) * (al > 0)
import recolor
out = recolor.recolor(rgb, m)

# 기존 금속 로고 지우기
x0, x1, y0, y1 = 2140, 2440, 3240, 3470
box = out[y0:y1, x0:x1]
body = np.median(box.reshape(-1, 3), axis=0)
lm = (np.linalg.norm(box - body, axis=-1) > 14).astype(np.uint8) * 255
lm = cv2.dilate(lm, np.ones((31, 31), np.uint8))
full = np.zeros(out.shape[:2], np.uint8)
full[y0:y1, x0:x1] = lm
img8 = np.clip(out, 0, 255).astype(np.uint8)
inp = cv2.inpaint(cv2.cvtColor(img8, cv2.COLOR_RGB2BGR), full, 15, cv2.INPAINT_TELEA)
out = cv2.cvtColor(inp, cv2.COLOR_BGR2RGB).astype(np.float32)

# 미니 핫핑크 클로즈업의 선명한 큐빅 로고
import logo
out = logo.paste(out, 2290, 3360, 440)

res = np.dstack([np.clip(out, 0, 255), al]).astype(np.uint8)
im = Image.fromarray(res, 'RGBA')
im.save('school_medium_hotpink.png')
bg = Image.new('RGB', im.size, 'white')
bg.paste(im, mask=im.split()[3])
bg.save('school_medium_hotpink.jpg', quality=92)
bg.resize((900, 854)).save('prev.jpg')
bg.crop((1900, 3000, 2700, 3600)).save('prev_logo.jpg')
print('ok')
