import { ColorsDT } from "../types";
import { Theme } from "styled-system";

type ColorsTheme = Theme['colors'];

export const colorsTransform = (og: ColorsDT): ColorsTheme => {
    if (!og) {
        return;
    }

    const ogEntries = Object.entries(og);
    const colors: ColorsTheme = {};

    for (const [colorName, color] of ogEntries) {
        colors[colorName] = color.value;
    }

    return colors
};

