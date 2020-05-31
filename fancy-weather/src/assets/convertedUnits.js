function convertedUnits(value, units) {
    if (units === 'metric') return value;
    if (units === 'imperial') return value * 9/5 + 32;
}

export default convertedUnits;