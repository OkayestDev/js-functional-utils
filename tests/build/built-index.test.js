const jsUtil = require('../../build/index');

describe('js-util', () => {
    test('exports all', () => {
        expect(jsUtil.constructor.name).toBe('Object');
        // @ts-ignore
        expect(jsUtil.peek([1, 2])).toBe(2);
    });
});
