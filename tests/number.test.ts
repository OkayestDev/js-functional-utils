import * as numberUtil from '../src/number';

describe('number', () => {
    describe('numberWithCommas', () => {
        test('returns parsed number with commas', () => {
            const oneMil = 1000000;
            const result = numberUtil.numberWithCommas(oneMil);
            expect(result).toBe('1,000,000');
        });
    });

    describe('computeAverage', () => {
        test('computes average of array of numbers', () => {
            const arr = [1, 2, 3];
            const average = numberUtil.computeAverage(arr);
            expect(average).toBe(2);
        });
    });
});
