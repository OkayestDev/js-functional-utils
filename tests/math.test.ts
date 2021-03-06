import * as mathUtil from '../src/math';

describe('math', () => {
    describe('computeAverage', () => {
        test('computes average of array of numbers', () => {
            const arr = [1, 2, 3];
            const average = mathUtil.computeAverage(arr);
            expect(average).toBe(2);
        });
    });

    describe('getPercentageChange', () => {
        test('returns percentage increase', () => {
            const percentageChange = mathUtil.getPercentageChange(11, 10);
            expect(percentageChange).toBe(10);
        });
    });

    test('updateAverage', () => {
        const average = 6;
        const count = 4;
        const newValue = 2;
        const updatedAverage = mathUtil.updateAverage(average, newValue, count);
        expect(updatedAverage).toBe(5);
    });
});
