import { runHttpService } from '@lorcana/service-runtime';
try { await runHttpService('match-service', 3002); }
catch { console.error('match-service foundation startup failed'); process.exitCode = 1; }
