import re,sys,pathlib
B=r'(?<=[\s"\'`:{(])'
E=r'(?=[\s"\'`})])'
V=r'(\[[^\]\s]+\]|[0-9.]+|px|auto|full|1/2|1/3|2/3|1/4|3/4)'
subs=[
 (re.compile(B+r'(-?)m([lr])-'+V+E), lambda m:f"{m[1]}m{'s' if m[2]=='l' else 'e'}-{m[3]}"),
 (re.compile(B+r'p([lr])-'+V+E), lambda m:f"p{'s' if m[1]=='l' else 'e'}-{m[2]}"),
 (re.compile(B+r'(-?)(left|right)-'+V+E), lambda m:f"{m[1]}{'start' if m[2]=='left' else 'end'}-{m[3]}"),
 (re.compile(B+r'text-(left|right)'+E), lambda m:f"text-{'start' if m[1]=='left' else 'end'}"),
 (re.compile(B+r'border-([lr])(-[0-9]+|-\[[^\]]+\])?'+E), lambda m:f"border-{'s' if m[1]=='l' else 'e'}{m[2] or ''}"),
 (re.compile(B+r'rounded-([lr])(-[a-z0-9]+|-\[[^\]]+\])?'+E), lambda m:f"rounded-{'s' if m[1]=='l' else 'e'}{m[2] or ''}"),
 (re.compile(B+r'rounded-([tb])([lr])(-[a-z0-9]+|-\[[^\]]+\])?'+E), lambda m:f"rounded-{'s' if m[1]=='t' else 'e'}{'s' if m[2]=='l' else 'e'}{m[3] or ''}"),
 (re.compile(B+r'space-x-([0-9.]+)'+E), lambda m:f"space-x-{m[1]} rtl:space-x-reverse"),
]
tot=0
for f in sys.argv[1:]:
    p=pathlib.Path(f); s=p.read_text(encoding='utf-8'); o=s
    for r,fn in subs:
        s,n=r.subn(fn,s); tot+=n
    if s!=o: p.write_text(s,encoding='utf-8')
print(tot)
