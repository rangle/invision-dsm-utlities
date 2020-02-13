import fs from "fs";
import https from "https";
import { IncomingMessage } from "http";

import { DownloadParams } from "./types";

export const writeResponseToFile = (filePath: string) => (
  res: IncomingMessage
): Promise<void> => {
  if (res.statusCode !== 200) {
    console.error("Network request failed.");
    process.exit(0);
    return;
  }

  res
    .setEncoding("utf8")
    .pipe(fs.createWriteStream(filePath))
    .on("error", error => {
      console.error(error);
      process.exit(0);
    })
    .on("finish", () => {
      console.log(`File saved to ${filePath}.`);
    });
};

export const download = async ({
  url,
  outFile
}: DownloadParams): Promise<void> => {
  https.get(url, writeResponseToFile(outFile)).on("error", error => {
    console.error(error);
    process.exit(0);
  });
};
