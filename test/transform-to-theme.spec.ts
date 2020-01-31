import {getSourcePath, isValidLookupFile} from "../src/transform-to-theme";

describe('getSourcePath', () => {
    it('should return a normalized path', () => {
        const inFile = './d/e.js';
        const callingDir = '/a/b/c';
        const result = getSourcePath(inFile, callingDir);
        expect(result).toEqual('/a/b/c/d/e.js')
    });
});

describe('isValidLookupFile', () => {
   it('should return true if lookup key exists', () => {
      const dt = { lookup: {} };
      const result = isValidLookupFile(dt);
      expect(result).toBeTruthy();
   });
    it('should return false if lookup key does not exist', () => {
        const dt = { };
        const result = isValidLookupFile(dt);
        expect(result).toBeFalsy();
    });
});
