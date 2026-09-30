import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { WslService } from '../src/service.mjs';
import { NativeLauncher } from '../src/launcher.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, '.test-output'); await fs.mkdir(out, { recursive: true });
const service = new WslService({ distro: process.env.DSH_TEST_DISTRO || 'Ubuntu', settingsFile: path.join(out, 'native-test-settings.json') });
const launcher = new NativeLauncher(service), distro = service.config.distro;
const loc = await launcher.locations(distro);
const original = (await service.files('wsl','read',{path:loc.patch},{distro})).content;
const probe = `${loc.runtime}/probe-${randomUUID()}.mjs`;
const source = path.join(out, 'native-probe-source.txt'), report = path.join(out, 'native-host-tools.json');
await fs.writeFile(source, 'Windows 文件 ← WSL DSH 实际工具调用');
const reportLinux = (await service.convert(report, 'linux', {distro})).path;
let running;
try {
  await fs.unlink(report).catch(()=>{});
  await service.files('wsl', 'write', {path:probe,content:`import fs from 'node:fs/promises';export const inject=['tools','sessionController'];export function apply(ctx){ctx.effect(()=>{const timer=setTimeout(async()=>{try{const s=await ctx.sessionController.create({cwd:process.cwd()});const {agent,error}=await ctx.sessionController.resolveAgent(s.sessionId);if(error)throw error;const agentTools=ctx.tools.schemas(agent).map(t=>t.name);const result=await ctx.tools.execute({name:'wsl_native_files',callId:'native-probe',arguments:{target:'windows',operation:'read',path:${JSON.stringify(source)}},agent,signal:new AbortController().signal});await fs.writeFile(${JSON.stringify(reportLinux)},JSON.stringify({host:process.platform,agentTools,result},null,2));}catch(e){await fs.writeFile(${JSON.stringify(reportLinux)},JSON.stringify({error:e.stack}));}},1000);return()=>clearTimeout(timer)})}`},{distro});
  const patch=JSON.parse(original);patch[0].insert.push({id:'native-host-probe',name:'file://'+probe});
  await service.files('wsl','write',{path:loc.patch,content:JSON.stringify(patch)},{distro});
  running=await launcher.start({distro,cwd:'/tmp'});
  const origin=new URL(running.url).origin;
  const auth=await fetch(running.url,{redirect:'manual'});const cookies=auth.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert.ok(cookies);
  const rpc=async(endpoint,payload={})=>{const res=await fetch(origin+'/api/dsh-wsl-native/'+endpoint,{method:'POST',headers:{Cookie:cookies,'Content-Type':'application/json'},body:JSON.stringify({type:'client-request',rpcId:'native-test',method:'dsh-wsl-native/'+endpoint,payload})});assert.equal(res.status,200);const body=await res.json();assert.equal(body.result.ok,true,JSON.stringify(body));return body.result.value;};
  const status=await rpc('status');assert.equal(status.mode,'wsl-host');
  const windows=await rpc('connect',{target:'windows'});assert.equal(windows.platform,'win32');
  let toolReport;
  for(let i=0;i<60;i++){try{toolReport=JSON.parse(await fs.readFile(report,'utf8'));break;}catch{await new Promise(r=>setTimeout(r,500));}}
  assert.ok(toolReport&&!toolReport.error,JSON.stringify(toolReport));assert.equal(toolReport.host,'linux');assert.equal(toolReport.result.isError,false,JSON.stringify(toolReport.result));assert.ok(JSON.stringify(toolReport.result).includes('Windows 文件 ← WSL DSH 实际工具调用'));assert.equal(toolReport.agentTools.filter(n=>n.startsWith('wsl_native_')).length,7);
  await fs.writeFile(path.join(out,'native-host.json'),JSON.stringify({date:'2026-09-30',dsh:'0.2.0-rc.2',host:status.mode,windows,windowsBrowserReachable:true,authenticatedApi:true,officialCarrier:true,toolReadWindowsFile:true},null,2));
  await fs.writeFile(path.join(out,'native-host-url.txt'),running.url,{mode:0o600});
  console.log('PASS 完整 Linux DSH 启动、Windows localhost 访问、官方面板通信、标准 Agent 反向读取 Windows 文件。');
  if(process.argv.includes('--keep')) {
    const stopFile=path.join(out,'native-host.stop'); await fs.unlink(stopFile).catch(()=>{});
    await new Promise(resolve=>{const timer=setInterval(()=>{fs.access(stopFile).then(()=>{clearInterval(timer);resolve();}).catch(()=>{});},500);process.once('SIGINT',()=>{clearInterval(timer);resolve();});process.once('SIGTERM',()=>{clearInterval(timer);resolve();});});
    await fs.unlink(stopFile).catch(()=>{});
  }
} finally {
  await launcher.stop().catch(()=>{});
  await service.files('wsl','write',{path:loc.patch,content:original},{distro});
  await service.execute('wsl',{executable:'rm',args:['-f','--',probe],cwd:'/tmp'},{distro});
  await service.close();
}
