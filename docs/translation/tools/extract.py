# usage: extract.py out.json files...  -> list of unique Chinese segments in order
import re,sys,json
HAN=re.compile(r'[一-鿿　-〿＀-￯]')
SEG=re.compile(r'[^"\'`<>{}\n]+')
out=[];seen=set()
for f in sys.argv[2:]:
    s=open(f,encoding='utf-8').read()
    for m in SEG.finditer(s):
        t=m.group(0)
        if not re.search(r'[一-鿿]',t): continue
        # trim to span from first to last "content" char: keep it tight around han, include ascii words inside
        if '//' in t and not re.search(r'https?://',t): t=t.split('//')[-1]
        if '/*' in t: t=t.split('/*')[-1]
        t=t.strip()
        # strip leading comment markers / jsx punctuation
        t=re.sub(r'^(//+|/\*+|\*+|#+|-\s|\|)\s*','',t).strip()
        t=re.sub(r'\s*(\*/)$','',t).strip()
        if t and t not in seen: seen.add(t); out.append(t)
json.dump(out,open(sys.argv[1],'w',encoding='utf-8'),ensure_ascii=False,indent=0)
print(len(out), sum(len(x) for x in out))
