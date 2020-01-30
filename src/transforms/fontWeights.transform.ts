import { FontsDesignTokens } from "../types";
import { Theme } from "styled-system";

type FontWeightsTheme = Theme['fontWeights'];

export const fontWeightsTransform = (og: FontsDesignTokens): FontWeightsTheme => {
    if (!og) {
        return;
    }

    const ogEntries = Object.entries(og);
    const fontWeightsSet = new Set();

    for (const [fontName, font] of ogEntries) {
        font.variants.forEach((variant) => {
            fontWeightsSet.add(variant.fontWeight);
        })
    }

    const fontWeights = <FontWeightsTheme>Array.from(fontWeightsSet).sort();

    return fontWeights
};

