import defaultBg from '../img/defaultBg.jpg';

const defaultBackground = defaultBg;
const urlGeo = 'https://ipinfo.io/json?token=f9ba6cadb300c1';
const weatherApiKey = '8e204846034648c1fccc42fae990e7be';
const weatherURL = (urlCity) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${urlCity}&units=metric&appid=${weatherApiKey}`;
};
const weather3daysURL = (pLat, pLon) => {
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${pLat}&lon=${pLon}&exclude=current,minutely,hourly&units=metric&appid=${weatherApiKey}`;
};
const backgroundsURL = (themes) => {
    const query = 'nature'.concat(themes ? ','.concat(themes) : '');
    return `https://api.unsplash.com/photos/random?orientation=landscape&per_page=10&query=${query}&client_id=rxs3fdHZC3dLg5DeLiWmWrxhCsRAsH9Na-aPXHIV1ek`;		
};

export { defaultBackground, weatherURL, weather3daysURL, backgroundsURL, urlGeo };