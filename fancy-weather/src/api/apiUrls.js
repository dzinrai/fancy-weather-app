import defaultBg from '../img/defaultBg.jpg';

const defaultBackground = defaultBg;
const proxy = 'https://fast-atoll-77681.herokuapp.com/';
const urlGeo = proxy + 'https://ipinfo.io/json?token=f9ba6cadb300c1';
const weatherApiKey = '8e204846034648c1fccc42fae990e7be';
const cageData = '1a72d9365e6b4965a0ac1704fb67223c';
const flickr = '8d4697319c704b6ecf246ef8d416032f';
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
const backgroundsURL = (themes, page=1) => {
    const query = themes ? themes : 'nature';
    const add = ['sky','forest','field','building','ocean','see','mountain','tree','fire','flora','fauna'];
    const i = Math.floor(Math.random() * add.length);
    //console.log(query+','+add[i]);
    //return `https://api.unsplash.com/photos/random?orientation=landscape&per_page=10&query=${query}&client_id=rxs3fdHZC3dLg5DeLiWmWrxhCsRAsH9Na-aPXHIV1ek`;		
    return proxy + `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickr}&tags=${query+','+add[i]}&tag_mode=all&extras=url_h&page=${page}&format=json&nojsoncallback=1`;
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
    return `https://translate.yandex.net/api/v1.5/tr.json/translate?key=kekw&text=${prepStr}&lang=${pair}`;
};

export { defaultBackground, weatherURL, weather3daysURL, backgroundsURL, urlGeo, getPlace, getLoc, translateAPI };