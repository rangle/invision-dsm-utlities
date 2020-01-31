import {fontWeightsTransform} from "../../src/transforms";

describe('fontWeights transform', () => {
    let designTokens: any;

    beforeEach(() => {
        designTokens = {};
    });

    it('should return undefined when input is undefined', () => {
        const result = fontWeightsTransform(designTokens.fonts);
        expect(result).toBeUndefined();
    });

    it('should return an object matching the styled system them ui spec for fontWeights, with unique values and sorted', () => {
        designTokens = {
            fonts: {
                name1: {
                    variants: [ { fontWeight: 100 }, { fontWeight: 200 } ]
                },
                name2: {
                    variants: [ { fontWeight: 200 }, { fontWeight: 400 } ]
                }
            }
        };

        const result = fontWeightsTransform(designTokens.fonts);
        expect(result).toEqual([100, 200, 400])
    });
});
