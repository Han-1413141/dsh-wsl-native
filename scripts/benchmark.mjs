import fs from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import { WslService } from '../src/service.mjs';
import { execFileBuffer, wslExecutable } from '../src/connector.mjs';
const service = new WslService({ distro: process.env.DSH_TEST_DISTRO || 'Ubuntu' });
const distro = process.env.DSH_TEST_DISTRO || 'Ubuntu';
const count = 30;
const summary = values => { const s = [...values].sort((a,b) => a-b); return { n: s.length, medianMs: +s[Math.floor(s.length/2)].toFixed(3), p95Ms: +s[Math.ceil(s.length*.95)-1].toFixed(3), minMs: +s[0].toFixed(3), maxMs: +s.at(-1).toFixed(3) }; };
async function measure(fn) { const values = []; for (let i=0;i<count;i++) { const start = performance.now(); await fn(); values.push(performance.now()-start); } return summary(values); }
try {
  const start = performance.now(); const info = await service.ping('wsl', { distro }); const connectMs = performance.now()-start;
  await service.execute('wsl', { executable: '/bin/true' }, { distro });
  // Interleave identical /bin/true workloads to reduce bias from warm/cold drift.
  const resident = [], oneShot = [];
  for(let i=0;i<count;i++) {
    let t=performance.now(); await service.execute('wsl',{executable:'/bin/true'},{distro}); resident.push(performance.now()-t);
    t=performance.now(); await execFileBuffer(wslExecutable(),['--distribution',distro,'--cd','~','--exec','/bin/true']); oneShot.push(performance.now()-t);
  }
  const report = { date: '2026-09-30', description: '本机已启动的 Ubuntu；30 轮交错 /bin/true；不含模型推理与网络请求', nodeWindows: process.version, nodeLinux: info.node, distro, connectMs: +connectMs.toFixed(3), resident: summary(resident), oneWslProcessPerCommand: summary(oneShot), ping: await measure(()=>service.ping('wsl',{distro})), processStarts: service.pool.starts };
  report.medianSpeedup = +(report.oneWslProcessPerCommand.medianMs/report.resident.medianMs).toFixed(2);
  await fs.mkdir('.test-output',{recursive:true}); await fs.writeFile('.test-output/benchmark.json',JSON.stringify(report,null,2)+'\n'); console.log(JSON.stringify(report,null,2));
} finally { await service.close(); }
