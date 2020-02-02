import * as path from "path";
import {
  BuildDesignTokensURLParams,
  BuildOutFileParams,
  DownloadIconsURLParams,
  FileFormat,
  JsonExportFormat,
  SetExportFormatParams
} from "../types";

export const buildOutFile = ({
  outDir,
  fileName
}: BuildOutFileParams): string => path.join(outDir, fileName);

export const getExportFormat = ({
  jsonExportFormat,
  type
}: SetExportFormatParams): JsonExportFormat => {
  let exportFormat: JsonExportFormat = jsonExportFormat;
  if (type === FileFormat.JSON && !exportFormat) {
    exportFormat = "lookup";
  }

  return exportFormat;
};

export const buildDesignTokensUrl = ({
  dsmExportUrl,
  fileName,
  queryParams
}: BuildDesignTokensURLParams): string => {
  const entries = Object.entries(queryParams);
  const params = [];

  for (const [key, value] of entries) {
    params.push(`${key}=${value}`);
  }

  const queryParamsString = params.length > 0 ? `?${params.join("&")}` : "";

  return `${dsmExportUrl}/${fileName}${queryParamsString}`;
};

export const buildIconsUrl = ({
  dsmExportUrl,
  key
}: DownloadIconsURLParams): string => {
  return `${dsmExportUrl}/icons.zip?key=${key}`;
};
