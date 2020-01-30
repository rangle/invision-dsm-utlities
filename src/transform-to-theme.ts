#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import * as babel from '@babel/core';
import { Theme } from 'styled-system';
import { CommandLineTransformInput, DesignTokensResponse } from "./types";

import {
    colorsTransform,
    fontSizesTransform,
    fontsTransform,
    fontWeightsTransform,
    lineHeightsTransform,
    colorStylesTransform,
    textStylesTransform
} from './transforms';

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

export const transformToTheme = async (
    { inFile, outFile }: CommandLineTransformInput
) => {

    console.log(outFile);
    // Get source input path
    const callingDir = process.cwd();
    const source = path.normalize(path.join(callingDir, inFile));

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
    await writeFile(outFile, code);

    console.log(`Successfully created ${outFile}.`);
};
