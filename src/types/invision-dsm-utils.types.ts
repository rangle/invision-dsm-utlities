export enum FileFormat {
  CSS = "css",
  SCSS = "scss",
  LESS = "less",
  STYL = "styl",
  XML = "xml",
  JSON = "json",
  YAML = "yaml",
  ANDROID = "android",
  IOS = "ios"
}

export type JsonExportFormat = "lookup" | "list";

// Configuration File
export type InvisionDsmUtilsConfig = {
  dsmExportUrl: string;
  key: string;
};

// Command Line Input
export type CommandLineDownloadInput = {
  type: FileFormat;
  jsonExportFormat?: JsonExportFormat;
  outFile: string;
};

export type CommandLineTransformInput = {
  inFile: string;
  outFile: string;
};

// Main Script
export type FileFormatMap = {
  [key in FileFormat]: string;
};

// Scripts
export type DownloadDesignTokensParams = Pick<
  CommandLineDownloadInput,
  "outFile"
> & {
  url: string;
};

export type SetExportFormatParams = Pick<
  CommandLineDownloadInput,
  "type" | "jsonExportFormat"
>;

// Invision URL Query Parameters
export type QueryParameters = {
  key: string;
  exportFormat?: JsonExportFormat;
};

export type BuildURLParams = Pick<InvisionDsmUtilsConfig, "dsmExportUrl"> & {
  filePath: string;
  queryParams: QueryParameters;
};
