import { DesignTokens } from "../types";
import { Theme } from "styled-system";

type ColorsDesignTokens = DesignTokens['colors'];
type ColorsStylesTheme = Theme['colorStyles'];

export const colorStylesTransform = (og: ColorsDesignTokens): ColorsStylesTheme => {
    if (!og) {
        return;
    }

    const ogEntries = Object.entries(og);
    const colorStyles: ColorsStylesTheme = {};

    for (const [colorStyleName, colorStyle] of ogEntries) {
        colorStyles[colorStyleName] = { color: colorStyle.value };
    }

    return colorStyles;
};

