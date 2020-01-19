/**
 *
 * Next Steps:
 * 4. Create a couple theme based transformations and output file
 * 5. Create a mobile package
 * 6. Send to Varun
 */

const fs = require('fs');
const appRoot = require('app-root-path');
const parsedArgs = require('minimist')(process.argv.slice(2));
const babel = require('@babel/core');

const { colors } = require('./transforms/colors');
const { fontSizes } = require('./transforms/fontSizes');

const { s: source, d: destination } = parsedArgs;

let sourceTrimmed = source[0] === '.' ? source.slice(1) : source;

const data = require(appRoot + sourceTrimmed).lookup;

const colorsTheme = colors(data.colors);
const fontSizesTheme = fontSizes(data.typeStyles);

const theme = {
    colors: colorsTheme,
    fontSizes: fontSizesTheme
};

const code = `
    module.exports = ${JSON.stringify(theme)};
`;

babel.transform(code, {
    plugins: ['codegen'],
}, (err, result) => {
    if (err) {
        console.error(err);
        process.exit(0);
    }

    const codeString = result.code.replace('module.exports = ', 'export default ');

    fs.writeFile(destination, codeString, (err) => {
        if (err) {
            console.error(`Failed to create ${destination}.`);
            process.exit(0);
        }

        console.log(`Successfully created ${destination}.`);
    })
});
