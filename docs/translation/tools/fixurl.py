import json,subprocess,sys
fixed=0
for f in sys.argv[1:]:
    orig=json.loads(subprocess.check_output(['git','show','HEAD:'+f]))
    cur=json.load(open(f,encoding='utf-8'))
    def walk(o,c):
        global fixed
        if isinstance(o,dict):
            for k,kc in zip(list(o),list(c)):
                if k!=kc:
                    walk(o[k],c[kc]); continue
                if k in('url','href','link','benchmarkPaper','codeRepository','dataset','imageUrl','icon','ref') and isinstance(o[k],str) and o[k]!=c.get(k):
                    c[k]=o[k]; fixed+=1
                else: walk(o[k],c[k])
        elif isinstance(o,list):
            for a,b in zip(o,c): walk(a,b)
    walk(orig,cur)
    raw=subprocess.check_output(['git','show','HEAD:'+f]).decode()
    ind=len(raw.split('\n')[1])-len(raw.split('\n')[1].lstrip(' '))
    json.dump(cur,open(f,'w',encoding='utf-8'),ensure_ascii=False,indent=ind)
    open(f,'a').write('\n') if subprocess.check_output(['git','show','HEAD:'+f]).endswith(b'\n') else None
print('fixed',fixed)
