import { aborted } from "./errors.mjs";

// WSL can announce the Linux listener before Windows localhost forwarding catches up.
// Probe only the launcher's verified loopback URL; never change network settings.
export async function waitForLocalhost(
  url,
  { signal, timeoutMs = 15000 } = {},
) {
  const deadline = Date.now() + timeoutMs;
  do {
    aborted(signal);
    const timeout = AbortSignal.timeout(
      Math.max(1, Math.min(3000, deadline - Date.now())),
    );
    const response = await fetch(url, {
      signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
      redirect: "manual",
    }).catch(() => null);
    const ready =
      response?.ok || response?.status === 302 || response?.status === 303;
    await response?.body?.cancel().catch(() => {});
    aborted(signal);
    if (ready) return true;
    if (Date.now() >= deadline) return false;
    await new Promise((resolve) =>
      setTimeout(resolve, Math.min(250, deadline - Date.now())),
    );
  } while (Date.now() < deadline);
  return false;
}
