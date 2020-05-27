import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSyncAlt, 
	faCloudRain, faCloudSunRain, faCloudSun, faMobile, faMapMarkerAlt, faCog, faMoon, 
	faCaretDown, faImages, faThermometerQuarter, faSun, faWind, faTint, faSatellite, faStreetView } from '@fortawesome/free-solid-svg-icons';
import { faMoon as faMoonRegular,
		 faImages as faImagesRegular  } from '@fortawesome/free-regular-svg-icons';
import Button from './components/Button';
import Search from './components/Search';
import DropButton from './components/DropButton';
import WeatherBox from './components/WeatherBox';
import ErrorLog from './components/ErrorLog';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import Map from './components/Map';
import Menu from './components/Menu';
import {light, dark, setTheme} from './components/theme.js';
import DoubleButton from './components/DoubleButton';
import countries from './countries';
import { defaultBackground, weatherURL, weather3daysURL, backgroundsURL, urlGeo, getLoc, translateAPI } from './api/apiUrls';


async function fetchAPI(url, nolog=false) {
	if (!nolog) console.log(url);
	const response = await fetch(url);
	if (!nolog) console.log(response);
	if (!response.ok) return response;
	let data = await response.json();
	if (!nolog) console.log(data);
	return data;
}
function localStorageInit(item) {
	const value = localStorage.getItem(item);
	if (value) {
		return value;
	}
	if (item === 'units') return 'metric';
}
library.add(faSyncAlt, faCloudRain, faCloudSunRain, faCloudSun, faMobile, faMapMarkerAlt, faCog, faMoon, 
	faMoonRegular, faCaretDown, faImages, faImagesRegular, faThermometerQuarter, faSun, faWind, faTint, faSatellite,
	faStreetView);

