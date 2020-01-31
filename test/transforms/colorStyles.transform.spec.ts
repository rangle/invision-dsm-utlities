import {colorStylesTransform} from "../../src/transforms";

describe('colorStyles transform', () => {
    let designTokens: any;

    beforeEach(() => {
        designTokens = {};
    });

    it('should return undefined when input is undefined', () => {
        const result = colorStylesTransform(designTokens.colors);
        expect(result).toBeUndefined();
    });

    it('should return an object matching the styled system them ui spec for colorStyles', () => {
        designTokens = {
            colors: {
                'name1': { name: 'name1', value: 'red' },
                'name2': { name: 'name2', value: 'blue' }
            }
        };
        const result = colorStylesTransform(designTokens.colors);
        expect(result).toEqual({
            'name1': { color: 'red' },
            'name2': { color: 'blue' }
        });
    });
});
