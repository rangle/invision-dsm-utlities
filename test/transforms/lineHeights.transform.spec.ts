import {lineHeightsTransform} from "../../src/transforms";

describe('lineHeights transform', () => {
    let designTokens: any;

    beforeEach(() => {
        designTokens = {};
    });

    it('should return undefined when input is undefined', () => {
        const result = lineHeightsTransform(designTokens.fonts);
        expect(result).toBeUndefined();
    });

    it('should return an object matching the styled system them ui spec for lineHeights', () => {
        designTokens = {
            typeStyles: {
                name1: {lineHeight: '1'},
                name2: {lineHeight: '2'},
            }
        };

        const result = lineHeightsTransform(designTokens.typeStyles);
        expect(result).toEqual({
            name1: '1',
            name2: '2'
        });
    });
});
