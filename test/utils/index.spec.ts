/* eslint-disable @typescript-eslint/no-explicit-any */

import { buildUrl, getExportFormat } from "../../src/utils";
import { FileFormat } from "../../src/types";

describe("buildUrl", () => {
  const dsmExportUrl = "http://root.com";
  const filePath = "/path.type";

  it("should return url without query parameters", () => {
    const queryParams: any = {};
    const result = buildUrl({ dsmExportUrl, filePath, queryParams });
    expect(result).toEqual("http://root.com/path.type");
  });

  it("should return url with one query parameter", () => {
    const queryParams: any = { key: "123" };
    const result = buildUrl({ dsmExportUrl, filePath, queryParams });
    expect(result).toEqual("http://root.com/path.type?key=123");
  });

  it("should return url with two query parameter", () => {
    const queryParams: any = { key: "123", val: "abc" };
    const result = buildUrl({ dsmExportUrl, filePath, queryParams });
    expect(result).toEqual("http://root.com/path.type?key=123&val=abc");
  });
});

describe("getExportFormat", () => {
  it("should return undefined when type is not json", () => {
    const jsonExportFormat: any = undefined;
    const type = FileFormat.CSS;
    const result = getExportFormat({ jsonExportFormat, type });
    expect(result).toBeUndefined();
  });

  it("should return lookup if type is json and jsonExportFormat is undefined", () => {
    const jsonExportFormat: any = undefined;
    const type = FileFormat.JSON;
    const result = getExportFormat({ jsonExportFormat, type });
    expect(result).toEqual("lookup");
  });

  it("should return jsonExportFormat if type is json and jsonExportFormat is defined", () => {
    const jsonExportFormat: any = "defined";
    const type = FileFormat.JSON;
    const result = getExportFormat({ jsonExportFormat, type });
    expect(result).toEqual("defined");
  });
});
