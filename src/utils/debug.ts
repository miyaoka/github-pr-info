import { writeFileSync } from "node:fs";

// デバッグモードの内部状態（初期値は環境変数から、"true"をチェック）
let debugEnabled = process.env.GITHUB_PR_INFO_DEBUG === "true";
const DEBUG_LOG = "/tmp/github_pr_info_debug.log";

// デバッグモードを設定する関数
export function setDebugMode(enabled: boolean): void {
  debugEnabled = enabled;
}

// デバッグ出力関数
export function debug(message: string) {
  if (!debugEnabled) return;
  const timestamp = new Date().toISOString();
  const log = `[${timestamp}] ${message}\n`;
  writeFileSync(DEBUG_LOG, log, { flag: "a" });
}
