#!/usr/bin/env node

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

import fs from 'fs';
import https from 'https';

import minimist from 'minimist';
const { s: source, d: destination } = minimist(process.argv.slice(2));

if (!source) {
    console.error('Missing InVision URL (e.g. -s https://...)');
    process.exit(0);
}

if (!destination) {
    console.error('Missing write path (e.g. -d /my.css)');
    process.exit(0);
}

https
    .get(source, (res: any) => {
        if(res.statusCode !== 200) {
            return;
        }
        res.setEncoding('utf8');
        res
            .pipe(fs.createWriteStream(destination))
            .on('finish', () => console.log(`Design Tokens downloaded successfully and written to ${destination}.`))
    });
