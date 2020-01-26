#!/usr/bin/env node

import fs from 'fs';
import https from 'https';

import minimist from 'minimist';

// Event Handlers
const errorHandler = (e: any) => {
    console.error(e);
    process.exit(0);
};

const finishHandler = () => {
    console.log(`Design Tokens successfully downloaded.`)
};

// Handle CLI input
const {s: source, d: destination} = minimist(process.argv.slice(2));

if (!source) {
    errorHandler('Missing InVision URL (e.g. -s https://...)');
}

if (!destination) {
    errorHandler('Missing write path (e.g. -d /my.css)');
}

// Write response to file
const writeResponseToFile = (filePath: string) => (res: any) => {
    if (res.statusCode !== 200) {
        return errorHandler('Network request failed.');
    }

    res
        .setEncoding('utf8')
        .pipe(fs.createWriteStream(filePath))
        .on('error', errorHandler)
        .on('finish', finishHandler)
};

https
    .get(source, writeResponseToFile(destination))
    .on('error', errorHandler);
