import { getGitInfo } from "../git";
import { getPRInfo, type PRInfo } from "../pr";
import { debug, setDebugMode } from "../utils/debug";

// PR情報を表示
function displayPRInfo(prInfo: PRInfo | null): void {
  if (prInfo === null) {
    console.log("[no PR]");
    return;
  }

  // ターミナルハイパーリンク形式で表示
  // OSC 8エスケープシーケンス: \x1b]8;;URL\x1b\\表示テキスト\x1b]8;;\x1b\\
  const prLink = `\x1b]8;;${prInfo.url}\x1b\\#${prInfo.number}\x1b]8;;\x1b\\`;
  const draftPrefix = prInfo.isDraft ? "[draft] " : "";
  const statePrefix = prInfo.state !== "OPEN" ? `[${prInfo.state}] ` : "";
  const formatted = `${statePrefix}${draftPrefix}${prLink} ${prInfo.title} @${prInfo.author.login}`;
  console.log(formatted);
}

// メインコマンドの実行処理
export async function main(debugMode: boolean): Promise<void> {
  // デバッグモード設定
  if (debugMode) {
    setDebugMode(true);
  }

  debug("=== Starting github-pr-info ===");

  // Git情報を取得
  const result = await getGitInfo();
  if (result.error !== undefined) {
    debug(`Git error: ${result.error}`);

    console.log(result.error);
    return;
  }

  // PR情報を取得
  const prInfo = await getPRInfo(result.value);

  // 表示
  displayPRInfo(prInfo);
}
