#!/usr/bin/env node

import fs from 'fs';
import https from 'https';
import * as commander from 'commander';
import { IncomingMessage } from "http";

type Input = {
    source: string;
    destination: string
}

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

const main = async () => {
    const program = new commander.Command();
    program.version('0.1.0');

    program
        .requiredOption('-s, --source <source>', 'source url')
        .requiredOption('-d, --destination <destination>', 'write to file path')
        .action(async ({ source, destination }: Input) =>
            https
                .get(source, writeResponseToFile(destination))
                .on('error', errorHandler)
        );

    try {
        await program.parseAsync(process.argv);
    }
    catch (error) {
        console.error(error)
    }
};

main();
