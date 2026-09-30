import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { readHandoff } from '../src/handoff.mjs';
async function client(url) {
  const origin = new URL(url).origin;
  const auth = await fetch(url, { redirect: "manual" });
  const cookies = auth.headers
    .getSetCookie()
    .map((v) => v.split(";")[0])
    .join("; ");
  assert.ok(cookies, "DSH authentication exchange");
  return async (endpoint, payload = {}, expectedOk = true) => {
    const response = await fetch(origin + "/api/dsh-wsl-native/" + endpoint, {
      method: "POST",
      headers: { Cookie: cookies, "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "client-request",
        rpcId: "parallel-check",
        method: "dsh-wsl-native/" + endpoint,
        payload,
      }),
    });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.result.ok, expectedOk, JSON.stringify(body.result.error));
    return expectedOk ? body.result.value : body.result.error;
  };
}
const windows = await client(
  (await fs.readFile(".test-output/windows-host-url.txt", "utf8")).trim(),
);
const before = await windows("status");
assert.equal(before.mode, "windows-host");
assert.ok(before.native.running);
const linux = await client(before.native.running.url);
const [windowsState, linuxState, reverse] = await Promise.all([
  windows("status"),
  linux("status"),
  linux("connect", { target: "windows" }),
]);
assert.equal(windowsState.mode, "windows-host");
assert.equal(linuxState.mode, "wsl-host");
assert.equal(reverse.platform, "win32");
const signed = readHandoff(new URL(before.native.running.openUrl).hash);
assert.ok(signed?.proof);
const invalid = await linux('environment/adopt', { ...signed, directory: '/tampered-workspace' }, false);
assert.equal(invalid.code, 'HANDOFF_INVALID');
const started = performance.now();
const entered = await windows("native/enter", { ...before.settings });
let after, handoff;
for (let i = 0; i < 100; i++) {
  after = await windows("status");
  handoff = after.handoffs.find((item) => item.id === entered.id);
  if (handoff?.state === "ready") break;
  assert.notEqual(handoff?.state, "failed", handoff?.error);
  await new Promise((r) => setTimeout(r, 10));
}
assert.equal(handoff.state, "ready");
assert.equal(after.native.running.id, before.native.running.id);
const first = before.handoffs.find((item) => item.state === "ready");
const report = {
  date: new Date().toISOString(),
  version: windowsState.version,
  windowsHost: windowsState.mode,
  linuxHost: linuxState.mode,
  simultaneousAuthenticatedHosts: true,
  reverseWindowsInterop: true,
  warmInstanceReused: true,
  tamperedHandoffRejected: true,
  nativeId: after.native.running.id,
  warmEnterApiMs: +(performance.now() - started).toFixed(1),
  coldEnterApiMs: first ? first.readyAt - first.startedAt : null,
  sameLinuxDirectory:
    windowsState.settings.directory === linuxState.settings.directory,
  windowsDirectory: windowsState.settings.directory,
  linuxDirectory: linuxState.settings.directory,
};
await fs.writeFile(
  ".test-output/parallel-host.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
