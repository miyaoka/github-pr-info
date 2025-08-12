import { $ } from "bun";

// updateコマンドの実行処理
export async function update(): Promise<void> {
  console.log("Clearing cache for github-pr-info...");

  // bunxで使用されるグローバルパッケージキャッシュを削除
  // 次回bunx実行時に最新版がダウンロードされて更新される
  const { exitCode } =
    await $`bun pm -g cache rm github.com/miyaoka/github-pr-info`
      .quiet()
      .nothrow();

  if (exitCode !== 0) {
    console.log("⚠ Failed to clear cache");
    return;
  }

  console.log("✓ Cache cleared");
  console.log("Next run will fetch the latest version");
}
