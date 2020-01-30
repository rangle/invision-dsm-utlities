#!/usr/bin/env node

import fs from 'fs';
import https from 'https';
import { IncomingMessage } from "http";

import { CommandLineDownloadInput } from "./types";

// Event Handlers
const errorHandler = (e: any) => {
    console.error(e);
    process.exit(0);
};

const finishHandler = () => {
    console.log(`Design Tokens successfully downloaded.`)
};

// Write File
const writeResponseToFile = (filePath: string) => (res: IncomingMessage) => {
    if (res.statusCode !== 200) {
        return errorHandler('Network request failed.');
    }

    res
        .setEncoding('utf8')
        .pipe(fs.createWriteStream(filePath))
        .on('error', errorHandler)
        .on('finish', finishHandler)
};

export const downloadDesignTokens = async (
    { url, outFile}: CommandLineDownloadInput
) => {
    https
        .get(url, writeResponseToFile(outFile))
        .on('error', errorHandler)
};
