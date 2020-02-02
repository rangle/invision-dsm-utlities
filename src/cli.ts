import * as commander from "commander";
import { cosmiconfig } from "cosmiconfig";

import { transformToTheme } from "./transform-to-theme";
import { downloadDesignTokens } from "./download-design-tokens";
import {
  CommandLineDownloadInput,
  CommandLineTransformInput,
  FileFormat,
  FileFormatMap,
  InvisionDsmUtilsConfig,
  QueryParameters
} from "./types";
import { buildUrl, getExportFormat } from "./utils";

const fileFormatPaths: FileFormatMap = {
  [FileFormat.CSS]: "/_style-params.css",
  [FileFormat.SCSS]: "/_style-params.scss",
  [FileFormat.LESS]: "/style-params.less",
  [FileFormat.STYL]: "/style-params.styl",
  [FileFormat.XML]: "/style-data.xml",
  [FileFormat.JSON]: "/style-data.json",
  [FileFormat.YAML]: "/style-data.yaml",
  [FileFormat.ANDROID]: "/android-style-data.zip",
  [FileFormat.IOS]: "/ios-style-data.zip"
};

const main = async ({
  dsmExportUrl,
  key
}: InvisionDsmUtilsConfig): Promise<void> => {
  const program = new commander.Command();

  try {
    program
      .command("download")
      .description("download a file from InVision DSM")
      .requiredOption("-t, --type <type>", "download url")
      .requiredOption("-o, --out-file <outFilePath>", "output file path")
      .option("--jsonExportFormat <jsonExportFormat>", "lookup or list")
      .action(
        async ({
          type,
          outFile,
          jsonExportFormat
        }: CommandLineDownloadInput) => {
          const filePath = fileFormatPaths[type];

          const exportFormat = getExportFormat({ jsonExportFormat, type });
          const queryParams: QueryParameters = { exportFormat, key };

          const url = buildUrl({ dsmExportUrl, filePath, queryParams });

          await downloadDesignTokens({ url, outFile });
        }
      );

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
      .action(async ({ inFile, outFile }: CommandLineTransformInput) => {
        await transformToTheme({ inFile, outFile });
      });

    await program.parseAsync(process.argv);
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};

cosmiconfig("invisiondsmutils")
  .search()
  .then(({ config, isEmpty }) => {
    if (isEmpty) {
      console.error(
        "Empty invisiondsmutils configuration. Be sure that your configuration object contains the relevant properties."
      );
      process.exit(0);
    }
    return main(config);
  })
  .catch(() => {
    console.error("Error loading invision-dsm-utlis configuration");
    process.exit(0);
  });
