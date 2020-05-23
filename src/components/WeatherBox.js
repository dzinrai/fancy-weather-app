import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Clock from './Clock';

function WeatherBox(props) {
	const main = props.main;
	const temperature = main ? main.temp : '-';
	const wind = props.wind;
	const weather = props.weather;
	const description = (weather && weather.description) ? weather.description : 'few clouds';
	const icon = (weather && weather.icon) ? weather.icon : '02d';
	//
	let days = props.forecast;
	return (
	<div className="weather__box">
		<h2>{props.city}, {props.country}</h2>
		<Clock country={props.country} timezone={props.timezone} />
		<div>
			<div>{temperature}</div>
			<img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" width="100px" height="100px" />
			<div>
				<span>{description.toUpperCase()}</span><br />
				<span>FEELS LIKE: {main ? main.feels_like : '-'}</span><br />
				<span>WIND: {wind ? wind.speed : '-'} m/s</span><br />
				<span>HUMIDITY: {main ? main.humidity : '-'}%</span>
			</div>
		</div>
		<FontAwesomeIcon icon='sync-alt' spin/>
		<div className="forecast__weather">
			{days.map((day, i) => 
				<div key={i+1} className="forecast__pin">
					<span>day {i+1}</span><br />
					<span>{day.weather[0].description}</span><br />
					<img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="" width="70px" height="70px" />
					<span>day: {day.feels_like.day}</span><br />
					<span>night: {day.feels_like.night}</span><br />
					<span>temp: {day.temp.min}-{day.temp.max}</span><br />
					<span>wind: {day.wind_speed}</span><br />
					<span>humidity: {day.humidity}</span><br />
				</div>
			)
			}
		</div>
	</div>
	);
	
}

export default WeatherBox;