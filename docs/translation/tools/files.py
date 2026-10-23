import sys,re
pat=re.compile(r'[一-鿿]')
for f in sys.argv[1:]:
    try: s=open(f,encoding='utf-8').read()
    except Exception: continue
    n=len(pat.findall(s))
    if n: print(n, len(s), f)
