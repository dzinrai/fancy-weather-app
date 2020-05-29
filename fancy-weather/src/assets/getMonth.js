function getSeason() {
    const day = new Date();
    const month = day.getMonth();
    let season = 'summer';
    if ([0, 1, 11].includes(month)) season = 'winter';
    else if ([2, 3, 4].includes(month)) season = 'spring';
    else if ([8, 9, 10].includes(month)) season = 'autumn';
    return season;
}

export default getSeason;