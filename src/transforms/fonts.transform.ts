import { TypeStylesDT } from "../types";
import { Theme } from "styled-system";

type FontsTheme = Theme['fonts'];

export const fontsTransform = (og: TypeStylesDT): FontsTheme => {
    if (!og) {
        return;
    }

    const ogEntries = Object.entries(og);
    const fonts: FontsTheme = {};

    for (const [typeStyleName, typeStyle] of ogEntries) {
        fonts[typeStyleName] = typeStyle.fontFamily;
    }

    return fonts
};
