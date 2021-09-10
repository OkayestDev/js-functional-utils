import { lambdaIt } from '../src/lambda-it';

describe('lambdaIt', () => {
    test('returns lambda calling function with spread array', () => {
        const fn = (x, y, z) => x + y + z;
        const lambda = lambdaIt([1, 2, 3], fn);
        const result = lambda();
        expect(result).toBe(6);
    });

    test('returns lambda with object params', () => {
        const fn = ({ x, y }) => x + y;
        const lambda = lambdaIt({ x: 1, y: 2 }, fn);
        const result = lambda();
        expect(result).toBe(3);
    });
});
