/* eslint-disable @typescript-eslint/no-explicit-any */

import { fontSizesTransform } from "../../src/transforms";

describe("fontSizes transform", () => {
  let designTokens: any;

  beforeEach(() => {
    designTokens = {};
  });

  it("should return undefined when input is undefined", () => {
    const result = fontSizesTransform(designTokens.typeStyles);
    expect(result).toBeUndefined();
  });

  it("should return an object matching the styled system them ui spec for fontSizes, with unique values and sorted", () => {
    designTokens = {
      typeStyles: {
        name1: { fontSize: "8px" },
        name2: { fontSize: "6px" },
        name3: { fontSize: "4px" },
        name4: { fontSize: "8px" }
      }
    };

    const result = fontSizesTransform(designTokens.typeStyles);
    expect(result).toEqual([4, 6, 8]);
  });
});
