import { invokeFns } from '../src/invoke-fns';

describe('invoke-fns', () => {
    test('typings', () => {
        const add = (x, y): number => x + y;
        const concat = (x, y): string => String(x) + String(y);

        const callBoth = invokeFns(add, concat)(1, 2);

        expect(callBoth[0]).toBe(3);
        expect(callBoth[1]).toBe('12');
    });
});
