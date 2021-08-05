export const peek = <T>(array: T[]): T => array[array.length - 1];

interface MinMaxInterface {
    min: number;
    max: number;
}
export const getMaxMinOfObjectArray = (
    array: any[],
    lowKey: string,
    highKey: string
): MinMaxInterface => {
    let min = Infinity;
    let max = -1;

    array.forEach((value) => {
        const { [lowKey]: low, [highKey]: high } = value;

        if (low < min) {
            min = low;
        }

        if (high > max) {
            max = high;
        }
    });

    return {
        max,
        min,
    };
};
