import { Option } from '../src/option-monad';

jest.setTimeout(1000000000);

describe('option-monad', () => {
    const addWordToStr = (word: string) => (str: string) => `${str} ${word}`;

    const returnUndefined = (_: any): string | undefined => undefined;

    const returnAnOption = (word: string) => Option.from(`option_${word}`);

    const asyncAddWordToStr = (word: string) => async (str: string) =>
        new Promise((resolve) => {
            setTimeout(() => {
                return resolve(`${str} ${word}`);
            }, 500);
        });

    it('chain expressions', () => {
        const result = Option.from('apple').run(addWordToStr('banana')).run(addWordToStr('orange'));
        expect(result.get()).toBe('apple banana orange');
    });

    it('returns undefined if chain returns undefined', () => {
        const result = Option.from('apple')
            .run(addWordToStr('banana'))
            .run(returnUndefined)
            .run(addWordToStr('something'));
        expect(result.get()).toBe(undefined);
    });

    it('works with functions that return an option', () => {
        const result = Option.from('apple')
            .run(addWordToStr('banana'))
            .run(returnAnOption)
            .run(addWordToStr('something'));
        expect(result.get()).toBe('option_apple banana something');
    });

    it('works with async functions', async () => {
        const result = await Option.from('apple')
            .run(asyncAddWordToStr('banana'))
            .run(addWordToStr('orange'))
            .run(asyncAddWordToStr('grape'))
            .run(asyncAddWordToStr('pear'));
        expect(await result.get()).toBe('apple banana orange grape pear');
    });
});
