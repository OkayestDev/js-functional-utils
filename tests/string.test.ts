import * as stringUtil from '../src/string';

describe('string', () => {
    describe('convertToSentenceCase', () => {
        test('converts camelCase to sentence case', () => {
            const string = 'sentenceCase';
            const result = stringUtil.convertToSentenceCase(string);
            expect(result).toBe('sentence case');
        });
    });

    describe('isValidEmail', () => {
        test('returns true on valid email', () => {
            const email = 'kyle@gmail.com';
            const result = stringUtil.isValidEmail(email);
            expect(result).toBe(true);
        });

        test('returns false on invalid email', () => {
            const email = 'not-valid-email';
            const result = stringUtil.isValidEmail(email);
            expect(result).toBe(false);
        });
    });
});
