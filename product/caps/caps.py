# 모자 썸네일 3장: 크기·위치 통일 + 배경 정리 + 스타 볼캡 색감 보정
from PIL import Image, ImageEnhance
import numpy as np, cv2
D='/mnt/user-data/uploads/Downloads/'
SRC={'33':'idang_cap33_logo.png','763':'idang_cap763_star.png','762':'idang_cap762_kirakira.png'}
N=1080; TARGET=0.50   # 모자 bbox 의 sqrt(가로×세로) 를 캔버스의 50%로

def capmask(a):
    m=(a.min(-1)<245).astype(np.uint8)
    m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((25,25),np.uint8))
    n,lab,st,_=cv2.connectedComponentsWithStats(m)
    k=1+np.argmax(st[1:,cv2.CC_STAT_AREA]); m=(lab==k).astype(np.uint8)
    ff=m.copy()*255; h,w=ff.shape; cv2.floodFill(ff,np.zeros((h+2,w+2),np.uint8),(0,0),128)
    return ((ff!=128)).astype(np.uint8)

def enhance_star(im):
    a=np.array(im).astype(np.float32)
    # 흰 크라운의 보라빛 → 중성 화이트
    wb=np.array([255,255,255])/np.percentile(a.reshape(-1,3)[a.reshape(-1,3).min(1)>200],60,axis=0)
    a=np.clip(a*wb,0,255)
    hsv=cv2.cvtColor(a.astype(np.uint8),cv2.COLOR_RGB2HSV).astype(np.float32)
    # 크라운의 라벤더 그림자 → 중성 (보라·파랑 계열 채도 제거)
    lav=(hsv[...,0]>100)&(hsv[...,0]<160)
    hsv[...,1]=np.where(lav,hsv[...,1]*0.15,hsv[...,1])
    pink=(hsv[...,1]>18)&~lav
    hsv[...,1]=np.where(pink,np.clip(hsv[...,1]*1.45,0,255),hsv[...,1])
    hsv[...,0]=np.where(pink&(hsv[...,0]>150),np.clip(hsv[...,0]+2,0,179),hsv[...,0])   # 살짝 따뜻한 핑크
    out=cv2.cvtColor(hsv.astype(np.uint8),cv2.COLOR_HSV2RGB)
    out=Image.fromarray(out); out=ImageEnhance.Contrast(out).enhance(1.08)
    return out

res={}
for k,f in SRC.items():
    im=Image.open(D+f)
    if im.mode=='RGBA':
        bg=Image.new('RGB',im.size,'white'); bg.paste(im,mask=im.split()[3]); im=bg
    im=im.convert('RGB')
    if k=='763': im=enhance_star(im)
    a=np.array(im).astype(np.float32)
    m=capmask(a)
    soft=cv2.GaussianBlur(cv2.dilate(m,np.ones((9,9),np.uint8)).astype(np.float32),(0,0),3)[...,None]
    a=a*soft+255*(1-soft)          # 모자 밖 배경 = 순백 (희미한 사각 얼룩 제거)
    ys,xs=np.where(m>0); x0,x1,y0,y1=xs.min(),xs.max(),ys.min(),ys.max()
    W,H=im.size
    s=TARGET*N/np.sqrt((x1-x0)*(y1-y0))
    im2=Image.fromarray(np.clip(a,0,255).astype(np.uint8)).resize((round(W*s),round(H*s)),Image.LANCZOS)
    c=Image.new('RGB',(N,N),'white')
    c.paste(im2,(round(N/2-(x0+x1)/2*s),round(N*0.5-(y0+y1)/2*s)))
    c.save(f'cap{k}_thumb.jpg',quality=94); res[k]=c
    print(k,'scale %.3f'%s,'w %.3f h %.3f'%((x1-x0)*s/N,(y1-y0)*s/N))
S=Image.new('RGB',(3*400+20,400),(150,150,150))
for i,k in enumerate(['33','763','762']): S.paste(res[k].resize((400,400)),(i*410,0))
S.save('after.jpg')
