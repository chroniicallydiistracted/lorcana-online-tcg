import sys
sys.dont_write_bytecode = True
import contextlib, hashlib, importlib.util, io, json, os, signal, subprocess, tempfile, unittest
from pathlib import Path
from unittest.mock import patch
source = Path(__file__).resolve().parents[2] / 'scripts/db-persistence-proof.py'
spec = importlib.util.spec_from_file_location('proof_review', source)
proof = importlib.util.module_from_spec(spec)
spec.loader.exec_module(proof)

class ProofReview(unittest.TestCase):
    def fixture(self, mode):
        with tempfile.TemporaryDirectory(prefix='lorcana-review-proof-') as folder:
            root=Path(folder)
            for directory in ['docs/validation/runs','docs/validation/logs','.local']:
                (root/directory).mkdir(parents=True)
            (root/'.env.local').write_text('POSTGRES_PASSWORD=fixture-bootstrap-password-long\n')
            (root/'.local/database.json').write_text(json.dumps({'passwords':{'local':{'api':'fixture-role-password-long'},'test':{'api':'fixture-test-password-long'}}}))
            run='RUN-20400101-999'
            calls=[]; handlers={}; fingerprints=0
            secret='synthetic-review-secret-long'
            private='synthetic-private-key-value-long'
            def register(sig, handler):
                previous=handlers.get(sig, signal.SIG_DFL)
                handlers[sig]=handler
                return previous
            def execute(args, **kwargs):
                nonlocal fingerprints
                calls.append(list(args))
                out='';code=0
                if args[:2]==['docker','ps'] and '-a' not in args:
                    out='fixture-workspace\n'
                elif args[:2]==['docker','inspect']:
                    if '.Mounts' in args[3]:
                        out=json.dumps([{'Source':str(root),'Destination':'/workspaces/lorcana-online-tcg'}])
                    else: out='sha256:'+'c'*64
                elif args[0]=='git':
                    out='b'*40
                elif args[:2]==['docker','exec']:
                    if 'sourceFingerprint' in args[-1]:
                        fingerprints+=1
                        if fingerprints==2 and mode=='fingerprint_error': code=1
                        else: out=('d' if fingerprints==2 and mode=='source_changed' else 'a')*64+'\n'
                    elif args[-1]=='--version': out='10.33.0\n'
                    else: out=json.dumps({'node':'24.21.0','platform':'linux','architecture':'x64','user_id':1000})
                elif args[:2]==['docker','volume']:
                    if mode=='remaining': out='fixture-proof-volume\n'
                elif args[:2]==['docker','ps']:
                    if mode=='remaining': out='fixture-proof-container\n'
                elif args[:2]==['docker','compose']:
                    if 'seed' in args:
                        if mode=='timeout':
                            raise subprocess.TimeoutExpired(args,180,output=('partial-proof-output '+secret).encode())
                        if mode in ['SIGTERM','SIGINT']:
                            handlers[getattr(signal,mode)](getattr(signal,mode),None)
                    if 'down' in args and mode=='cleanup_error': code=1
                    if 'logs' in args:
                        out='fixture-role-password-long' if mode=='server_secret' else 'nonprivate server log\n'
                    elif mode=='redaction':
                        out=secret+'\n'+private+'\npostgresql://fixtureuser:fixture-uri-password@postgres/db\n-----BEGIN PRIVATE KEY-----\nfixture-pem-value\n-----END PRIVATE KEY-----\n'
                    else: out='mocked-step-output\n'
                else:
                    raise AssertionError('Unexpected non-mocked command: '+repr(args))
                return subprocess.CompletedProcess(args,code,out)
            with patch.object(proof,'ROOT',root),patch.object(proof.sys,'argv',['db-persistence-proof.py','--id',run]),patch.object(proof.subprocess,'run',execute),patch.object(proof.signal,'signal',register),patch.dict(proof.os.environ,{'SYNTHETIC_REVIEW_SECRET':secret,'SYNTHETIC_REVIEW_PRIVATE_KEY':private},clear=True),contextlib.redirect_stdout(io.StringIO()):
                code=proof.main()
            record=json.loads((root/'docs/validation/runs'/f'{run}.json').read_text())
            log=(root/'docs/validation/logs'/f'{run}.txt').read_text()
            self.assertTrue(any('down' in command for command in calls),'Owned cleanup must be attempted')
            self.assertEqual(record['log_sha256'],hashlib.sha256(log.encode()).hexdigest())
            self.assertNotIn(secret,log);self.assertNotIn(private,log)
            if mode in ['success','redaction']:
                self.assertEqual(code,0);self.assertEqual(record['result'],'passed')
            else:
                self.assertEqual(code,1);self.assertEqual(record['result'],'failed')
            if mode=='timeout':
                self.assertEqual(record['failure_reason'],'timeout')
                self.assertIn('Seed local/test typed markers and journals',log)
                self.assertIn('partial-proof-output [REDACTED]',log)
            if mode in ['SIGTERM','SIGINT']:
                self.assertEqual(record['failure_reason'],'interrupted')
                self.assertEqual(record['signal'],mode)
            if mode in ['fingerprint_error','source_changed']:
                self.assertEqual(record['failure_reason'],'source_changed')
            if mode=='redaction':
                for raw in ['fixture-uri-password','fixture-pem-value']:
                    self.assertNotIn(raw,log)
                self.assertGreater(record['redactions'],0)
            if mode=='server_secret':
                self.assertNotIn('fixture-role-password-long',log)
                self.assertIn('Known private value detected',log)
            self.assertEqual(handlers[signal.SIGINT],signal.SIG_DFL)
            self.assertEqual(handlers[signal.SIGTERM],signal.SIG_DFL)

for mode in ['success','timeout','SIGTERM','SIGINT','fingerprint_error','source_changed','redaction','cleanup_error','remaining','server_secret']:
    setattr(ProofReview,'test_'+mode,lambda self,mode=mode:self.fixture(mode))

if __name__ == '__main__':
    print('Simulated recorder regressions: all Docker/DB commands mocked; no actual persistence proof.')
    unittest.main(verbosity=2)
