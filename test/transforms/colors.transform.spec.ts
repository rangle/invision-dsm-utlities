import {colorsTransform} from "../../src/transforms";

describe('color transform', () => {
    let designTokens: any;

    beforeEach(() => {
        designTokens = {};
    });

    it('should return undefined when input is undefined', () => {
        const result = colorsTransform(designTokens.color);
        expect(result).toBeUndefined();
    });
});
