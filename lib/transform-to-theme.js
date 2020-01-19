#!/usr/bin/env node

/**
 *
 * Next Steps:
 * 4. Create a couple theme based transformations and output file
 */
"use strict";

var fs = require('fs');

var parsedArgs = require('minimist')(process.argv.slice(2));

var babel = require('@babel/core');

var callingDir = process.cwd(); // Theme Transformations

var _require = require('./transforms/colors'),
    colors = _require.colors;

var _require2 = require('./transforms/fontSizes'),
    fontSizes = _require2.fontSizes; // Handle CLI input


var source = parsedArgs.s,
    destination = parsedArgs.d;
var sourceTrimmed = source[0] === '.' ? source.slice(1) : source; // Get Data

var data = require(callingDir + sourceTrimmed).lookup; // Call Transformations


var colorsTheme = colors(data.colors);
var fontSizesTheme = fontSizes(data.typeStyles); // Create Theme

var theme = {
  colors: colorsTheme,
  fontSizes: fontSizesTheme
}; // Create Code

var code = "module.exports = ".concat(JSON.stringify(theme), ";");
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