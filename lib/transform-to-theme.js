#!/usr/bin/env node

/**
 *
 * Next Steps:
 * 4. Create a couple theme based transformations and output file
 * 5. Create a mobile package
 * 6. Send to Varun
 */
"use strict";

var fs = require('fs');

var parsedArgs = require('minimist')(process.argv.slice(2));

var babel = require('@babel/core');

var appRoot = process.cwd();

var _require = require('./transforms/colors'),
    colors = _require.colors;

var _require2 = require('./transforms/fontSizes'),
    fontSizes = _require2.fontSizes;

var source = parsedArgs.s,
    destination = parsedArgs.d;
var sourceTrimmed = source[0] === '.' ? source.slice(1) : source;

var data = require(appRoot + sourceTrimmed).lookup;

var colorsTheme = colors(data.colors);
var fontSizesTheme = fontSizes(data.typeStyles);
var theme = {
  colors: colorsTheme,
  fontSizes: fontSizesTheme
};
var code = "\n    module.exports = ".concat(JSON.stringify(theme), ";\n");
babel.transform(code, {
  plugins: ['codegen']
}, function (err, result) {
  if (err) {
    console.error(err);
    process.exit(0);
  }

  var codeString = result.code.replace('module.exports = ', 'export default ');
  fs.writeFile(destination, codeString, function (err) {
    if (err) {
      console.error("Failed to create ".concat(destination, "."));
      process.exit(0);
    }

    console.log("Successfully created ".concat(destination, "."));
  });
});