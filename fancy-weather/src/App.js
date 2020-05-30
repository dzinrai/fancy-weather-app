import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import settings from './localStorage/localStorageInit';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSyncAlt, 
	faCloudRain, faCloudSunRain, faCloudSun, faMobile, faMapMarkerAlt, faCog, faMoon, 
	faCaretDown, faImages, faThermometerQuarter, faSun, faWind, faTint, faSatellite, faStreetView,
	faTimes, faMicrophone, faMicrophoneSlash, faPlayCircle, faStopCircle, faDove } from '@fortawesome/free-solid-svg-icons';
import { faMoon as faMoonRegular,
		 faImages as faImagesRegular  } from '@fortawesome/free-regular-svg-icons';
import Button from './components/Button';
import Search from './components/Search';
import SpeechSyn from './components/SpeechSyn';
import DropButton from './components/DropButton';
import WeatherBox from './components/WeatherBox';
import ErrorLog from './components/ErrorLog';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import Map from './components/Map';
import Menu from './components/Menu';
import {light, dark, setTheme} from './theme/theme.js';
import DoubleButton from './components/DoubleButton';
import countries from './countries';
import { defaultBackground, weatherURL, weather3daysURL, backgroundsURL, urlGeo, translateAPI } from './api/apiUrls';
import fetchAPI from './api/fetchAPI';
import getDayTime from './assets/getDayTime.js';
import getSeason from './assets/getSeason';
import shuffleArray from './assets/shuffleArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



library.add(faSyncAlt, faCloudRain, faCloudSunRain, faCloudSun, faMobile, faMapMarkerAlt, faCog, faMoon, 
	faMoonRegular, faCaretDown, faImages, faImagesRegular, faThermometerQuarter, faSun, faWind, faTint, faSatellite,
	faStreetView, faTimes, faMicrophone, faMicrophoneSlash, faPlayCircle, faStopCircle, faDove);


