import { ifIt } from '../src/if-it';

describe('if-it', () => {
    test('call fn on true evaluator', () => {
        const result = ifIt(
            () => true,
            () => 'howdy',
            1
        );
        expect(result).toBe('howdy');
    });

    test('returns value on false evaluator', () => {
        const result = ifIt(
            () => false,
            () => null,
            1
        );
        expect(result).toBe(1);
    });
});
