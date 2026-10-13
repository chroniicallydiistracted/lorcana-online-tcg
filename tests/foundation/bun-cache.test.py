import pathlib,tempfile,subprocess,hashlib,os,sys
root=pathlib.Path(__file__).resolve().parents[2];s=(pathlib.Path(sys.argv[1]) if len(sys.argv)>1 else root/'.devcontainer/Dockerfile').read_text();block=s.split('    && if ! printf',1)[1].split('    && python3',1)[0]
block='if ! printf'+block;block=block.replace('\\\n',' ').strip()
for scenario in ['valid_cache','corrupt_complete','range_rejected','resume_range33','resume_bad36','timeout','repeated_corruption']:
 with tempfile.TemporaryDirectory(prefix='lorcana-bun-cache-proof-') as folder:
  d=pathlib.Path(folder);cache=d/'archive.zip';good=b'pinned-fixture-archive';sha=hashlib.sha256(good).hexdigest();(d/'good').write_bytes(good)
  if scenario=='valid_cache':cache.write_bytes(good)
  if scenario in ['corrupt_complete','range_rejected','resume_range33','resume_bad36','timeout','repeated_corruption']:(d/'archive.zip.part').write_bytes(b'corrupt-prefix')
  curl=d/'curl';curl.write_text('''#!/bin/sh
printf 'call\\n' >> "$CACHE_CALLS"
while [ "$#" -gt 0 ]; do if [ "$1" = -o ]; then shift; target=$1; fi; shift; done
n=$(wc -l < "$CACHE_CALLS")
if [ "$n" -gt 1 ] && [ -e "$target" ]; then exit 91; fi
case "$CACHE_SCENARIO" in
 timeout) exit 28;;
 range_rejected) if [ "$n" -eq 1 ]; then exit 22; fi;;
 resume_range33) if [ "$n" -eq 1 ]; then exit 33; fi;;
 resume_bad36) if [ "$n" -eq 1 ]; then exit 36; fi;;
 corrupt_complete) if [ "$n" -eq 1 ]; then printf corrupt > "$target"; exit 0; fi;;
 repeated_corruption) printf corrupt > "$target"; exit 0;;
esac
cp "$CACHE_GOOD" "$target"
''');curl.chmod(0o755)
  calls=d/'calls';env=dict(os.environ,PATH=str(d)+':'+os.environ['PATH'],CACHE_CALLS=str(calls),CACHE_GOOD=str(d/'good'),CACHE_SCENARIO=scenario,task_bun_archive=str(cache),task_bun_sha=sha,task_bun_arch='x64')
  result=subprocess.run(['sh','-c',block],env=env,capture_output=True,text=True);n=len(calls.read_text().splitlines()) if calls.exists() else 0
  if scenario in ['valid_cache','corrupt_complete','range_rejected','resume_range33','resume_bad36']:
   assert result.returncode==0,(scenario,result.stderr);assert cache.read_bytes()==good;assert n==(0 if scenario=='valid_cache' else 2)
  elif scenario=='timeout':assert result.returncode==28;assert (d/'archive.zip.part').read_bytes()==b'corrupt-prefix';assert n==1
  else:assert result.returncode!=0;assert not cache.exists();assert not (d/'archive.zip.part').exists();assert n==2
  print('PASS simulated Dockerfile cache branch:',scenario,'attempts',n)
print('Simulation only: exact checked-in shell branch, mocked network; no cache/image/network mutated.')
