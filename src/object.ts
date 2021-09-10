export const isPopulatedObject = (obj: object): boolean => Object.keys(obj).length > 0;

export const areValuesAllNot = (object: object, valuesAreNot: any[] = [undefined]): boolean => {
    const values = Object.values(object);
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (valuesAreNot.includes(value)) {
            return false;
        }
    }
    return true;
};

export const stringArrayToObject = (strings: string[], placeholderValue = undefined): object =>
    strings.reduce(
        (acc, varName) => ({
            ...acc,
            [varName]: placeholderValue,
        }),
        {}
    );
