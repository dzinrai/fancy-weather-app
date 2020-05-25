import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Clock from './Clock';

function WeatherBox(props) {
	const main = props.main;
	const temperature = main ? main.temp : '-';
	const feels_like = main ? main.feels_like : '-';
	const wind = props.wind;
	const weather = props.weather;
	const description = (weather && weather.description) ? weather.description : 'few clouds';
	const icon = (weather && weather.icon) ? weather.icon : '02d';
	const day = new Date();
	const dayName = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][day.getDay()];
	const month = day.toDateString().split(' ')[1];
	//
	let days = props.forecast;
	return (
	<div className="weather__box">
		<h2>{props.city}, {props.country}</h2>
		<span>{`${dayName} ${day.getDate()} ${month} `}</span><Clock country={props.country} timezone={props.timezone} />
		<div>
			<div className='main__weather'>
				<div className='left-box'>
					<FontAwesomeIcon icon='thermometer-quarter' />
					<span>{temperature + '°'}</span>
					<img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description.toUpperCase()} />
				</div>
				<div className='right-box'>
					<span>{description.toUpperCase()}</span>
					<span>FEELS LIKE: {feels_like.toFixed(0) + '°'}</span>
					<span><FontAwesomeIcon icon='wind' size='2x' /> {wind ? wind.speed : '-'} m/s</span>
					<span><FontAwesomeIcon icon='tint' size='2x' /> {main ? main.humidity : '-'}%</span>
				</div>
			</div>
		</div>
		<div className="forecast__weather">
			{days.map((day, i) => 
				<div key={i+1} className="forecast__pin">
					<div>
						<span>day {i+1}</span><br />
						<span>{day.weather[0].description}</span><br />
						<img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
					</div>	
					<div>
						<span><FontAwesomeIcon icon='sun' /> {day.feels_like.day.toFixed(0)+ '°'}</span>
						<span><FontAwesomeIcon icon='wind' /> {day.wind_speed.toFixed(0)}</span>
					</div>
					<div>
						<span><FontAwesomeIcon icon='moon' /> {day.feels_like.night.toFixed(0)+ '°'}</span>
						<span><FontAwesomeIcon icon='tint' /> {day.humidity}</span>
					</div>
				</div>
			)
			}
		</div>
	</div>
	);
	
}

export default WeatherBox;