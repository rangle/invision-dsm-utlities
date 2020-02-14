import * as commander from "commander";
import { cosmiconfig } from "cosmiconfig";

import { transformToTheme } from "./transform-to-theme";
import { download } from "./download";
import {
  FileFormat,
  FileFormatMap,
  InvisionDsmUtilsConfig,
  QueryParameters
} from "./types";
import {
  buildDesignTokensUrl,
  buildIconsUrl,
  buildOutFile,
  getExportFormat
} from "./utils";

const fileNamesMap: FileFormatMap = {
  [FileFormat.CSS]: "_style-params.css",
  [FileFormat.SCSS]: "_style-params.scss",
  [FileFormat.LESS]: "style-params.less",
  [FileFormat.STYL]: "style-params.styl",
  [FileFormat.XML]: "style-data.xml",
  [FileFormat.JSON]: "style-data.json",
  [FileFormat.YAML]: "style-data.yaml",
  [FileFormat.ANDROID]: "android-style-data.zip",
  [FileFormat.IOS]: "ios-style-data.zip"
};

const fileTypes = Object.keys(fileNamesMap);

const main = async ({
  dsmExportUrl,
  key
}: InvisionDsmUtilsConfig): Promise<void> => {
  const program = new commander.Command();

  try {
    program
      .command("download")
      .description("Download a file from InVision DSM")
      .arguments("<type> <outDir>")
      .option("--icons-out-dir [iconsOutDir]", "icons directory")
      .option("--json-export-format [jsonExportFormat]", "lookup or list")
      .action(
        async (type: FileFormat, outDir, { iconsOutDir, jsonExportFormat }) => {
          if (!fileTypes.includes(type)) {
            throw `Error: ${type} is not a valid file type. Valid types are: ${fileTypes.join(
              " | "
            )}.`;
          }

          const fileName = fileNamesMap[type];

          const exportFormat = getExportFormat({ jsonExportFormat, type });
          const queryParams: QueryParameters = { exportFormat, key };

          const designTokensUrl = buildDesignTokensUrl({
            dsmExportUrl,
            fileName,
            queryParams
          });

          const outFile = buildOutFile({ outDir, fileName });

          await download({ url: designTokensUrl, outFile });

          if (iconsOutDir) {
            const iconsUrl = buildIconsUrl({ dsmExportUrl, key });
            const iconsOutFile = buildOutFile({
              outDir: iconsOutDir,
              fileName: "icons.zip"
            });
            await download({
              url: iconsUrl,
              outFile: iconsOutFile
            });
          }
        }
      );

    program
      .command("transform")
      .description(
        "Transform a lookup JSON file from InVision DSM into a Style System Theme"
      )
      .arguments("<inFile> [outFile]")
      .action(async (inFile, outFile) => {
        if (!outFile) {
          outFile = "theme.dsm.js";
        }

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
