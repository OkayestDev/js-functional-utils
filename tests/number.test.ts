import * as numberUtil from '../src/number';

describe('number', () => {
    describe('numberWithCommas', () => {
        test('returns parsed number with commas', () => {
            const oneMil = 1000000;
            const result = numberUtil.numberWithCommas(oneMil);
            expect(result).toBe('1,000,000');
        });
    });
});
