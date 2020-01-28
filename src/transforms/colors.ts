/**
 *
 * Receive colors in InVision DSM Design Token format
 *
 * {
 *     colors: {
 *         [name: string]: {
 *             name: string,
 *             value: string
 *         }
 *     }
 * }
 *
 * Transform and return colors in System UI Theme Specification
 *
 *  {
 *      colors: {
 *          [name: string]: string | string[],
 *      }
 *  }
 *
 */
import { ColorsDesignTokens } from "../types";
import { Theme } from "styled-system";

type ColorsTheme = Theme['colors'];

export const colors = (og: ColorsDesignTokens): ColorsTheme => {
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

