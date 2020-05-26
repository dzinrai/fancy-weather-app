import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Clock from './Clock';

function WeatherBox(props) {
	const { t } = useTranslation();
	const main = props.main;
	const temperature = main ? convertedUnits(main.temp) : '-';
	const feels_like = main ? convertedUnits(main.feels_like) : '-';
	const wind = props.wind;
	const weather = props.weather;
	const description = (weather && weather.description) ? weather.description : 'few clouds';
	const icon = (weather && weather.icon) ? weather.icon : '02d';
	const day = new Date();
	const whatDay = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	const dayName = whatDay[day.getDay()];
	const month = day.toDateString().split(' ')[1];
	//
	let days = props.forecast;
	const d1 = new Date();
	const d2 = new Date();
	const d3 = new Date();
	d1.setDate(d1.getDate()+1);
	d2.setDate(d2.getDate()+2);
	d3.setDate(d3.getDate()+3);
	const ddd = [d1, d2, d3];
	function convertedUnits(value) {
		const units = props.units;
		if (units === 'metric') return value;
		if (units === 'imperial') return value * 9/5 + 32;

	}
	return (
	<div className="weather__box">
		<h2 className='city'>{props.city}, {props.country}</h2>
		<span className='time'>{`${t(dayName)} ${day.getDate()} ${t(month)} `}</span><Clock countryTag={props.countryTag} timezone={props.timezone} />
		<div>
			<div className='main__weather'>
				<div className='left-box'>
					<FontAwesomeIcon icon='thermometer-quarter' />
					<span>{ temperature.toFixed(0) + '°'}</span>
					<img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description.toUpperCase()} />
				</div>
				<div className='right-box'>
					<span>{t(description).toUpperCase()}</span>
					<span>{t('FEELS LIKE').toUpperCase()}: {feels_like.toFixed(0) + '°'}</span>
					<span><FontAwesomeIcon icon='wind' size='1x' /> {wind ? wind.speed : '-'} m/s</span>
					<span><FontAwesomeIcon icon='tint' size='1x' /> {main ? main.humidity : '-'}%</span>
				</div>
			</div>
		</div>
		<div className="forecast__weather">
			{days.map((day, i) => 
				<div key={i+1} className="forecast__pin">
					<div>
						<span>{ t(whatDay[(ddd[i]).getDay()])}</span><br />
						<span className="forecast__desc">{t(day.weather[0].description)}</span><br />
						<img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={t(day.weather[0].description)} />
					</div>	
					<div>
						<span><FontAwesomeIcon icon='sun' /> {convertedUnits(day.feels_like.day).toFixed(0)+ '°'}</span>
						<span><FontAwesomeIcon icon='wind' /> {day.wind_speed.toFixed(0)}</span>
					</div>
					<div>
						<span><FontAwesomeIcon icon='moon' /> {convertedUnits(day.feels_like.night).toFixed(0)+ '°'}</span>
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