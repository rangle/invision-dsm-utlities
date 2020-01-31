import { TypeStylesDT } from "../types";
import { Theme } from "styled-system";

type FontSizesTheme = Theme['fontSizes'];

export const fontSizesTransform = (og: TypeStylesDT): FontSizesTheme => {
    if (!og) {
        return;
    }

    const ogEntries = Object.entries(og);
    const fontSizesSet = new Set();

    for (const [_, typeStyle] of ogEntries) {
        const val = typeStyle.fontSize === 0 ?
            typeStyle.fontSize :
            parseInt(typeStyle.fontSize.slice(0, -2));

        fontSizesSet.add(val);
    }

    const fontSizes = <FontSizesTheme>Array.from(fontSizesSet).sort();

    return fontSizes;
};
