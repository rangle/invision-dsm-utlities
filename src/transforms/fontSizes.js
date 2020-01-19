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

export const fontSizes = (og) => {
    if (!og) {
        return;
    }

    return Object.values(og).map(val => val.fontSize.slice(0, -2)).map(val => parseInt(val)).sort();
};
