#!/usr/bin/env node

import fs from 'fs';
import minimist from 'minimist';
import * as babel from '@babel/core';

const callingDir = process.cwd();

// Event Handlers
const errorHandler = (e: any) => {
    console.error(e);
    process.exit(0);
};

// Theme Transformations
const { colors } = require('./transforms/colors');
const { fontSizes } = require('./transforms/fontSizes');

// Handle CLI input
const parsedArgs = minimist(process.argv.slice(2));
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
        errorHandler(err);
    }

    const codeString = result.code.replace('module.exports = ', 'export default ');

    fs.writeFile(destination, codeString, (err: any) => {
        if (err) {
            errorHandler(`Failed to create ${destination}.`)
        }

        console.log(`Successfully created ${destination}.`);
    })
});
