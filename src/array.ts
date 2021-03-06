import { equalAny } from './boolean';

export const peek = <T>(array: T[]): T => array[array.length - 1];

export const fromEnd = <T>(array: T[], fromEndOffset: number): T =>
    array[array.length - fromEndOffset];

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
    let max = -Infinity;

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

export const isMaxOfObjectArray = (array: any[], index: number, highKey: string): boolean => {
    const { [highKey]: max } = array[index];

    for (let i = 0; i < array.length; i++) {
        const { [highKey]: currentValue } = array[i];
        if (i !== index && currentValue > max) {
            return false;
        }
    }

    return true;
};

export const isMinOfObjectArray = (array: any[], index: number, lowKey: string): boolean => {
    const { [lowKey]: min } = array[index];

    for (let i = 0; i < array.length; i++) {
        const { [lowKey]: currentValue } = array[i];
        if (i !== index && currentValue < min) {
            return false;
        }
    }

    return true;
};

export const isEmptyArray = (array: any[]): boolean =>
    equalAny(array, [undefined, null]) || array.length === 0;
