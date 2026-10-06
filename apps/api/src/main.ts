import { runHttpService } from '@lorcana/service-runtime';
try { await runHttpService('api', 3001); }
catch { console.error('api foundation startup failed'); process.exitCode = 1; }
