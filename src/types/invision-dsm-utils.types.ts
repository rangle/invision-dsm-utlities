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

// Main Script
export type FileFormatMap = {
  [key in FileFormat]: string;
};

// Scripts
export type DownloadParams = {
  outFile: string;
  url: string;
};

export type TranformToThemeParams = {
  inFile: string;
  outFile: string;
};

export type SetExportFormatParams = {
  type: string;
  jsonExportFormat: JsonExportFormat;
};

// Invision URL Query Parameters
export type QueryParameters = {
  key: string;
  exportFormat?: JsonExportFormat;
};

export type BuildOutFileParams = {
  outDir: string;
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
