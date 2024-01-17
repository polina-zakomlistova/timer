export const getMinMax = (value: number, min: number, max: number) => {
    if (Number.isNaN(value)) {
        value = 0;
    }
    value = Math.min(max, Math.max(min, value));

    return value;
};

export const getMin = (value: number, min: number) => {
    if (Number.isNaN(value)) {
        value = 0;
    }
    value = Math.max(min, value);

    return value;
};
