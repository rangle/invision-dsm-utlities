import {fontsTransform} from "../../src/transforms";

describe('fonts transform', () => {
    let designTokens: any;

    beforeEach(() => {
        designTokens = {};
    });

    it('should return undefined when input is undefined', () => {
        const result = fontsTransform(designTokens.typeStyles);
        expect(result).toBeUndefined();
    });

    it('should return an object matching the styled system them ui spec for fonts', () => {

        designTokens = {
            typeStyles: {
                name1: {fontFamily: 'font1'},
                name2: {fontFamily: 'font2'},
            }
        };

        const result = fontsTransform(designTokens.typeStyles);
        expect(result).toEqual({
            name1: 'font1',
            name2: 'font2'
        });
    });
});
