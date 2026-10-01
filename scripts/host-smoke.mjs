import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { killTree } from '../src/process.mjs';
import { readHandoff, DESKTOP_ORIGIN } from '../src/handoff.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, '.test-output'); await fs.mkdir(out, { recursive: true });
const runId = randomUUID();
const home = path.join(out, 'windows-dsh-home-' + runId);
const patch = path.join(out, 'host.patch.json');
const probe = path.join(out, 'host-probe.mjs');
const report = path.join(out, `host-tools-${runId}.json`);
await fs.writeFile(probe, `import fs from 'node:fs/promises'; export const inject=['tools','sessionController','workspaceController'];export function apply(ctx){ctx.effect(()=>{const timer=setTimeout(async()=>{try{const {workspace}=await ctx.workspaceController.create({path:process.cwd()});const created=await ctx.sessionController.create({workspaceId:workspace.workspaceId});const {agent,error}=await ctx.sessionController.resolveAgent(created.sessionId);if(error)throw error;const rootTools=ctx.tools.schemas().map(t=>t.name);const agentTools=ctx.tools.schemas(agent).map(t=>t.name);const result=await ctx.tools.execute({name:'wsl_native_status',callId:'wsl-probe',arguments:{},agent,signal:new AbortController().signal});await fs.writeFile(${JSON.stringify(report)},JSON.stringify({rootTools,agentTools,result},null,2));}catch(e){await fs.writeFile(${JSON.stringify(report)},JSON.stringify({error:e.stack}));}},1000);return()=>clearTimeout(timer)})}`);
await fs.writeFile(patch, JSON.stringify([{ insert: [{ id: 'dsh-wsl-native', name: pathToFileURL(path.join(root, 'src/index.mjs')).href, config: { nativeRoot: '/tmp/dsh-wsl-ui-' + runId } }, { id: 'wsl-host-probe', name: pathToFileURL(probe).href }] }]));
const desktopRoot = process.env.DSH_TEST_DESKTOP_ROOT;
const executable = desktopRoot ? path.join(desktopRoot, 'DeepSeek Harness.exe') : process.execPath;
const cli = desktopRoot ? path.join(desktopRoot, 'resources/app.asar/dsh/node_modules/@deepseek-ai/dsh-desktop-host/lib/cli.js') : fileURLToPath(import.meta.resolve('@deepseek-ai/dsh/lib/bin.js'));
const child = spawn(executable, [...(desktopRoot ? ['--expose-internals'] : []), cli, 'web', '--patch', patch, '--no-open', '--port', '0'], { cwd: root, env: { ...process.env, DSH_HOME: home, ...(desktopRoot ? { ELECTRON_RUN_AS_NODE: '1' } : {}) }, stdio: ['pipe','pipe','pipe'], windowsHide: true, detached: process.platform !== 'win32' });
let log = '', ready, stopNative;
const wait = new Promise((resolve,reject) => {
  const timer=setTimeout(()=>reject(Error('Host startup timed out: '+log.slice(-5000))),180000);
  const collect=chunk=>{ log=(log+chunk.toString()).slice(-25000);const m=/dsh web:\s+(http:\/\/127\.0\.0\.1:\d+[^\s]*)/.exec(log);if(m){clearTimeout(timer);resolve(m[1]);} };
  child.stdout.on('data',collect);child.stderr.on('data',collect);
  child.once('error',reject);child.once('exit',code=>{clearTimeout(timer);reject(Error(`Host exit ${code}: ${log.slice(-6000)}`));});
});
try {
  ready = await wait;
  const u=new URL(ready), origin=u.origin;
  const auth=await fetch(ready,{redirect:'manual'}); const cookies=auth.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');
  stopNative = async () => {
    const response = await fetch(origin + '/api/dsh-wsl-native/disconnect', {method:'POST', headers:{Cookie:cookies,'Content-Type':'application/json'}, body:JSON.stringify({type:'client-request',rpcId:'test-cleanup',method:'dsh-wsl-native/disconnect',payload:{}}), signal:AbortSignal.timeout(20000)});
    const body = await response.json(); assert.equal(body.result?.ok, true, 'Test native cleanup failed');
  };
  assert.ok(cookies, 'DSH login exchange did not issue a cookie');
  const api=await fetch(origin+'/dsh-wsl-native/status',{headers:{Cookie:cookies}});const statusBody=await api.text();assert.equal(api.status,200,`status HTTP ${api.status}: ${statusBody.slice(0,1000)}`);const status=JSON.parse(statusBody);assert.equal(status.mode,'windows-host');
  const unauth=await fetch(origin+'/dsh-wsl-native/status');assert.equal(unauth.status,401);
  const rpcBody = JSON.stringify({type:'client-request',rpcId:'panel-test',method:'dsh-wsl-native/status',payload:{}});
  const rpc = await fetch(origin+'/api/dsh-wsl-native/status',{method:'POST',headers:{Cookie:cookies,'Content-Type':'application/json'},body:rpcBody});
  const rpcText=await rpc.text();assert.equal(rpc.status,200,rpcText.slice(0,1000));const rpcData=JSON.parse(rpcText);assert.equal(rpcData.result?.value?.mode,'windows-host',rpcText);
  const rpcDenied=await fetch(origin+'/api/dsh-wsl-native/status',{method:'POST',headers:{'Content-Type':'application/json'},body:rpcBody});assert.equal(rpcDenied.status,401);
  const connect=await fetch(origin+'/dsh-wsl-native/connect',{method:'POST',headers:{Cookie:cookies,'Content-Type':'application/json','X-DSH-WSL-Token':status.csrf},body:JSON.stringify({target:'wsl',distro:process.env.DSH_TEST_DISTRO||'Ubuntu'})});
  const remote=await connect.json();assert.equal(connect.status,200,JSON.stringify(remote));assert.equal(remote.platform,'linux');
  const denied=await fetch(origin+'/dsh-wsl-native/connect',{method:'POST',headers:{Cookie:cookies,'Content-Type':'application/json'},body:'{}'});assert.equal(denied.status,403);
  let toolReport;
  for(let i=0;i<60;i++){try{toolReport=JSON.parse(await fs.readFile(report,'utf8'));break;}catch{await new Promise(resolve=>setTimeout(resolve,500));}}
  assert.ok(toolReport && !toolReport.error, JSON.stringify(toolReport));
  assert.equal(toolReport.agentTools.filter(n=>n.startsWith('wsl_native_')).length,7,JSON.stringify(toolReport));
  assert.equal(toolReport.result.isError,false,JSON.stringify(toolReport.result));
  await fs.writeFile(path.join(out,'host-tools.json'),JSON.stringify(toolReport,null,2));
  await fs.writeFile(path.join(out,'windows-host.json'),JSON.stringify({date:'2026-09-30',dsh:'0.2.0-rc.2',host:status.mode,linux:remote,authenticatedApi:true,officialCarrier:true,unauthenticatedRejected:true,csrfRejected:true},null,2));
  await fs.writeFile(path.join(out,'windows-host-url.txt'),ready,{mode:0o600});
  console.log('PASS Windows DSH 实际加载插件、认证 API、连接 Ubuntu 与 CSRF 检查。');
  if (desktopRoot) {
    const call = async (base, cookie, endpoint, payload = {}) => {
      const response = await fetch(base + '/api/dsh-wsl-native/' + endpoint, { method:'POST', headers:{Cookie:cookie,'Content-Type':'application/json'},
        body:JSON.stringify({type:'client-request',rpcId:'desktop-runtime-check',method:'dsh-wsl-native/'+endpoint,payload}) });
      assert.equal(response.status,200); const result = (await response.json()).result;
      assert.equal(result?.ok,true,JSON.stringify(result?.error)); return result.value;
    };
    const pending = await call(origin,cookies,'native/enter',{distro:process.env.DSH_TEST_DISTRO||'Ubuntu',directory:'/tmp',parentOrigin:DESKTOP_ORIGIN});
    let handoff;
    const until=Date.now()+300000;
    while(Date.now()<until){
      handoff=(await call(origin,cookies,'status')).handoffs.find(item=>item.id===pending.id);
      assert.notEqual(handoff?.state,'failed',handoff?.error);
      if(handoff?.state==='ready')break;
      await new Promise(resolve=>setTimeout(resolve,500));
    }
    assert.equal(handoff?.state,'ready');
    const signed=readHandoff(new URL(handoff.url).hash); assert.equal(signed.parentOrigin,DESKTOP_ORIGIN);
    const linuxOrigin=new URL(handoff.url).origin,login=await fetch(handoff.url,{redirect:'manual'});
    const linuxCookie=login.headers.getSetCookie().map(v=>v.split(';')[0]).join('; '); assert.ok(linuxCookie);
    await call(linuxOrigin,linuxCookie,'environment/adopt',signed);
    const reverse=await call(linuxOrigin,linuxCookie,'connect',{target:'windows'}); assert.equal(reverse.platform,'win32');
    const linuxStatus=await call(linuxOrigin,linuxCookie,'status'); assert.equal(linuxStatus.mode,'wsl-host');
    const manifest=JSON.parse(await fs.readFile(path.join(root,'package.json'),'utf8')); assert.equal(linuxStatus.version,manifest.version);
    const evidence={date:new Date().toISOString(),version:manifest.version,dsh:'0.2.0-rc.2',installedElectronRuntime:true,isolatedTestProfile:true,
      authenticatedWindowsApi:true,signedDesktopHandoff:true,linuxHost:true,reverseWindowsElectronInterop:true,nativeWindowUiClicked:false};
    await fs.writeFile(path.join(out,'desktop-runtime.json'),JSON.stringify(evidence,null,2));
    console.log('PASS 桌面端内置 Electron 运行时、Desktop 签名、完整 Linux DSH 与反向 Windows 互操作。');
  }
  if(process.argv.includes('--keep')){
    const stopFile=path.join(out,'windows-host.stop'); await fs.unlink(stopFile).catch(()=>{});
    console.log('Browser inspection ready; URL saved to .test-output/windows-host-url.txt');
    await new Promise(resolve=>{const timer=setInterval(()=>{fs.access(stopFile).then(()=>{clearInterval(timer);resolve();}).catch(()=>{});},500);process.once('SIGINT',()=>{clearInterval(timer);resolve();});process.once('SIGTERM',()=>{clearInterval(timer);resolve();});});
    await fs.unlink(stopFile).catch(()=>{});
  }
} finally {
  await stopNative?.().catch(error => console.error('Test cleanup:', error.message));
  await fs.writeFile(path.join(out,'windows-host.log'),log.replace(/http:\/\/127\.0\.0\.1:\d+\S*/g,'[local-url-redacted]'));
  child.stdin.end(); await killTree(child);
}
