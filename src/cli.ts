import * as commander from "commander";
import { transformToTheme } from "./transform-to-theme";
import { downloadDesignTokens } from "./download-design-tokens";

const main = async (): Promise<void> => {
  const program = new commander.Command();

  try {
    program
      .command("download")
      .description("download a file from InVision DSM")
      .requiredOption("-d, --url <url>", "download url")
      .requiredOption("-o, --out-file <outFilePath>", "output file path")
      .action(async ({ url, outFile }) => {
        await downloadDesignTokens({ url, outFile });
      });

    program
      .command("transform")
      .description(
        "transform a lookup JSON file from InVision DSM into a Style System Theme"
      )
      .requiredOption("-d, --in-file <url>", "input JSON file")
      .requiredOption(
        "-o, --out-file <outFilePath>",
        "output file path",
        "./theme.dms.js"
      )
      .action(async ({ inFile, outFile }) => {
        await transformToTheme({ inFile, outFile });
      });

    await program.parseAsync(process.argv);
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};

main();
