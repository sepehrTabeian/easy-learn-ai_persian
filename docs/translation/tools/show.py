import json,sys
a=json.load(open(sys.argv[1]));i,j=int(sys.argv[2]),int(sys.argv[3])
for k in range(i,min(j,len(a))): print(k,a[k].replace('\n','\\n'))
