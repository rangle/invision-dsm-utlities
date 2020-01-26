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

export const colors = (og: any) => {
    if (!og) {
        return;
    }

    const ogEntries: any = Object.entries(og);
    const colors: any = {};

    for (const entry of ogEntries) {
        const { name, value} = entry[1];
        colors[name] = value;
    }

    return colors
};

