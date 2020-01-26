#!/usr/bin/env node

/**
 *
 * Next Steps:
 * 4. Create a couple theme based transformations and output file
 */

import fs from 'fs';
import minimist from 'minimist';
import * as babel from '@babel/core';

const parsedArgs = minimist(process.argv.slice(2));
const callingDir = process.cwd();

// Theme Transformations
const { colors } = require('./transforms/colors');
const { fontSizes } = require('./transforms/fontSizes');

// Handle CLI input
const { s: source, d: destination } = parsedArgs;
let sourceTrimmed = source[0] === '.' ? source.slice(1) : source;

// Get Data
const data = require(callingDir + sourceTrimmed).lookup;

// Call Transformations
const colorsTheme = colors(data.colors);
const fontSizesTheme = fontSizes(data.typeStyles);

// Create Theme
const theme = {
    colors: colorsTheme,
    fontSizes: fontSizesTheme
};

// Create Code
const code = `module.exports = ${JSON.stringify(theme)};`;

babel.transform(code, {
    plugins: ['codegen'],
}, (err: any, result: any) => {
    if (err) {
        console.error(err);
        process.exit(0);
    }

    const codeString = result.code.replace('module.exports = ', 'export default ');

    fs.writeFile(destination, codeString, (err: any) => {
        if (err) {
            console.error(`Failed to create ${destination}.`);
            process.exit(0);
        }

        console.log(`Successfully created ${destination}.`);
    })
});
