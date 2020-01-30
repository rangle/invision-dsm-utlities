import * as CSS from "csstype";

export type ColorDesignTokens = {
    name: string;
    value: Pick<CSS.StandardProperties, 'color'>
}

export type ColorsDesignTokens = {
    [name: string]: ColorDesignTokens;
}

export type FontVariantDesignTokens = Pick<
    CSS.StandardProperties,
    'fontStyle' | 'fontWeight'
>;

export type FontDesignTokens = {
    name: string;
    family: CSS.FontFamilyProperty;
    variants: FontVariantDesignTokens[];
}

export type FontsDesignTokens = {
    [name: string]: FontDesignTokens;
}

export type TypeStyleDesignTokens = Pick<
    CSS.StandardProperties,
    'fontSize' | 'lineHeight' | 'textAlign' | 'color' | 'fontStyle' | 'fontWeight' | 'fontFamily'
    > & {
    name: string;
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