function App(props) {
	const [units, setUnits] = useState(localStorageInit('units'));
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
	const [mapUpdated, setMapUpdated] = useState({update: false});
	const [background, setBackground] = useState({
		res: null, loaded: false, styles: {}
	}); //JSON.parse(localStorage.getItem('image'))
	const [preload, setPreload] = useState({
		res: null, styles: {}, inProcess: true
	});
	const [animationOn, setAnimationOn] = useState(true);
	const [menuOpened, setMenuOpened] = useState(false);
	const [night, setNight] = useState(false);
	const [mapStyle, setMapStyle] = useState(null);
	const [query, setQuery] = useState([]);
	const [cityInfo, setCityInfo] = useState(null);
	const { t, i18n } = useTranslation();
	const changeLanguage = lng => {
		i18n.changeLanguage(lng);
	};
	useEffect(() => {
		if (openData.weather !== null) updateBackground();
	}, [openData.weather]);
	useEffect(() => {     
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
	}, []);
	useEffect(() => {
		if (openData.city && openData.weather === null) {
			console.log('x');
			weatherMain();
		}
	}, [openData.city]);
	// 
	async function weatherMain(targetCity) {
		const urlCity = !targetCity ? openData.city : targetCity;
		const url = weatherURL(urlCity);
		let data;
		data = await fetchAPI(url);
		//
		if (data.status && data.status !== 200) {
			// status: 404, statusText "Not Found"
			if (openData.weather) {
				setError(data);
			}
			return null;
		}
		let country;
		countries.forEach((countryT) => {
			if (countryT.code === data.sys.country) country = countryT.name;
		});
		setOpenData({
			city: data.name,
			country: country,
			main: data.main,
			wind: data.wind,
			weather: data.weather,
			clouds: data.clouds
		});
		setError(null);
		setLat(data.coord.lat);
		setLon(data.coord.lon);
		getForecast(data.coord.lat, data.coord.lon);
		setMapUpdated({update: true, lon: data.coord.lon, lat: data.coord.lat});
		const info = await getCityInfo(data.name + ', ' + country);
		/*setOpenData((openData) => ({
			...openData,
			city: info.city,
			country: info.country,
		}));*/
	}
	async function getCityInfo(cityLine) {
		const cityArray = {};
		const data1 = await fetchAPI(translateAPI(cityLine, null, 'en'), true);
		cityArray.en =data1.text[0];
		const data2 = await fetchAPI(translateAPI(cityLine, null, 'be'), true);
		cityArray.by =data2.text[0];
		const data3 = await fetchAPI(translateAPI(cityLine, null, 'ru'), true);
		cityArray.ru =data3.text[0];
		setCityInfo(cityArray);
	}

	async function getForecast(pLat, pLon) {
		const url = weather3daysURL(pLat, pLon);
		let data;
		data = await fetchAPI(url);
		if (!data) {
			return null;
		}
		setForecast(data.daily.slice(1,4));
		setOpenData((openData) => ({
			...openData,
			timezone: data.timezone,
			dayTemp: data.daily[0].feels_like.day,
			nightTemp: data.daily[0].feels_like.night,
		}));
	}
	function startSearch(str) {
		if (str === openData.city) return;
		let searchCity = str.trim();
		searchCity = searchCity.replace(' ', '+');
		weatherMain(searchCity);
	}
	function updateBackground() {
		//|| localStorage.getItem('image') === null
		setPreload({inProcess: true});
		let bgQuery = [...query];
		if (openData.weather) {
			console.log(openData.weather[0].main, bgQuery);
			if (openData.weather[0].main === 'Snow') bgQuery.push('snow');
			if (openData.weather[0].main === 'Clouds') bgQuery.push('clouds');
			if (openData.weather[0].main === 'Rain') bgQuery.push('rain');
		}
		
		const unsUrl = backgroundsURL(bgQuery.join());
		
		async function preLoadImg() {
			let data;
			//data = await fetchAPI(unsUrl);
			const res = data ? data.urls.full : defaultBackground;
			const backgroundStyle = {
				backgroundImage: 'url(' + res +')',
				backgroundSize: 'cover'
			};
			setPreload({inProcess: true, res: res, styles: backgroundStyle});
		}
		preLoadImg();
	}
	function finishLoad() {
		setBackground({res: preload.res, styles: preload.styles, loaded: true});
		setPreload({...preload, inProcess: false});
	}
	function mapUpdatedEnd() {
		setMapUpdated({update: false});
	}
	function animationSwitch() {
		setAnimationOn(!animationOn);
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
	if (!userLocation) return <h2>Loading location...</h2>;
	if (!openData.weather) return <h2>Loading weather...</h2>;
	return (
		<div className='app__container' style={background.loaded ? background.styles : {}}>
			{night && <div className='bg__fog'></div>}
			<header className='header'>
				<div className='container'>
					<div className='btn__container'>
						<Button 
							className='background__switch' 
							icon={'sync-alt'} 
							onClick={updateBackground}
							animate={preload.inProcess}
							animClass={'fa-spin'}
						/>
						<DropButton className='lang__switch' langChanger={(e) => changeLanguage(e)} />
						<DoubleButton 
							onClick={[() => setUnits('imperial'), () => setUnits('metric')]}
							units={units} />
					</div>
					<Search 
						text={t('Search city')}
						btnText={t('Search')}
						startSearch={startSearch}
					/>
				</div>
				
			</header>
			<main className='main'>
				<WeatherBox
					openData={openData}
					cityInfo={cityInfo ? cityInfo[i18n.language] : openData.city.concat(', ').concat(openData.country)}
					country={openData.country}
					countryTag={openData.countryTag}
					main={openData.main}
					wind={openData.wind}
					weather={openData.weather ? openData.weather[0] : {}}
					forecast={forecast !== null ? forecast : []}
					timezone={openData.timezone}
					dayTemp={openData.dayTemp}
					nightTemp={openData.nightTemp}
					units={units}
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
			<ErrorLog error={error} />
			<Menu 
				opened={menuOpened} 
				animationOn={animationOn} 
				onClickArray={[openMenu,animationSwitch,lightSwitch,() => setMapStyle(0),() => setMapStyle(5)]}
				night={night}
			/>
			<img 
				style={{visibility: 'hidden', position: 'absolute'}}
				src={preload.res ? preload.res : defaultBackground}
				onLoad={finishLoad}
				alt=''
			/>
		</div>
	);

}

export default App;
