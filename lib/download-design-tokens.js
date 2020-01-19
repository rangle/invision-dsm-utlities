"use strict";

/**
 *
 * Use this script in your package.json to download the latest design tokens from InVision DSM
 *
 * Script Parameters:
 * url=<InVision Design Tokens URL>
 * writePath=<Relative file path to write design tokens>
 *
 * Example:
 * "scripts": {
 *     "fetch-design-tokens": "node ./fetch-design-tokens url=https://rangle.invisionapp.com/dsm-export/rangle-io/where-van-gogh/_style-params.css?key=Hk4MnZ1bU writePath=/src/_style-params.css"
 * }
 */
var fs = require('fs');

var https = require('https'); // const args = process.argv.slice(2);
//
// const argsParsed = args
//                     .map(arg => {
//                         const split = arg.split(/=(.+)/);
//                         return ({ [split[0]]: split[1] })
//                     })
//                     .reduce((acc, val) => ({ ...acc, ...val }), {});
//
//
// const { writePath } = argsParsed;
// const url = process.env.INVISION_URL;


var url = "https://rangle.invisionapp.com/dsm-export/rangle-io/where-van-gogh/style-data.json?exportFormat=lookup&key=Hk4MnZ1bU";
var writePath = "/src/_style-data.json";

if (!url) {
  console.error('Missing InVision URL (e.g. url=https://...)');
  process.exit(0);
}

if (!writePath) {
  console.error('Missing write path (e.g. writePath=/my.css)');
  process.exit(0);
}

https.get(url, function (res) {
  if (res.statusCode !== 200) {
    return;
  }

  res.setEncoding('utf8');
  res.pipe(fs.createWriteStream(process.env.NODE_PATH + writePath)).on('finish', function () {
    return console.log("Design Tokens downloaded successfully and written to ".concat(writePath, "."));
  });
});