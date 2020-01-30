#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import * as commander from 'commander';
import * as babel from '@babel/core';
import { Theme } from 'styled-system';
import { CommandLineDownloadInput, DesignTokensResponse } from "./types";

import {
    colorsTransform,
    fontSizesTransform,
    fontsTransform,
    fontWeightsTransform,
    lineHeightsTransform,
    colorStylesTransform,
    textStylesTransform
} from './transforms';

// Event Handlers
const errorHandler = (e: any) => {
    console.error(e);
    process.exit(0);
};

// Generate Code
const generateCode = async (theme: Theme): Promise<string> => {
    return new Promise((resolve, reject) => {
        const codegenString = `module.exports = ${JSON.stringify(theme)};`;

        babel.transform(codegenString, {
            plugins: ['codegen'],
        }, (err, result) => {
            if (err) {
                reject(err);
            }

            const code = result.code.replace('module.exports = ', 'export default ');
            resolve(code);
        });
    })
};

// Write code to file
const writeFile = async (destination: string, code: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(destination, code, (err) => {
            err ? reject(err) : resolve()
        })
    });

}

const main = async () => {
    const program = new commander.Command();
    program.version('0.1.0');

    program
        .requiredOption('-s, --source <source>', 'source file path')
        .requiredOption('-d, --destination <destination>', 'write to file path')
        .action(async ({ source: sourceInput, destination}: CommandLineDownloadInput) => {
            // Get source input path
            const callingDir = process.cwd();
            const source = path.normalize(path.join(callingDir, sourceInput));

            // Get data
            const designTokens: DesignTokensResponse = require(source);
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
            await writeFile(destination, code);

            console.log(`Successfully created ${destination}.`);

        });

    try {
        await program.parseAsync(process.argv);
    }
    catch (error) {
        errorHandler(error)
    }
};

main();
