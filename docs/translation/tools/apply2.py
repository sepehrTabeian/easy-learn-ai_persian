# usage: apply2.py "seg1.json:glob1" "seg2.json:glob2" -- files...
import json,sys,glob,re
args=sys.argv[1:]; sep=args.index('--'); pairs=args[:sep]; files=args[sep+1:]
m={}; bad=0
for p in pairs:
    sj,g=p.split(':',1)
    segs=json.load(open(sj,encoding='utf-8'))
    tr={}
    for f in sorted(glob.glob(g)):
        for line in open(f,encoding='utf-8').read().split('\n'):
            if not line.strip(): continue
            i,_,t=line.partition('\t'); tr[int(i)]=t
    miss=[i for i in range(len(segs)) if i not in tr]
    if miss: print('MISSING',sj,miss[:30],len(miss)); sys.exit(1)
    for i,s in enumerate(segs):
        t=tr[i]
        if t=='=': continue
        if s in m: continue
        q=[c for c in '"\'`{}<>\\' if t.count(c)!=s.count(c)]
        if q and not re.match(r'^".*":$',t): print('QUOTE?',sj,i,repr(s[:60]),repr(t[:60])); bad+=1
        m[s]=t
keys=sorted(m,key=len,reverse=True)
pat=re.compile('|'.join(re.escape(k) for k in keys))
for f in files:
    s=open(f,encoding='utf-8').read()
    n=pat.sub(lambda x:m[x.group(0)],s)
    if n!=s: open(f,'w',encoding='utf-8').write(n)
print('applied',len(m),'bad',bad)
