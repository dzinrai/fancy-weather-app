import defaultBg from '../img/defaultBg.jpg';

const defaultBackground = defaultBg;
const urlGeo = 'https://ipinfo.io/json?token=f9ba6cadb300c1';
const weatherApiKey = '8e204846034648c1fccc42fae990e7be';
const cageData = '1a72d9365e6b4965a0ac1704fb67223c';
const p = (str) => {
    const newStr = str.trim().replace(' ', '');
    return newStr;
};
const weatherURL = (city) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;
};
const weather3daysURL = (pLat, pLon) => {
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${pLat}&lon=${pLon}&exclude=minutely,hourly&units=metric&appid=${weatherApiKey}`;
};
const backgroundsURL = (themes) => {
    const query = 'nature'.concat(themes ? ','.concat(themes) : '');
    return `https://api.unsplash.com/photos/random?orientation=landscape&per_page=10&query=${query}&client_id=rxs3fdHZC3dLg5DeLiWmWrxhCsRAsH9Na-aPXHIV1ek`;		
};
const getLoc = (placeName,lang='en') => {
    return `https://api.opencagedata.com/geocode/v1/json?q=${p(placeName)}&key=${cageData}&language=${lang}&pretty=1`;
};
const getPlace = (lng, lat,lang='en') => {
    return `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${cageData}&language=${lang}&pretty=1`;
};
const translateAPI = (str, initLang, targetLang) => {
    const pair = initLang ? `${initLang}-${targetLang}` : targetLang;
    const prepStr = str;
    return `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200506T113704Z.64e070cb5c691f68.0ab213249c3470faf758481f9a2bc04d3782b82c&text=${prepStr}&lang=${pair}`;
};

export { defaultBackground, weatherURL, weather3daysURL, backgroundsURL, urlGeo, getPlace, getLoc, translateAPI };