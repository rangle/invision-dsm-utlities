// Command Line Input
export type CommandLineDownloadInput = {
    source: string;
    destination: string
}

export type CommandLineTransformInput = {
    source: string;
    destination: string
}

// Design Tokens
type Color = {
    name: string;
    value: string
}

type FontVariant = {
    fontStyle: string;
    fontWeight: string | number;
}

type Font = {
    name: string;
    family: string;
    variants: FontVariant[];
}

type TypeStyles = {
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

export type DesignTokensJSONLookup = {
    lookup: {
        colors: {
            [name: string]: Color;
        },
        fonts: {
            [name: string]: Font;
        }
        typeStyles: {
            [name: string]: TypeStyles;
        }
    }
}
