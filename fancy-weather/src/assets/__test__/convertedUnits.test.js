import convertedUnits from "../convertedUnits";
import {cleanup} from '@testing-library/react';

afterEach(cleanup);
test('correct units', () => {
    const value = convertedUnits(15, 'metric');
    expect(value).toBe(15);
})

test('correct units', () => {
    const value = convertedUnits(15, 'imperial');
    expect(value).toBe(15 * 9/5 + 32);
})

test('correct units', () => {
    const value = convertedUnits(15, 'imperial');
    expect(value).toBe(15 * 9/5 + 32);
})

test('correct units', () => {
    const value = convertedUnits(0);
    expect(value).toBe(0);
})
