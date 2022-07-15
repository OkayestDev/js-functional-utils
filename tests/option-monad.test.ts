import { Option } from '../src/option-monad';

describe('option-monad', () => {
    const addWordToStr = (word: string) => (str: string) => `${str}${word}`;

    const returnUndefined = (_: any): string | undefined => undefined;

    it('chain expressions', () => {
        const result = Option.from('apple').run(addWordToStr('banana')).run(addWordToStr('orange'));
        expect(result.get()).toBe('applebananaorange');
    });

    it('returns undefined if chain returns undefined', () => {
        const result = Option.from('apple')
            .run(addWordToStr('banana'))
            .run(returnUndefined)
            .run(addWordToStr('something'));
        expect(result.get()).toBe(undefined);
    });
});
