import React, { useState, useEffect } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSyncAlt, faCloudRain, faCloudSunRain, faCloudSun } from '@fortawesome/free-solid-svg-icons';
import Button from './components/Button';
import Search from './components/Search';
import DropButton from './components/DropButton';
import WeatherBox from './components/WeatherBox';
import MapBox from './components/MapBox';
import ErrorLog from './components/ErrorLog';

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

library.add(faSyncAlt, faCloudRain, faCloudSunRain, faCloudSun);

function App(props) {
	const [city, setCity] = useState('Minsk');
	const [country, setCountry] = useState('Belarus');
	const [units, setUnits] = useState('metric');
	const [main, setMain] = useState(null);
	const [wind, setWind] = useState('none');
	const [weather, setWeather] = useState(null);
	const [clouds, setClouds] = useState('none');
	const [userLocation, setUserLocation] = useState(null);
	const [lat, setLat] = useState(null);
	const [lon, setLon] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [timezone, setTimezone] = useState("Europe/Minsk");

	const [openWeather, setOpenWeather] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {     
		console.log('effect'); 
		if (userLocation === null) {
			async function preLoad() {
				const data = await fetchAPI(urlGeo);
				if (!data) {
					setCity('Temp');
					setUserLocation({lat: 53.9,lon: 27.57});
					return null;
				}
				setCity(data.city);
				setUserLocation({lat: data.loc.split(',')[0],lon: data.loc.split(',')[1]});
				if (!weather) weatherGoTemp();
			}
			preLoad();
		}
	});
	// 
	async function weatherGoTemp(targetCity) {
		//api.openweathermap.org/data/2.5/weather?q={city name}&units=metric&appid={your api key}
		const urlCity = !targetCity ? city : targetCity;
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${urlCity}&units=${units}&appid=${apiKey}`;
		const data = await fetchAPI(url);
		if (data.status && data.status !== 200) {
			// status: 404, statusText "Not Found"
			if (weather) {
				setError(data);
				return null;
			}
			setMain({feels_like: 0,humidity: 0,pressure: 0,temp: 0,temp_max: 0,temp_min: 0});
			setWind({deg: 350,gust: 5,speed: 2});
			setWeather({description: "nothing",icon: "09d",id: 520,main: "sadness"});
			setClouds({all: 75});
			return null;
		}
		setError(null);
		setCity(data.name);
		setMain(data.main);
		setWind(data.wind);
		setWeather(data.weather);
		setClouds(data.clouds);
		setOpenWeather(data);
		setCountry(data.sys.country);
		// create new map
		setLat(null);
		setLon(null);
		setLat(data.coord.lat);
		setLon(data.coord.lon);
		//
		getForecast(data.coord.lat, data.coord.lon);
	}

	async function getForecast(pLat, pLon) {
		const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${pLat}&lon=${pLon}&exclude=current,minutely,hourly&units=${units}&appid=${apiKey}`;
		const data = await fetchAPI(url);
		if (!data) {
			return null;
		}
		setForecast(data.daily.slice(0,3));
		setTimezone(data.timezone);
	}
	function startSearch(str) {
		if (str === city) return;
		let searchCity = str.trim();
		searchCity = searchCity.replace(' ', '+');
		weatherGoTemp(searchCity);
	}

	if (!userLocation) return <h2>Loading location...</h2>;
	if (!weather) return <h2>Loading weather...</h2>;
	return (
		<div className='app__container'>
			<header>
				<Button classes='' icon='sync-alt' />
				<DropButton classes='' />
				<Button text='F' classes='' icon='cloud-sun' />
				<Button text='C' classes='' />
				<Search 
					text='Search city' 
					classes='' 
					btnText='Search' 
					startSearch={startSearch}
				/>
			</header>
			<main>
				<WeatherBox
					city={city}
					country={country}
					main={main}
					wind={wind}
					weather={weather ? weather[0] : {}}
					day1Icon='cloud-rain'
					forecast={forecast !== null ? forecast : []}
					timezone={timezone}
				/>
				<MapBox lon={lon} lat={lat} />
			</main>
			<ErrorLog error={error} />
		</div>
	);

}

export default App;
