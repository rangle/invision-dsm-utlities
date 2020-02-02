/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  buildDesignTokensUrl,
  buildIconsUrl,
  buildOutFile,
  getExportFormat
} from "../../src/utils";
import { FileFormat } from "../../src/types";

describe("buildDesignTokensUrl", () => {
  const dsmExportUrl = "http://root.com";
  const fileName = "path.type";

  it("should return url without query parameters", () => {
    const queryParams: any = {};
    const result = buildDesignTokensUrl({
      dsmExportUrl,
      fileName,
      queryParams
    });
    expect(result).toEqual("http://root.com/path.type");
  });

  it("should return url with one query parameter", () => {
    const queryParams: any = { key: "123" };
    const result = buildDesignTokensUrl({
      dsmExportUrl,
      fileName,
      queryParams
    });
    expect(result).toEqual("http://root.com/path.type?key=123");
  });

  it("should return url with two query parameter", () => {
    const queryParams: any = { key: "123", val: "abc" };
    const result = buildDesignTokensUrl({
      dsmExportUrl,
      fileName,
      queryParams
    });
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

describe("buildIconsUrl", () => {
  it("should return url with icons zip and key", () => {
    const dsmExportUrl = "http://root.com";
    const key = "123";
    const result = buildIconsUrl({ dsmExportUrl, key });
    expect(result).toEqual("http://root.com/icons.zip?key=123");
  });
});

describe("buildOutFile", () => {
  describe("directory with no trailing comma", () => {
    const outDir = "/a/b";

    it("should return outfile given filename with no preceding comma", () => {
      const fileName = "c.zip";
      const result = buildOutFile({ outDir, fileName });
      expect(result).toEqual("/a/b/c.zip");
    });

    it("should return outfile given filename with a preceding comma", () => {
      const fileName = "/c.zip";
      const result = buildOutFile({ outDir, fileName });
      expect(result).toEqual("/a/b/c.zip");
    });
  });

  describe("directory with trailing comma", () => {
    const outDir = "/a/b/";

    it("should return outfile given filename with no preceding comma", () => {
      const fileName = "c.zip";
      const result = buildOutFile({ outDir, fileName });
      expect(result).toEqual("/a/b/c.zip");
    });

    it("should return outfile given filename with a preceding comma", () => {
      const fileName = "/c.zip";
      const result = buildOutFile({ outDir, fileName });
      expect(result).toEqual("/a/b/c.zip");
    });
  });
});
