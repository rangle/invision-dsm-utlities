#!/usr/bin/env node

import fs from 'fs';
import https from 'https';
import { IncomingMessage } from "http";

import { CommandLineDownloadInput } from "./types";

export const writeResponseToFile = (filePath: string) => (res: IncomingMessage) => {
    if (res.statusCode !== 200) {
        console.error('Network request failed.');
        process.exit(0);
        return;
    }

    res
        .setEncoding('utf8')
        .pipe(fs.createWriteStream(filePath))
        .on('error', (error) => {
            console.error(error);
            process.exit(0);
        })
        .on('finish', () => {
            console.log(`Design Tokens saved to ${filePath}.`);
        })
};

export const downloadDesignTokens = async (
    { url, outFile}: CommandLineDownloadInput
) => {
    https
        .get(url, writeResponseToFile(outFile))
        .on('finish', () => {
            console.log('Design Tokens downloaded...')
        })
        .on('error', (error) => {
            console.error(error);
            process.exit(0);
        });
};
