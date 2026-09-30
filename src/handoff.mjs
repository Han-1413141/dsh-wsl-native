// Network destinations remain loopback-only. Desktop is an allowed parent, never a server URL.
export const DESKTOP_ORIGIN = "dsh-app://app";
export function appOrigin(value) {
  if (value === DESKTOP_ORIGIN || value === DESKTOP_ORIGIN + "/") return DESKTOP_ORIGIN;
  return localOrigin(value);
}
export function parentUrl(origin) {
  return appOrigin(origin) === DESKTOP_ORIGIN ? "dsh://open" : localOrigin(origin);
}
export function localOrigin(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      !["http:", "https:"].includes(url.protocol) ||
      !["127.0.0.1", "localhost", "[::1]"].includes(url.hostname) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== "/"
    )
      return null;
    return url.origin;
  } catch {
    return null;
  }
}
export function handoffUrl(url, handoff) {
  const destination = new URL(url);
  if (!localOrigin(destination.origin))
    throw new Error("DSH 未返回有效的本机地址。");
  destination.hash =
    "dsh-wsl=" +
    encodeURIComponent(
      JSON.stringify({
        id: handoff.id,
        ...handoff.settings,
        parentOrigin: appOrigin(handoff.parentOrigin),
        ...(handoff.proof
          ? { issuedAt: handoff.issuedAt, proof: handoff.proof }
          : {}),
      }),
    );
  return destination.href;
}
export function readHandoff(hash) {
  if (!hash?.startsWith("#dsh-wsl=") || hash.length > 16000) return null;
  try {
    const p = JSON.parse(decodeURIComponent(hash.slice(9)));
    if (
      typeof p.id !== "string" ||
      p.id.length > 100 ||
      typeof p.distro !== "string" ||
      typeof p.user !== "string" ||
      typeof p.directory !== "string" ||
      !p.directory.startsWith("/") ||
      /[\x00-\x1f]/.test(p.directory)
    )
      return null;
    return {
      id: p.id,
      distro: p.distro,
      user: p.user,
      directory: p.directory,
      parentOrigin: appOrigin(p.parentOrigin),
      ...(p.proof ? { issuedAt: p.issuedAt, proof: p.proof } : {}),
    };
  } catch {
    return null;
  }
}
