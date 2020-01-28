export type ColorDesignTokens = {
    name: string;
    value: string
}

export type ColorsDesignTokens = {
    [name: string]: ColorDesignTokens;
}

export type FontVariantDesignTokens = {
    fontStyle: string;
    fontWeight: string | number;
}

export type FontDesignTokens = {
    name: string;
    family: string;
    variants: FontVariantDesignTokens[];
}

export type FontsDesignTokens = {
    [name: string]: FontDesignTokens;
}

export type TypeStyleDesignTokens = {
    fontSize: string;
    lineHeight: string;
    textAlign: string;
    color: string;
    fontStyle: string;
    fontWeight: string;
    fontFamily: string;
    name: string;
    backgroundColor: string | null;
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
