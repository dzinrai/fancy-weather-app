import React, { useState, useEffect } from 'react';
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
//map-marker-alt
//https://api.unsplash.com/photos/random?orientation=landscape&per_page=50&query=nature&client_id=rxs3fdHZC3dLg5DeLiWmWrxhCsRAsH9Na-aPXHIV1ek
//units=imperial
//bd684c495ea077a1a37279e1c4dcc4e5
//mapbox
//pk.eyJ1IjoiYWxleG1hbGtvdiIsImEiOiJja2FjaDU5bWUxZ2x6MnNtazdkMWx1MzZiIn0.T9U5tfEljgOS3bBS17wpKA

const urlGeo = 'https://ipinfo.io/json?token=f9ba6cadb300c1';
const apiKey = '8e204846034648c1fccc42fae990e7be';
async function fetchAPI(url) {
	console.log(url);
	const response = await fetch(url);
	console.log(response);
	if (!response.ok) return response;
	let data = await response.json();
	console.log(data);
	return data;
}

library.add(faSyncAlt, faCloudRain, faCloudSunRain, faCloudSun, faMobile, faMapMarkerAlt, faCog, faMoon, 
	faMoonRegular, faCaretDown, faImages, faImagesRegular, faThermometerQuarter, faSun, faWind, faTint, faSatellite,
	faStreetView);

function App(props) {
	const [units, setUnits] = useState('metric');
	const [openData, setOpenData] = useState({
		city: 'Minsk',
		country: 'Belarus',
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
	const [background, setBackground] = useState(JSON.parse(localStorage.getItem('image')));
	const backgroundStyle = background ? {
		backgroundImage: 'url(' + background.urls.full +')',
		backgroundSize: 'cover'
	} : {};
	const [animationOn, setAnimationOn] = useState(true);
	const [menuOpened, setMenuOpened] = useState(false);
	const [night, setNight] = useState(false);
	const [mapStyle, setMapStyle] = useState(null);

	useEffect(() => {     
		if (userLocation === null) {
			async function preLoad() {
				const data = await fetchAPI(urlGeo);
				if (!data) {
					setUserLocation({lat: 0,lon: 0});
					return null;
				}
				setOpenData((openData) => ({
					...openData,
					city: data.city
				}));
				const location = {
					lat: parseFloat(data.loc.split(',')[0]),
					lon: parseFloat(data.loc.split(',')[1])
				};
				setUserLocation(location);
				setMapUpdated({update: true, lon: location.lon, lat: location.lat});
				if (openData.weather === null) weatherGoTemp();
			}
			preLoad();
		}
		if (background === null) {
			if (localStorage.getItem('image')) {
				return;
			}
			const unsUrl = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=10&query=nature&client_id=rxs3fdHZC3dLg5DeLiWmWrxhCsRAsH9Na-aPXHIV1ek`;
			async function preLoadImg() {
				const data = await fetchAPI(unsUrl);
				localStorage.setItem('image', JSON.stringify(data));
				setBackground(data);
			}
			preLoadImg();
		}
	}, [userLocation, openData.weather, background]);
	// 
	async function weatherGoTemp(targetCity) {
		const urlCity = !targetCity ? openData.city : targetCity;
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${urlCity}&units=${units}&appid=${apiKey}`;
		const weatherLS = localStorage.getItem('weather');
		let data;
		//
		if (weatherLS) {
			data = JSON.parse(weatherLS);
		} else {
			data = await fetchAPI(url);
			localStorage.setItem('weather', JSON.stringify(data));
		}
		//
		if (data.status && data.status !== 200) {
			// status: 404, statusText "Not Found"
			if (openData.weather) {
				setError(data);
			}
			return null;
		}
		setOpenData({
			city: data.name,
			country: data.sys.country,
			main: data.main,
			wind: data.wind,
			weather: data.weather,
			clouds: data.clouds
		});
		setError(null);
		// create new map
		setLat(data.coord.lat);
		setLon(data.coord.lon);
		getForecast(data.coord.lat, data.coord.lon);
		setMapUpdated({update: true, lon: data.coord.lon, lat: data.coord.lat});
	}

	async function getForecast(pLat, pLon) {
		const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${pLat}&lon=${pLon}&exclude=current,minutely,hourly&units=${units}&appid=${apiKey}`;
		const weatherLS = localStorage.getItem('weatherForecast');
		let data;
		//
		if (weatherLS) {
			data = JSON.parse(weatherLS);
		} else {
			data = await fetchAPI(url);
			localStorage.setItem('weatherForecast', JSON.stringify(data));
		}
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
		weatherGoTemp(searchCity);
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
		<div className='app__container' style={backgroundStyle}>
			<header className='header'>
				<div className='container'>
					<div className='btn__container'>
						<Button className='background__switch' icon={'sync-alt'} />
						<DropButton className='lang__switch' />
						<DoubleButton 
							onClick={[() => setUnits('imperial'), () => setUnits('metric')]}
							units={units} />
					</div>
					<Search 
						text='Search city' 
						btnText='Search' 
						startSearch={startSearch}
					/>
				</div>
				
			</header>
			<main className='main'>
				<WeatherBox
					city={openData.city}
					country={openData.country}
					main={openData.main}
					wind={openData.wind}
					weather={openData.weather ? openData.weather[0] : {}}
					day1Icon='cloud-rain'
					forecast={forecast !== null ? forecast : []}
					timezone={openData.timezone}
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
			
		</div>
	);

}

export default App;
