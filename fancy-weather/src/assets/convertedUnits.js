function convertedUnits(value, units) {
    let newValue = (typeof value !== 'number') ? 0 : value;
    if (units === 'imperial') return newValue * 9/5 + 32;
    return newValue;
}

export default convertedUnits;