import { grab } from '../src/grab';

describe('grab', () => {
    test('returns value of object', () => {
        const obj = {
            key: 'value',
        };

        const result = grab('key')(obj);
        expect(result).toBe('value');
    });
});
