/* eslint-disable @typescript-eslint/no-explicit-any */

import { colorsTransform } from "../../src/transforms";

describe("color transform", () => {
  let designTokens: any;

  beforeEach(() => {
    designTokens = {};
  });

  it("should return undefined when input is undefined", () => {
    const result = colorsTransform(designTokens.colors);
    expect(result).toBeUndefined();
  });

  it("should return an object matching the styled system them ui spec for color", () => {
    designTokens = {
      colors: {
        name1: { name: "name1", value: "red" },
        name2: { name: "name2", value: "blue" }
      }
    };
    const result = colorsTransform(designTokens.colors);
    expect(result).toEqual({ name1: "red", name2: "blue" });
  });
});
