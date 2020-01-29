import * as CSS from "csstype";

export type ColorDesignTokens = {
    name: string;
    value: CSS.ColorProperty;
}

export type ColorsDesignTokens = {
    [name: string]: ColorDesignTokens;
}

export type FontVariantDesignTokens = {
    fontStyle: CSS.FontStyleProperty;
    fontWeight: CSS.FontWeightProperty;
}

export type FontDesignTokens = {
    name: string;
    family: CSS.FontFamilyProperty;
    variants: FontVariantDesignTokens[];
}

export type FontsDesignTokens = {
    [name: string]: FontDesignTokens;
}

export type TypeStyleDesignTokens = {
    fontSize: CSS.FontSizeProperty<number>;
    lineHeight: CSS.LineHeightProperty<{}>;
    textAlign: CSS.TextAlignProperty;
    color: CSS.ColorProperty;
    fontStyle: CSS.FontStyleProperty;
    fontWeight: CSS.FontWeightProperty;
    fontFamily: CSS.FontFamilyProperty;
    name: string;
    backgroundColor: CSS.ColorProperty;
}

export type TypeStylesDesignTokens = {
    [name: string]: TypeStyleDesignTokens;
}

export type DesignTokens = {
    colors: ColorsDesignTokens;
    fonts: FontsDesignTokens;
    typeStyles: TypeStylesDesignTokens;
}

export type DesignTokensResponse = {
    lookup: DesignTokens
}
