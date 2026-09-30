import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { once } from "node:events";
import { waitForLocalhost } from "../src/localhost.mjs";

test("localhost 先未就绪、稍后返回认证跳转时等待成功", async () => {
  let calls = 0;
  const server = http.createServer((_req, res) => {
    calls++;
    res.writeHead(calls < 3 ? 503 : 302, { Location: "/" });
    res.end();
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  try {
    assert.equal(
      await waitForLocalhost(`http://127.0.0.1:${server.address().port}/`, {
        timeoutMs: 3000,
      }),
      true,
    );
    assert.equal(calls, 3);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});

test("localhost 长时间不可用时按时返回，取消信号立即结束等待", async () => {
  const server = http.createServer((_req, res) => {
    res.writeHead(503);
    res.end();
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const url = `http://127.0.0.1:${server.address().port}/`;
  try {
    assert.equal(await waitForLocalhost(url, { timeoutMs: 80 }), false);
    const controller = new AbortController();
    const pending = waitForLocalhost(url, { signal: controller.signal });
    controller.abort();
    await assert.rejects(pending, { code: "ABORTED" });
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});
