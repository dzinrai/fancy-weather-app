import getSeason from "../getSeason";
import {cleanup} from '@testing-library/react';

afterEach(cleanup);
test('correct season', () => {
    const day = new Date('August 19, 1975 23:15:30');
    const season = getSeason(-100,day);
    expect(season).toBe('winter');
})

test('correct season', () => {
    const day = new Date('August 19, 1975 23:15:30');
    const season = getSeason(50, day);
    expect(season).toBe('summer');
})