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
