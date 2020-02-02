import {
  BuildURLParams,
  FileFormat,
  JsonExportFormat,
  SetExportFormatParams
} from "../types";

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

export const buildUrl = ({
  dsmExportUrl,
  filePath,
  queryParams
}: BuildURLParams): string => {
  const entries = Object.entries(queryParams);
  const params = [];

  for (const [key, value] of entries) {
    params.push(`${key}=${value}`);
  }

  const queryParamsString = params.length > 0 ? `?${params.join("&")}` : "";

  return `${dsmExportUrl}${filePath}${queryParamsString}`;
};