function App(props) {
	const { t, i18n } = useTranslation();
	const importSettings = settings ? settings : { units: "metric", night: false, animationOn: true };
	const [units, setUnits] = useState(importSettings.units);
	const [openData, setOpenData] = useState({
		city: null,
		country: null,
		countryTag: null,
		main: null,
		wind: 'none',
		weather: null,
		clouds: 'none',
		timezone: "Europe/Minsk"
	});
	const [userLocation, setUserLocation] = useState(null);
	const [lat, setLat] = useState(null);
	const [lon, setLon] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [error, setError] = useState(null);
	const [errorBg, setErrorBg] = useState(null);
	const [mapUpdated, setMapUpdated] = useState({update: false});
	const [background, setBackground] = useState({
		res: null, loaded: false, styles: {}
	}); 
	const [bgEnter, setBgEnter] = useState(false);
	const [preload, setPreload] = useState({
		res: null, styles: {}, inProcess: true
	});
	const [animationOn, setAnimationOn] = useState(importSettings.animationOn);
	const [menuOpened, setMenuOpened] = useState(false);
	const [night, setNight] = useState(importSettings.night);
	const [mapStyle, setMapStyle] = useState(null);
	const [cityInfo, setCityInfo] = useState(null);
	const [dataUpdate, setDataUpdate] = useState({});
	const parentRef = useRef(null);
	const changeLanguage = lng => {
		i18n.changeLanguage(lng);
	};
	useEffect(() => {    
		i18n.changeLanguage(importSettings.i18nextLng);
		async function preLoad() {
			const data = await fetchAPI(urlGeo);
			if (!data) {
				setUserLocation({lat: 0,lon: 0});
				return null;
			}
			let country;
			countries.forEach((countryT) => {
				if (countryT.code === data.country) country = countryT.name;
			});
			setOpenData((openData) => ({
				...openData,
				city: data.city,
				country: country,
				countryTag: data.country
			}));
			const location = {
				lat: parseFloat(data.loc.split(',')[0]),
				lon: parseFloat(data.loc.split(',')[1])
			};
			setUserLocation(location);
			setMapUpdated({update: true, lon: location.lon, lat: location.lat});
		}
		preLoad();
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		if (openData.city && openData.weather === null) {
			weatherMain();
		}
		// eslint-disable-next-line
	}, [openData.city, openData.weather]);
	useEffect(() => {
		if (openData.weather !== null) updateBackground();
		// eslint-disable-next-line
	}, [openData.weather]);
	useEffect(() => {
		if (dataUpdate.dataWeatherMain && dataUpdate.dataCityInfo && dataUpdate.dataForecast) {
			const dataWeatherMain = {...dataUpdate.dataWeatherMain};
			const dataCityInfo = {...dataUpdate.dataCityInfo};
			const dataForecast = {...dataUpdate.dataForecast};
			updateAll([dataWeatherMain, dataCityInfo, dataForecast]);
			setDataUpdate({});
		}
	}, [dataUpdate]);

	async function weatherMain(targetCity) {
		const urlCity = !targetCity ? openData.city : targetCity;
		const url = weatherURL(urlCity);
		let data;
		data = await fetchAPI(url);
		//
		if (data.status && data.status !== 200) {
			// status: 404, statusText "Not Found"
			setError(data);
			setErrorBg(null);
			return null;
		}
		countries.forEach((countryT) => {
			if (countryT.code === data.sys.country) data.countryForLine = countryT.name;
		});
		setDataUpdate((dataUpdate) => ({
			...dataUpdate,
			dataWeatherMain: data
		}));
		getForecast(data.coord.lat, data.coord.lon);
		getCityInfo(data.name + ', ' + data.countryForLine);
	}
	async function getCityInfo(cityLine) {
		// translate city and country name on 3 languages
		const cityArray = {};
		const data1 = await fetchAPI(translateAPI(cityLine, null, 'en'), false);
		cityArray.en =data1.text[0];
		const data2 = await fetchAPI(translateAPI(cityLine, null, 'be'), true);
		cityArray.by =data2.text[0];
		const data3 = await fetchAPI(translateAPI(cityLine, null, 'ru'), true);
		cityArray.ru =data3.text[0];
		console.log(cityArray);
		setDataUpdate((dataUpdate) => ({
			...dataUpdate,
			dataCityInfo: cityArray
		}));
	}
	async function getForecast(pLat, pLon) {
		// weather for 3 days
		const url = weather3daysURL(pLat, pLon);
		let data;
		data = await fetchAPI(url);
		if (data.status && data.status !== 200) {
			// status: 404, statusText "Not Found"
			setError(data);
			setErrorBg(null);
			return null;
		}
		setDataUpdate((dataUpdate) => ({
			...dataUpdate,
			dataForecast: data
		}));
	}
	function updateAll(dataArray) {
		// dataWeatherMain
		const data = dataArray[0];
		setOpenData((openData) => ({
			...openData,
			city: data.name,
			country: data.countryForLine,
			main: data.main,
			wind: data.wind,
			weather: data.weather,
			clouds: data.clouds
		}));
		setError(null);
		setLat(data.coord.lat);
		setLon(data.coord.lon);
		setMapUpdated({update: true, lon: data.coord.lon, lat: data.coord.lat});
		// dataCityInfo
		const data2 = dataArray[1];
		setCityInfo(data2);
		// dataForecast
		const data3 = dataArray[2];
		setForecast(data3.daily.slice(1,4));
		setOpenData((openData) => ({
			...openData,
			timezone: data3.timezone,
			dayTemp: data3.daily[0].temp.day,
			nightTemp: data3.daily[0].temp.night,
		}));
	}
	function startSearch(str) {
		if (str === openData.city) return;
		let searchCity = str.trim();
		searchCity = searchCity.replace(' ', '+');
		weatherMain(searchCity);
	}
	function updateBackground() {
		let bgQuery = ['nature'];
		if (openData.weather) {
			if (openData.weather[0].main === 'Snow') bgQuery.push('snow');
			if (openData.weather[0].main === 'Clouds') bgQuery.push('clouds');
			if (openData.weather[0].main === 'Rain') bgQuery.push('rain');
		}
		const timeData = getDayTime(openData.countryTag, openData.timezone);
		bgQuery.push(timeData);
		const season = getSeason(lat ? lat : userLocation.lat);
		bgQuery.push(season);
		const unsUrl = backgroundsURL(bgQuery.join());
		console.log('backgrounds tags ' + bgQuery);

		async function preLoadImg() {
			let data;
			let res = defaultBackground;
			data = await fetchAPI(unsUrl);
			if (data && data.status && data.status !== 200) {
				// status: 403, statusText "Forbidden"
				setError(null);
				setErrorBg({statusText: "Forbidden"});
			} else if (data && data.photos && data.photos.photo) {
				const arr = shuffleArray([...data.photos.photo]);
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].height_h > 500 && arr[i].url_h) {
						res = arr[i].url_h;
						break;
					}
				}
			}
			const backgroundStyle = {
				backgroundImage: 'url(' + res +')',
				backgroundSize: 'cover'
			};
			setPreload({res: res, styles: backgroundStyle});
		}
		preLoadImg();
	}
	function finishLoad(e) {
		const bg = {res: preload.res, styles: preload.styles, loaded: true};
		setBgEnter(true);
		setBackground(bg);
		setTimeout(() => {
			setBgEnter(false);
		}, 1000);
	}
	function mapUpdatedEnd() {
		setMapUpdated({update: false});
	}
	function animationSwitch() {
		const animOn = !animationOn;
		setAnimationOn(animOn);
		localStorage.setItem('animationOn', animOn);
	}
	function openMenu() {
		setMenuOpened(!menuOpened);
	}
	function lightSwitch() {
		const nightM = !night;
		setNight(nightM);
		setMapStyle(null);
		setTheme(nightM ? dark : light);
		localStorage.setItem('night', nightM);
	}
	function handleError(newError) {
		if (newError) setError(newError);
		else {
			setError({statusText: "Error"});
		}
	}
	if (!userLocation) return (
		<div className='app__container load__loc'>
			<FontAwesomeIcon icon='dove' />
			<h2>{t('Loading location')}</h2>
		</div>
	);
	if (!openData.weather) return (
		<div className='app__container load__weather'>
			<FontAwesomeIcon icon='dove' />
			<h2>{t('Loading weather')}</h2>
		</div>
	);
	return (
		<div className='app__container' style={background.styles} ref={ parentRef }>
			{night && <div className='bg__fog'></div>}
			{bgEnter && <div className='bg__enter' style={{...background.styles, height: parentRef.current.offsetHeight}}></div>}
			<header className='header'>
				<div className='container'>
					<div className='btn__container'>
						<Button 
							className='background__switch' 
							icon={'sync-alt'} 
							onClick={updateBackground}
							animate={background.res !== preload.res}
							animClass={'fa-spin'}
						/>
						<DropButton className='lang__switch' langChanger={(e) => changeLanguage(e)} />
						<DoubleButton 
							onClick={[() => setUnits('imperial'), () => setUnits('metric')]}
							units={units} />
						<SpeechSyn 
							cityInfo={cityInfo ? cityInfo[i18n.language] : openData.city.concat(', ').concat(openData.country)}
							openData={openData}
							lang={i18n.language}
							hide={true}
						/>
					</div>
					<Search 
						text={t('Search city')}
						btnText={t('Search')}
						startSearch={startSearch}
						error={error ? true : false}
						errorHandler={(newError) => handleError(newError)}
					/>
				</div>				
			</header>
			<main className='main'>
				<WeatherBox
					openData={openData}
					cityInfo={cityInfo ? cityInfo[i18n.language] : openData.city.concat(', ').concat(openData.country)}
					forecast={forecast !== null ? forecast : []}
					units={units}
					animationOn={animationOn}
				/>
				<div className='map-side__container'>
					<div className='mapbox__container'>
						<Map 
							lon={lon} 
							lat={lat} 
							mapUpdated={mapUpdated} 
							updateEnd={mapUpdatedEnd}  
							animate={animationOn}
							night={night}
							style={mapStyle}
						/>
					</div>
					<div className='coord__container'>
						<span>Latitude: {lat? lat.toFixed(2) : '0'}</span>
						<span>Longitude: {lon ? lon.toFixed(2) : '0'}</span>
					</div>
				</div>
			</main>
			<ErrorLog error={error} clearErrors={() => setError(null)} />
			<ErrorLog error={errorBg} clearErrors={() => setErrorBg(null)} />
			<Menu 
				opened={menuOpened} 
				animationOn={animationOn} 
				onClickArray={[openMenu,animationSwitch,lightSwitch,() => setMapStyle(0),() => setMapStyle(5)]}
				night={night}
			/>
			<img 
				style={{visibility: 'hidden', position: 'absolute'}}
				src={preload.res}
				onLoad={(e) => finishLoad(e)}
				alt=''
			/>
		</div>
	);

}

export default App;
