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
  iconsOutDir: string;
  jsonExportFormat?: JsonExportFormat;
  outDir: string;
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
export type DownloadParams = {
  outFile: string;
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

export type BuildOutFileParams = Pick<CommandLineDownloadInput, "outDir"> & {
  fileName: string;
};

export type BuildDesignTokensURLParams = Pick<
  InvisionDsmUtilsConfig,
  "dsmExportUrl"
> & {
  fileName: string;
  queryParams: QueryParameters;
};

export type DownloadIconsURLParams = Pick<
  InvisionDsmUtilsConfig,
  "dsmExportUrl"
> & {
  key: string;
};
