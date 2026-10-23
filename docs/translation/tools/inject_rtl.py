import os,re,sys
SNIP='''
// زبان فارسی و جهت راست‌به‌چپ
document.documentElement.lang = "fa";
document.documentElement.dir = "rtl";
{
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap";
  const rtlStyle = document.createElement("style");
  rtlStyle.textContent = `
    pre, code, kbd, samp { direction: ltr; unicode-bidi: isolate; }
    pre { text-align: left; }
    [dir="rtl"] :not(pre, code, kbd, samp, pre *, code *) { letter-spacing: normal !important; }
    [dir="rtl"] .lucide-arrow-right, [dir="rtl"] .lucide-arrow-left,
    [dir="rtl"] .lucide-chevron-right, [dir="rtl"] .lucide-chevron-left,
    [dir="rtl"] .lucide-chevrons-right, [dir="rtl"] .lucide-chevrons-left,
    [dir="rtl"] .lucide-arrow-up-right, [dir="rtl"] .lucide-external-link { scale: -1 1; }
  `;
  document.head.append(fontLink, rtlStyle);
}
'''
done=0
for d in sorted(os.listdir('ai-sites')):
    for c in ['src/entry.tsx','src/index.tsx','index.tsx','src/main.tsx']:
        p=os.path.join('ai-sites',d,c)
        if os.path.exists(p): break
    else: print('NOENTRY',d); continue
    s=open(p,encoding='utf-8').read()
    if 'documentElement.dir' in s: continue
    lines=s.split('\n'); last=-1
    for i,l in enumerate(lines):
        if re.match(r'^import\b',l) or (last>=0 and i==last+1 and l.startswith(('  ','}'))) : 
            if re.match(r'^import\b',l): last=i
    # handle multi-line imports: advance until line ending with ';' or quote
    j=last
    while j<len(lines) and not re.search(r"""(['"];?\s*$)""",lines[j]): j+=1
    lines.insert(j+1,SNIP.rstrip('\n'))
    open(p,'w',encoding='utf-8').write('\n'.join(lines)); done+=1
print('injected',done)
