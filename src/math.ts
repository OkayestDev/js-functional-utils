export const computeAverage = (values: number[]): number => {
    let hits = 0;
    let sum = 0;

    values.forEach((value) => {
        if (value !== null) {
            sum += value;
            hits++;
        }
    });

    if (hits === 0) {
        return 0;
    }

    return sum / hits;
};

const DEFAULT_PERCENTAGE_CHECK = 0.01;
export const areNumbersWithinPercentage = (
    numberOne: number,
    numberTwo: number,
    percentage: number = DEFAULT_PERCENTAGE_CHECK
): boolean => Math.abs(numberOne - numberTwo) / numberTwo <= percentage;

export const isNumberBetween = (between1: number, between2: number, check: number): boolean => {
    const min = Math.min(between1, between2);
    const max = Math.max(between1, between2);
    return min <= check && check <= max;
};
