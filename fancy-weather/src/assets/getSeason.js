function getSeason(lat, date) {
    const day = date ? date : new Date();
    const month = day.getMonth();
    const seasons_ = (lat >= 0) ? ['summer', 'autumn', 'winter', 'spring'] : ['winter', 'spring', 'summer', 'autumn'];
    let season = seasons_[0];
    if ([8, 9, 10].includes(month)) season =  seasons_[1];
    else if ([0, 1, 11].includes(month)) season = seasons_[2];
    else if ([2, 3, 4].includes(month)) season = seasons_[3];
    return season;
}

export default getSeason;