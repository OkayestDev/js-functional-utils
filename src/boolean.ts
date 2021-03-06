type EvaluatorType = Function | any;

const getEvaluated = (evaluator: EvaluatorType, value) => {
    if (typeof evaluator === 'function') {
        return evaluator(value);
    }
    return evaluator;
};

export const orChain =
    (...evaluators: EvaluatorType[]) =>
    (value): boolean => {
        for (let i = 0; i < evaluators.length; i++) {
            const result = getEvaluated(evaluators[i], value);
            if (result) {
                return true;
            }
        }
        return false;
    };

export const andChain =
    (...evaluators: EvaluatorType[]) =>
    (value): boolean => {
        let result = true;
        for (let i = 0; i < evaluators.length; i++) {
            result = result && getEvaluated(evaluators[i], value);
            if (!result) {
                return false;
            }
        }
        return result;
    };

export const equalAny = (value: any, checks: any[]): boolean =>
    checks.reduce((acc, checked) => acc || value === checked, false);
