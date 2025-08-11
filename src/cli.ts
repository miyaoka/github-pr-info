import { cli, define } from "gunshi";
import packageJson from "../package.json";
import { execute } from "./core";

// CLIコマンド定義
const command = define({
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

    await execute({
      debugMode,
    });
  },
});

// CLI実行
export function runCLI(argv: string[]) {
  cli(argv, command, {
    version: packageJson.version,
  });
}
