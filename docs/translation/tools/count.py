import sys,re,subprocess,collections
files=subprocess.check_output(['git','ls-files'],text=True).split('\n')
pat=re.compile(r'[一-鿿]')
tot=0;bydir=collections.Counter();nf=collections.Counter()
for f in files:
    if not f: continue
    try: s=open(f,encoding='utf-8').read()
    except Exception: continue
    n=len(pat.findall(s))
    if n:
        tot+=n
        d='/'.join(f.split('/')[:2]) if not f.startswith('public/') else '/'.join(f.split('/')[:2])
        bydir[d]+=n; nf[d]+=1
print('total han chars',tot,'files',sum(nf.values()))
for d,n in bydir.most_common(60): print(n,nf[d],d)
