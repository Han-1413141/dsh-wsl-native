import { BridgeError, aborted } from './errors.mjs';
/** Cross-kernel execution cannot inherit the other OS's sandbox. Ask through DSH's own approval seam. */
export async function authorize(ctx, exec, reason) {
  aborted(exec.signal);
  const request = exec.agent ? { session: exec.agent.session } : {};
  const policy = ctx.get('sandboxPolicy')?.resolve(request);
  if (policy?.mode === 'danger-full-access') return;
  const approval = ctx.get('approval');
  if (!approval || !exec.agent) throw new BridgeError('CROSS_OS_PERMISSION', `${reason} 此操作超出当前系统沙箱，需要 DSH 完全访问权限或单次批准。`);
  const outcome = await approval.request({ agent: exec.agent, toolName: exec.name, callId: exec.callId, reason, signal: exec.signal });
  aborted(exec.signal);
  if (outcome !== 'allowed-once') throw new BridgeError('CROSS_OS_PERMISSION', '该跨系统操作未获批准。');
}
