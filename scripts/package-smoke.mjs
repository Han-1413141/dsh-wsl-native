import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { runProcess, killTree } from '../src/process.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const manifest=JSON.parse(await fs.readFile(path.join(root,'package.json'),'utf8'));
const home=await fs.mkdtemp(path.join(os.tmpdir(),'dsh-wsl-package-'));
const cli=fileURLToPath(import.meta.resolve('@deepseek-ai/dsh/lib/bin.js'));
const env={...process.env,DSH_HOME:home};
let child,log='';
try {
  const install=await runProcess(process.execPath,[cli,'plugin','--profile','web','add',path.join(root,'dist',`${manifest.name}-${manifest.version}.tgz`)],{cwd:home,env,timeoutMs:180000});
  assert.equal(install.exitCode,0,install.stderr+install.stdout);
  child=spawn(process.execPath,[cli,'web','--no-open','--port','0'],{cwd:home,env,windowsHide:true,stdio:['pipe','pipe','pipe'],detached:process.platform!=='win32'});
  const url=await new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>reject(Error('Packaged host startup timed out: '+log.slice(-4000))),90000);
    const collect=c=>{log=(log+c.toString()).slice(-24000);const m=/dsh web:\s+(http:\/\/127\.0\.0\.1:\d+[^\s]*)/.exec(log);if(m){clearTimeout(timer);resolve(m[1]);}};
    child.stdout.on('data',collect);child.stderr.on('data',collect);child.once('error',reject);child.once('exit',code=>{clearTimeout(timer);reject(Error(`exit ${code}: ${log.slice(-4000)}`));});
  });
  const origin=new URL(url).origin,auth=await fetch(url,{redirect:'manual'}),cookies=auth.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');
  const response=await fetch(origin+'/api/dsh-wsl-native/status',{method:'POST',headers:{Cookie:cookies,'Content-Type':'application/json'},body:JSON.stringify({type:'client-request',rpcId:'package-test',method:'dsh-wsl-native/status',payload:{}})});
  assert.equal(response.status,200);const result=await response.json();assert.equal(result.result?.value?.mode,'windows-host',JSON.stringify(result));
  assert.equal(result.result.value.version,manifest.version,'Installed plugin version does not match package manifest');
  assert.equal(result.result.value.native.inheritance.available, true, 'Host profileContext must enable inheritance');
  assert.equal(result.result.value.native.inheritance.source, 'web');
  assert.equal(result.result.value.preferences.autoStartWsl, false);
  const preferenceResponse = await fetch(origin+'/api/dsh-wsl-native/preferences', { method: 'POST',
    headers: { Cookie: cookies, 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'client-request', rpcId: 'preference-test',
      method: 'dsh-wsl-native/preferences', payload: { autoStartWsl: true } }) });
  assert.equal(preferenceResponse.status, 200);
  assert.equal((await preferenceResponse.json()).result?.value?.autoStartWsl, true);
  const evidence={date:new Date().toISOString(),package:`${manifest.name}@${manifest.version}`,officialPluginInstall:true,profileOutsideSourceTree:true,authenticatedApi:true,officialProfileContext:true};
  await fs.writeFile(path.join(root,'.test-output','package-install.json'),JSON.stringify(evidence,null,2));
  console.log('PASS tgz 通过官方 dsh plugin 安装到源码目录外的独立配置，宿主加载和认证接口正常。');
} finally {
  if(child){child.stdin.end();await killTree(child);}
  const resolved=await fs.realpath(home);assert.ok(resolved.startsWith(path.join(os.tmpdir(),'dsh-wsl-package-')));
  await fs.rm(resolved,{recursive:true,force:true,maxRetries:5,retryDelay:300});
}
