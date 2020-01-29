/**
 *
 * Receive fontSize in InVision DSM Design Token format
 *
 * {
 *     typeStyles: {
 *         [name: string]: {
 *             fontSize: string, // e.g. 18px
 *         }
 *     }
 * }
 *
 * Transform and return colors in System UI Theme Specification
 *
 *  {
 *      fontSizes: number[]
 *  }
 *
 */

import { TypeStylesDesignTokens } from "../types";
import { Theme } from "styled-system";

type FontSizesTheme = Theme['fontSizes'];

export const fontSizesTransform = (og: TypeStylesDesignTokens): FontSizesTheme => {
    if (!og) {
        return;
    }

    return Object.values(og).map((val: any) => val.fontSize.slice(0, -2)).map(val => parseInt(val)).sort();
};
