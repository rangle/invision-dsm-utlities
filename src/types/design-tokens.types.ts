import * as CSS from "csstype";

export type DTName = {
    name: string;
}

export type ColorDT = {
    value: CSS.StandardProperties['color']
} & DTName;

export type FontVariantDT = Pick<
    CSS.StandardProperties,
    'fontStyle' | 'fontWeight'
    >;

export type TypeStyleDT = Pick<
    CSS.StandardProperties,
    'fontSize' | 'lineHeight' | 'textAlign' | 'color' | 'fontStyle' | 'fontWeight' | 'fontFamily'
    > & DTName;

export type FontDT = {
    family: CSS.FontFamilyProperty;
    variants: FontVariantDT[];
} & DTName;

export type ColorsDT = {
    [name: string]: ColorDT;
}

export type FontsDT = {
    [name: string]: FontDT;
}

export type TypeStylesDT = {
    [name: string]: TypeStyleDT;
}

export type DesignTokens = {
    colors: ColorsDT;
    fonts: FontsDT;
    typeStyles: TypeStylesDT;
}

export type DesignTokensResponse = {
    lookup: DesignTokens
}
