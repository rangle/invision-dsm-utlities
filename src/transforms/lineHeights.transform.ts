import { TypeStylesDT } from "../types";
import { Theme } from "styled-system";

type LineHeightsTheme = Theme['lineHeights'];

export const lineHeightsTransform = (og: TypeStylesDT): LineHeightsTheme => {
    if (!og) {
        return;
    }

    const ogEntries = Object.entries(og);
    const lineHeights: LineHeightsTheme = {};

    for (const [typeStyleName, typeStyle] of ogEntries) {
        lineHeights[typeStyleName] = typeStyle.lineHeight;
    }

    return lineHeights
}
