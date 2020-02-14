import fs from "fs";
import path from "path";
import * as babel from "@babel/core";
import { Theme } from "styled-system";
import { DesignTokensResponse, TranformToThemeParams } from "./types";

import {
  colorsTransform,
  fontSizesTransform,
  fontsTransform,
  fontWeightsTransform,
  lineHeightsTransform,
  colorStylesTransform,
  textStylesTransform
} from "./transforms";

// Generate Code
const generateCode = async (theme: Theme): Promise<string> => {
  return new Promise((resolve, reject) => {
    const codegenString = `module.exports = ${JSON.stringify(theme)};`;

    babel.transform(
      codegenString,
      {
        plugins: ["codegen"],
        filename: "abc.js", // requires any filename to work,
        sourceType: "script"
      },
      (err, result) => {
        if (err) {
          reject(err);
        }

        const code = result.code.replace(
          "module.exports = ",
          "export default "
        );
        resolve(code);
      }
    );
  });
};

// Write code to file
const writeFile = async (destination: string, code: string): Promise<Error> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(destination, code, err => {
      err ? reject(err) : resolve();
    });
  });
};

export const getSourcePath = (inFile: string, callingDir: string): string => {
  return path.normalize(path.join(callingDir, inFile));
};

export const isValidLookupFile = (obj: DesignTokensResponse): boolean => {
  return Boolean(obj.lookup);
};

export const transformToTheme = async ({
  inFile,
  outFile
}: TranformToThemeParams): Promise<void> => {
  // Get source input path
  const source = getSourcePath(inFile, process.cwd());

  // Get data
  const designTokens: DesignTokensResponse = require(source); // eslint-disable-line

  if (!isValidLookupFile(designTokens)) {
    throw "Design tokens file is not a lookup response.";
  }

  // Extract design tokens
  const data = designTokens.lookup;

  // Call Transformations
  const colorsTheme = colorsTransform(data.colors);
  const fontSizesTheme = fontSizesTransform(data.typeStyles);
  const fontsTheme = fontsTransform(data.typeStyles);
  const lineHeightsTheme = lineHeightsTransform(data.typeStyles);
  const fontWeightsTheme = fontWeightsTransform(data.fonts);
  const textStylesTheme = textStylesTransform(data.typeStyles);
  const colorStylesTheme = colorStylesTransform(data.colors);

  // Create Theme
  const theme: Theme = {
    colors: colorsTheme,
    fontSizes: fontSizesTheme,
    fonts: fontsTheme,
    lineHeights: lineHeightsTheme,
    fontWeights: fontWeightsTheme,
    textStyles: textStylesTheme,
    colorStyles: colorStylesTheme
  };

  // Generate Code
  const code = await generateCode(theme);

  // Write File
  await writeFile(outFile, code);

  console.log(`Theme written to ${outFile}`);

  return Promise.resolve();
};
