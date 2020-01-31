import {textStylesTransform} from "../../src/transforms";

describe('textStyles transform', () => {
    let designTokens: any;

    beforeEach(() => {
        designTokens = {};
    });

    it('should return undefined when input is undefined', () => {
        const result = textStylesTransform(designTokens.typeStyles);
        expect(result).toBeUndefined();
    });

    it('should return an object matching the styled system them ui spec for textStyles, removing the name attribute', () => {
        designTokens = {
            typeStyles: {
                name1: {fontSize: '8px', fontWeight: '1', name: 'A'},
                name2: {fontSize: '6px', fontWeight: '2', name: 'B'},
                name3: {fontSize: '4px', fontWeight: '3', name: 'C'},
                name4: {fontSize: '8px', fontWeight: '4', name: 'D'},
            }
        };
        const result = textStylesTransform(designTokens.typeStyles);
        expect(result).toEqual({
            name1: {fontSize: '8px', fontWeight: '1'},
            name2: {fontSize: '6px', fontWeight: '2'},
            name3: {fontSize: '4px', fontWeight: '3'},
            name4: {fontSize: '8px', fontWeight: '4'},
        });
    });
});
