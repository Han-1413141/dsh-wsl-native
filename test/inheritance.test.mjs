import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeInherited, mergePatchLayers, yaml, yamlText } from '../src/inheritance.mjs';
import { remoteWorkspaceGroups } from '../src/native-workspaces.mjs';

test('首次继承主设置，下一次只更新没有在 Linux 中调整的字段', () => {
  const first = mergeInherited({ theme: 'old', localOnly: true }, { theme: 'system', nested: { a: 1, b: 2 } });
  assert.equal(first.value.theme, 'system'); assert.equal(first.value.localOnly, true);
  first.value.nested.a = 9;
  const next = mergeInherited(first.value, { theme: 'dark', nested: { a: 3, b: 4 } }, first.baseline);
  assert.equal(next.value.theme, 'dark'); assert.equal(next.value.nested.a, 9); assert.equal(next.value.nested.b, 4); assert.equal(next.overrides, 1);
});
test('Linux 移除的继承插件不会被补回，主环境删除只移除未调整的值', () => {
  const first = mergeInherited({}, { a: '1', b: '2', c: '3' });
  delete first.value.a; first.value.c = 'custom';
  const next = mergeInherited(first.value, { a: '4' }, first.baseline);
  assert.equal(next.value.a, undefined); assert.equal(next.value.b, undefined); assert.equal(next.value.c, 'custom');
  const empty = mergeInherited({ local: true }, {}, {}); assert.equal(empty.value.local, true);
});
test('账号记录作为整体继承，不混用本机更新的 token 和过期时间，基线只存摘要', () => {
  const first = mergeInherited({}, { version: 1, records: { account: { kind: 'grant', payload: { token: 'test-only-token', expires: 10 } } } });
  first.value.records.account.payload = { token: 'locally-refreshed', expires: 20 };
  const next = mergeInherited(first.value, { version: 1, records: { account: { kind: 'grant', payload: { token: 'source-refreshed', expires: 30 } } } }, first.baseline);
  assert.equal(next.value.records.account.payload.token, 'locally-refreshed'); assert.equal(next.value.records.account.payload.expires, 20);
  assert.ok(!JSON.stringify(next.baseline).includes('token')); assert.ok(Object.values(next.baseline).every(value=>/^[a-f0-9]{64}$/.test(value)));
});
test('Cordis 行按 id 合并，保留 Linux 插件配置的字段级差异', () => {
  const first = mergePatchLayers([], [{ id: 'theme', config: { mode: 'auto', size: 12 } }]);
  first.value[0].config.size = 14;
  const next = mergePatchLayers(first.value, [{ id: 'theme', config: { mode: 'dark', size: 13 } }, { id: 'new-plugin', disabled: false }], first.baseline);
  assert.equal(next.value[0].config.mode, 'dark'); assert.equal(next.value[0].config.size, 14); assert.equal(next.value[1].id, 'new-plugin');
});
test('合并包含特殊对象键的配置时不修改对象原型', () => {
  const merged = mergeInherited({}, JSON.parse('{"__proto__":{"wslTestPollution":true},"constructor":{"prototype":{"unsafe":true}}}'));
  assert.equal({}.wslTestPollution, undefined); assert.equal({}.unsafe, undefined);
  assert.equal(merged.value.__proto__.wslTestPollution, true);
});
test('原生工作区按环境和项目分组，优先显示运行中任务并过滤归档', () => {
  const row = { id: 'same-id', title: '检查项目', cwd: '/home/me/project', workspaceId: 'same-project', updatedAt: 1, archived: false };
  const a = { key: 'a', settings: { distro: 'Ubuntu' }, catalog: { rows: [row, { ...row, id: 'archived', archived: true }] } };
  const b = { key: 'b', settings: { distro: 'Debian' }, catalog: { rows: [{ ...row, running: true }] } };
  const groups = remoteWorkspaceGroups([a, b]); assert.equal(groups.length, 2); assert.equal(groups[0].environment.key, 'b'); assert.equal(groups[1].rows.length, 1);
  assert.equal(remoteWorkspaceGroups([a, b], 'Debian').length, 1);
});

test('配置对象类型变化保留 Linux 覆盖，Cordis 表达式按 YAML 原样保留', () => {
  const first = mergeInherited({}, { item: { path: 'old' } });
  assert.equal(mergeInherited(first.value, { item: 'new' }, first.baseline).value.item, 'new');
  first.value.item = 'local';
  assert.equal(mergeInherited(first.value, { item: { path: 'new' } }, first.baseline).value.item, 'local');
  const text = '- id: example\n  config:\n    expression: !!js "ctx => ({ key: 1 })"\n';
  const config = yaml(text, []), restored = yaml(yamlText(config), []);
  assert.equal(String(restored[0].config.expression), 'ctx => ({ key: 1 })');
  assert.equal(restored[0].config.expression.constructor, config[0].config.expression.constructor);
});
