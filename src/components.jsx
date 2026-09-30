import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  Modal,
  StateDot,
  IconChevronDownOutlineRegular,
  IconChevronLeftOutlineMedium,
  IconChevronRightOutlineRegular,
  IconFolderCloseRegular,
  IconFolderOpenOutlineRegular,
  IconRefreshOutlineRegular,
} from "@deepseek-ai/dsh-client-ui-primitives";

function TerminalIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4.5" width="18" height="15" rx="3" />
      <path d="m7 9 3 3-3 3m6 0h4" />
    </svg>
  );
}
function SystemIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="13" rx="2.5" />
      <path d="M8 21h8m-4-4v4" />
    </svg>
  );
}
function OpenIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 4h6v6m0-6L10 14m0-10H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    </svg>
  );
}
function Badge({ state = "idle", children }) {
  return (
    <span className="dsh-wsl-badge">
      <StateDot state={state} size={state === "ongoing" ? 12 : 7} />
      {children}
    </span>
  );
}
function normalized(settings, distros = []) {
  return {
    distro:
      settings.distro ||
      distros.find((d) => d.isDefault)?.name ||
      distros[0]?.name ||
      "",
    user: settings.user || "",
    directory: settings.directory || "",
  };
}
const parentPath = (path) =>
  path.replace(/\/+$/, "").replace(/\/[^/]*$/, "") || "/";
const joinPath = (path, name) => `${path.replace(/\/+$/, "")}/${name}`;
function directoryError(error) {
  if (/ENOENT/.test(error.message))
    return "找不到这个文件夹，请检查路径后重试。";
  if (/EACCES|EPERM/.test(error.message))
    return "当前 Linux 用户没有权限读取这个文件夹。";
  if (/ENOTDIR/.test(error.message))
    return "这个路径指向文件，请选择一个文件夹。";
  return error.message;
}

function DirectoryPicker({
  api,
  distro,
  user,
  initialPath,
  onClose,
  onSelect,
}) {
  const [listing, setListing] = useState(null);
  const [path, setPath] = useState(initialPath);
  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const request = useRef(0);
  const load = useCallback(
    async (destination, offset = 0, showHidden = false) => {
      const id = ++request.current;
      setLoading(true);
      setError("");
      try {
        const home = destination
          ? null
          : await api("connect", { distro, user });
        const result = await api("browse", {
          distro,
          user,
          path: destination || home.home,
          offset,
          hidden: showHidden,
        });
        if (id !== request.current) return;
        setListing((previous) => ({
          ...result,
          entries: offset
            ? [...(previous?.entries || []), ...result.entries]
            : result.entries,
        }));
        setPath(result.path);
      } catch (e) {
        if (id === request.current) setError(directoryError(e));
      } finally {
        if (id === request.current) setLoading(false);
      }
    },
    [api, distro, user],
  );
  useEffect(() => {
    void load(initialPath);
    return () => {
      request.current++;
    };
  }, [load, initialPath]);
  const folders = (listing?.entries || [])
    .filter((entry) => entry.type === "directory" || entry.type === "symlink")
    .sort((a, b) => a.name.localeCompare(b.name, "zh-CN", { numeric: true }));
  const navigate = (destination) => {
    void load(destination, 0, hidden);
  };
  return (
    <Modal
      open
      onClose={onClose}
      title="选择 Linux 文件夹"
      closeLabel="关闭文件夹选择"
      description={`${distro} 中的目录，用作插件的默认工作目录。`}
      className="dsh-wsl-picker"
      contentClassName="dsh-wsl-picker-content"
      footer={
        <>
          <Button onClick={onClose}>取消</Button>
          <Button
            variant="primary"
            disabled={loading || !listing || !!error || path !== listing.path}
            onClick={() => onSelect(listing.path)}
          >
            选择此文件夹
          </Button>
        </>
      }
    >
      <form
        className="dsh-wsl-pathbar"
        onSubmit={(event) => {
          event.preventDefault();
          navigate(path);
        }}
      >
        <Button
          variant="outline"
          title="返回上级"
          aria-label="返回上级"
          disabled={loading || !listing || listing.path === "/"}
          icon={<IconChevronLeftOutlineMedium />}
          onClick={() => navigate(parentPath(listing.path))}
        />
        <Input
          aria-label="文件夹路径"
          data-modal-autofocus
          value={path}
          onChange={(event) => setPath(event.target.value)}
          spellCheck={false}
          className="dsh-wsl-pathinput"
          placeholder="/home"
        />
        <Button
          variant="outline"
          type="submit"
          disabled={loading || !path.trim()}
        >
          前往
        </Button>
      </form>
      <div className="dsh-wsl-folder-meta">
        <span>
          {folders.length} 个文件夹
          {listing?.nextOffset != null ? " · 还有更多" : ""}
        </span>
        <label>
          <input
            type="checkbox"
            checked={hidden}
            disabled={loading}
            onChange={(event) => {
              const next = event.target.checked;
              setHidden(next);
              void load(listing?.path || path, 0, next);
            }}
          />
          显示隐藏项
        </label>
      </div>
      <div
        className="dsh-wsl-folder-list"
        aria-label="文件夹列表"
        aria-busy={loading}
      >
        {error && (
          <div className="dsh-wsl-inline-error" role="alert">
            {error}
            <Button size="sm" onClick={() => navigate(path)}>
              重试
            </Button>
          </div>
        )}
        {!error &&
          folders.map((entry) => (
            <button
              type="button"
              className="dsh-wsl-folder"
              disabled={loading}
              key={entry.name}
              onClick={() => navigate(joinPath(listing.path, entry.name))}
            >
              <IconFolderCloseRegular size={18} />
              <span>{entry.name}</span>
              {entry.type === "symlink" && <small>链接</small>}
              <IconChevronRightOutlineRegular size={14} />
            </button>
          ))}
        {loading && (
          <div className="dsh-wsl-empty" role="status">
            <StateDot state="ongoing" />
            正在读取文件夹…
          </div>
        )}
        {!loading && !error && !folders.length && (
          <div className="dsh-wsl-empty">
            <IconFolderOpenOutlineRegular size={28} />
            <span>
              {listing?.nextOffset != null
                ? "这批条目中没有文件夹"
                : "此目录下没有可显示的文件夹"}
            </span>
          </div>
        )}
        {!loading && !error && listing?.nextOffset != null && (
          <Button
            className="dsh-wsl-load-more"
            onClick={() => load(listing.path, listing.nextOffset, hidden)}
          >
            加载更多
          </Button>
        )}
      </div>
      <p className="dsh-wsl-picker-hint">
        {listing?.path || "选择一个目录"}
        {path !== listing?.path && listing ? " · 点击“前往”查看输入的路径" : ""}
      </p>
    </Modal>
  );
}

export {
  TerminalIcon,
  SystemIcon,
  OpenIcon,
  Badge,
  DirectoryPicker,
  normalized,
  directoryError,
};
