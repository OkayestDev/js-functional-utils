export const computeAverage = (values: number[], hasMisses = true, missValue = null): number => {
    let hits = 0;
    let sum = 0;

    values.forEach((value) => {
        if (!hasMisses || value !== missValue) {
            sum += value;
            hits++;
        }
    });

    if (hits === 0) {
        return 0;
    }

    return sum / hits;
};

export const updateAverage = (average: number, newValue: number, newCount: number): number =>
    (average * (newCount - 1) + newValue) / newCount;

const DEFAULT_PERCENTAGE_CHECK = 0.01;
export const areNumbersWithinPercentage = (
    numberOne: number,
    numberTwo: number,
    percentage: number = DEFAULT_PERCENTAGE_CHECK
): boolean => Math.abs(numberOne - numberTwo) / numberTwo <= percentage;

export const isNumberBetweenInclusive = (
    between1: number,
    between2: number,
    check: number
): boolean => {
    const min = Math.min(between1, between2);
    const max = Math.max(between1, between2);
    return min <= check && check <= max;
};

export const getPercentageChange = (numerator: number, denominator: number): number => {
    return ((numerator - denominator) / denominator) * 100;
};

export const lessThan = (value: number, compareTo: number): boolean => value < compareTo;

export const greaterThan = (value: number, compareTo: number): boolean => value > compareTo;
