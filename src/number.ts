export const numberWithCommas = (number: number, isAllowEmpty: boolean = false): string => {
    if (!number) {
        return isAllowEmpty ? '' : '0';
    }

    const numberString = number.toString();
    const parts = numberString.split('.');

    if (parts.length === 1) {
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return `${parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${parts[1].substring(0, 2)}`;
};

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
