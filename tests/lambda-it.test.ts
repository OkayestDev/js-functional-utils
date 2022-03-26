import { lambdaIt } from '../src/lambda-it';

describe('lambdaIt', () => {
    test('returns lambda with object params', () => {
        const fn = ({ x, y }) => x + y;
        const lambda = lambdaIt(fn, { x: 1, y: 2 });
        const result = lambda();
        expect(result).toBe(3);
    });
});
