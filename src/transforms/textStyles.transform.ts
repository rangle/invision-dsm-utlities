import { DesignTokens } from "../types";
import { Theme } from "styled-system";

type TypeStylesDesignTokens = DesignTokens["typeStyles"];
type TextStylesTheme = Theme["textStyles"];

export const textStylesTransform = (
  og: TypeStylesDesignTokens
): TextStylesTheme => {
  if (!og) {
    return;
  }

  const ogEntries = Object.entries(og);
  const textStyles: TextStylesTheme = {};

  for (const [typeStyleName, typeStyle] of ogEntries) {
    delete typeStyle.name;
    textStyles[typeStyleName] = typeStyle;
  }

  return textStyles;
};
