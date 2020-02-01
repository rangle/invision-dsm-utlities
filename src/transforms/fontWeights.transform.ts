import { FontsDT } from "../types";
import { Theme } from "styled-system";

type FontWeightsTheme = Theme["fontWeights"];

export const fontWeightsTransform = (og: FontsDT): FontWeightsTheme => {
  if (!og) {
    return;
  }

  const ogEntries = Object.entries(og);
  const fontWeightsSet = new Set();

  for (const [, font] of ogEntries) {
    font.variants.forEach(variant => {
      fontWeightsSet.add(variant.fontWeight);
    });
  }

  const fontWeights = Array.from(fontWeightsSet).sort() as FontWeightsTheme;

  return fontWeights;
};
