import { createHmac, timingSafeEqual } from "node:crypto";
const MAX_AGE = 24 * 60 * 60 * 1000;
function payload(value) {
  const settings = value.settings || value;
  return JSON.stringify([
    value.id,
    settings.distro,
    settings.user,
    settings.directory,
    value.parentOrigin || null,
    value.issuedAt,
  ]);
}
export function signHandoff(value, secret, now = Date.now()) {
  const result = { ...value, issuedAt: now };
  result.proof = createHmac("sha256", secret)
    .update(payload(result))
    .digest("hex");
  return result;
}
export function verifyHandoff(value, secret, now = Date.now()) {
  if (
    !secret ||
    !Number.isSafeInteger(value.issuedAt) ||
    value.issuedAt > now + 120000 ||
    now - value.issuedAt > MAX_AGE ||
    typeof value.proof !== "string" ||
    !/^[a-f0-9]{64}$/.test(value.proof)
  )
    return false;
  const expected = createHmac("sha256", secret).update(payload(value)).digest();
  return timingSafeEqual(expected, Buffer.from(value.proof, "hex"));
}
