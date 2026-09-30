import { ensure } from './errors.mjs';

/** Keep paging offsets on character boundaries, including 4-byte GB18030 characters. */
export function decodeChunk(data, encoding, eof) {
  if (encoding === 'base64') return { content: data.toString('base64'), bytes: data.length };
  let length = data.length;
  if (!eof) {
    let i = 0;
    while (i < data.length) {
      const first = data[i]; let width = 1;
      if (encoding === 'utf8') width = first < 0x80 ? 1 : first >= 0xc2 && first <= 0xdf ? 2 : first >= 0xe0 && first <= 0xef ? 3 : first >= 0xf0 && first <= 0xf4 ? 4 : 1;
      else if (first >= 0x81 && first <= 0xfe) width = data[i + 1] >= 0x30 && data[i + 1] <= 0x39 ? 4 : 2;
      if (i + width > data.length) { length = i; break; } i += width;
    }
    ensure(length > 0 || data.length === 0, 'LIMIT_TOO_SMALL', 'limit 无法容纳一个完整字符，请使用至少 4 字节。');
  }
  try { return { content: new TextDecoder(encoding === 'utf8' ? 'utf-8' : encoding, { fatal: true }).decode(data.subarray(0, length)), bytes: length }; }
  catch { throw Object.assign(new Error('文本编码或 offset 无效。请指定实际编码，或使用 base64 读取二进制。'), { code: 'INVALID_ENCODING' }); }
}
