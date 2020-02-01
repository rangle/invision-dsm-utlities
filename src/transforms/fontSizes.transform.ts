import { TypeStylesDT } from "../types";
import { Theme } from "styled-system";

type FontSizesTheme = Theme["fontSizes"];

export const fontSizesTransform = (og: TypeStylesDT): FontSizesTheme => {
  if (!og) {
    return;
  }

  const ogEntries = Object.entries(og);
  const fontSizesSet = new Set();

  for (const [, typeStyle] of ogEntries) {
    const val =
      typeStyle.fontSize === 0
        ? typeStyle.fontSize
        : parseInt(typeStyle.fontSize.slice(0, -2));

    fontSizesSet.add(val);
  }

  const fontSizes = Array.from(fontSizesSet).sort() as FontSizesTheme;

  return fontSizes;
};
