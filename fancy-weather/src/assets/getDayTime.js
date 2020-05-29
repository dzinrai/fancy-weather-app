import getLocaleTime from "./getLocaleDate";

 function getDayTime(countryTag, timezone) {
    const time = getLocaleTime(countryTag, timezone);
    
    const formatted = parseInt(time.slice(0,2), 10);
    let dayTime = 'day';
    if (formatted === 23 || (formatted >=0 && formatted < 6)) dayTime = 'night';
    else if (formatted >=6 && formatted < 11) dayTime = 'morning';
    else if (formatted >=17 && formatted < 23) dayTime = 'evening';
    return dayTime;
}

export default getDayTime;