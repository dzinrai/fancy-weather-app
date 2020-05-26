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
import { defaultBackground, weatherURL, weather3daysURL, backgroundsURL, urlGeo } from './api/apiUrls';


async function fetchAPI(url) {
	console.log(url);
	const response = await fetch(url);
	console.log(response);
	if (!response.ok) return response;
	let data = await response.json();
	console.log(data);
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
	const [animationOn, setAnimationOn] = useState(true);
	const [menuOpened, setMenuOpened] = useState(false);
	const [night, setNight] = useState(false);
	const [mapStyle, setMapStyle] = useState(null);
	const { t, i18n } = useTranslation();
	const changeLanguage = lng => {
		i18n.changeLanguage(lng);
	};
	useEffect(() => {
		updateBackground();
	}, []);
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
	}, [openData.city, openData.weather]);
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
	}

	async function getForecast(pLat, pLon) {
		const url = weather3daysURL(pLat, pLon);
		let data;
		data = await fetchAPI(url);
		if (!data) {
			return null;
		}
		setForecast(data.daily.slice(0,3));
		setOpenData((openData) => ({
			...openData,
			timezone: data.timezone
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
		const unsUrl = backgroundsURL();
		
		async function preLoadImg() {
			const data = await fetchAPI(unsUrl);
			//localStorage.setItem('image', JSON.stringify(data));
			const res = data ? data.urls.full : defaultBackground;
			const backgroundStyle = {
				backgroundImage: 'url(' + res +')',
				backgroundSize: 'cover'
			};
			setBackground({res: res, loaded: false, styles: backgroundStyle});
		}
		preLoadImg();
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
						<Button className='background__switch' icon={'sync-alt'} onClick={updateBackground} />
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
					city={openData.city}
					country={openData.country}
					countryTag={openData.countryTag}
					main={openData.main}
					wind={openData.wind}
					weather={openData.weather ? openData.weather[0] : {}}
					day1Icon='cloud-rain'
					forecast={forecast !== null ? forecast : []}
					timezone={openData.timezone}
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
			<Menu opened={menuOpened}>
				<Button 
					icon='cog' 
					className='settings__switch' 
					onClick={openMenu}
				/>
				<Button 
					icon='sync-alt' 
					className='animation__switch' 
					animClass=''
					animate={animationOn}
					onClick={animationSwitch}
				/>
				<Button 
					icon={night ? ['far', 'moon'] : ['fas', 'moon']}
					className='light__switch' 
					onClick={lightSwitch}
				/>
				<Button 
					icon={'street-view'}
					className='mapStyle__switch' 
					onClick={() => setMapStyle(0)}
				/>
				<Button 
					icon={'satellite'}
					className='mapStyle__switch' 
					onClick={() => setMapStyle(5)}
				/>
			</Menu>
			<img 
				style={{visibility: 'hidden', position: 'absolute'}}
				src={background.res ? background.res : defaultBackground}
				onLoad={() => setBackground({...background, loaded: true})}
				alt=''
			/>
		</div>
	);

}

export default App;
