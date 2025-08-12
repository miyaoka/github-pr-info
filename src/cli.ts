import { type Args, type Command, cli, define } from "gunshi";
import packageJson from "../package.json";
import { main } from "./commands/main";
import { update } from "./commands/update";

// メインコマンド定義
const mainCommand = define({
  name: "github-pr-info",
  description: "Get GitHub PR information for current git branch",
  args: {
    debug: {
      type: "boolean",
      short: "d",
      description: "Enable debug output",
      default: false,
    },
  },
  run: async (ctx) => {
    const { debug: debugMode } = ctx.values;
    await main(debugMode);
  },
});

// updateサブコマンド定義
const updateCommand = define({
  name: "update",
  description: "Clear cache to get latest version",
  run: async () => {
    await update();
  },
});

// サブコマンドマップ
const subCommands = new Map<string, Command<Args>>();
subCommands.set("update", updateCommand);

// CLI実行
export function runCLI(argv: string[]) {
  cli(argv, mainCommand, {
    version: packageJson.version,
    subCommands,
  });
}
