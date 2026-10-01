import React from "react";
import styles from "./client.css";
import { TerminalIcon } from "./components.jsx";
import { WslPage } from "./page.jsx";
import { createClientModel } from "./client-session.mjs";
import { createConversations } from "./conversation-model.mjs";
import { installConversationSlots } from "./conversations.jsx";

const PANEL = "dsh-wsl-native";
export const name = "dsh-wsl-native-client";
export const inject = [
  "connection",
  "slots",
  "layout",
  "workspaces",
  "uiWorkspace",
  "sessions",
];
export function apply(ctx) {
  const api = async (endpoint, payload = {}) => {
    const result = await ctx.connection.rpc.call(
      "/api",
      `${PANEL}/${endpoint}`,
      payload,
    );
    if (!result.ok)
      throw Object.assign(
        new Error(result.error?.message || "请求失败，请重试。"),
        { code: result.error?.code },
      );
    return result.value;
  };
  const model = createClientModel(ctx, api);
  model.conversations = createConversations(ctx, api, model);
  installConversationSlots(ctx, model);
  ctx.effect(() => () => model.dispose());
  ctx.effect(() => {
    const style = document.createElement("style");
    style.dataset.dshWslNative = "";
    style.textContent = styles;
    document.head.append(style);
    return () => style.remove();
  });
  ctx.slots.inject("main", () =>
    ctx.slots.register({ name: "main", key: PANEL }, () => (
      <WslPage api={api} ctx={ctx} model={model} />
    )),
  );
  ctx.slots.inject("sidebar.panellist", () =>
    ctx.slots.register(
      {
        name: "sidebar.panellist",
        id: PANEL,
        order: 20,
        label: () => "WSL 与 Windows",
      },
      TerminalIcon,
    ),
  );
}
