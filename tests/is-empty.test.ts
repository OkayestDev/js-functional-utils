import { isEmpty } from '../src/is-empty';

describe('is-emtpy', () => {
    test('returns true for string', () => {
        const result = isEmpty('');
        expect(result).toBe(true);
    });

    test('returns false for string', () => {
        const result = isEmpty('not-empty');
        expect(result).toBe(false);
    });

    test('returns true for array', () => {
        const result = isEmpty([]);
        expect(result).toBe(true);
    });

    test('returns false for array', () => {
        const result = isEmpty(['populated']);
        expect(result).toBe(false);
    });

    test('returns true for object', () => {
        const result = isEmpty({});
        expect(result).toBe(true);
    });

    test('returns false for object', () => {
        const result = isEmpty({ key: 'value' });
        expect(result).toBe(false);
    });
});
