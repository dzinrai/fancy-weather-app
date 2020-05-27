import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import Clock from './Clock';

function WeatherBox(props) {
	const { t } = useTranslation();
	const openData = props.openData;
	const main = props.main;
	const temperature = main ? convertedUnits(main.temp) : '-';
	const feels_like = main ? convertedUnits(main.feels_like) : '-';
	const wind = props.wind;
	const weather = props.weather;
	const dayTemp = openData.dayTemp ? openData.dayTemp : 0;
	const nightTemp = openData.nightTemp ? openData.nightTemp : 0;
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
		<h2 className='city'>{props.cityInfo}</h2>
		<span className='time'>{`${t(dayName)} ${day.getDate()} ${t(month)} `}</span><Clock countryTag={props.countryTag} timezone={props.timezone} />
		<div>
			<div className='main__weather'>
				<div className='left-box'>
					<FontAwesomeIcon icon='thermometer-quarter' />
					<span data-tip data-for={'now'} className="average_temp">{ temperature.toFixed(0) + '°'}</span>
					<img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description.toUpperCase()} />
					<div className='during__temps'>
						<span data-tip data-for={'dayTemp'+0} className="day_temp"><FontAwesomeIcon icon='sun' />{dayTemp.toFixed(0)+'°'}</span>
						<span data-tip data-for={'nightTemp'+0} className="night_temp"><FontAwesomeIcon icon='moon' />{nightTemp.toFixed(0)+'°'}</span>
					</div>
				</div>
				<div className='right-box'>
					<span>{t(description).toUpperCase()}</span>
					<span>{t('FEELS LIKE').toUpperCase()}: {feels_like.toFixed(0) + '°'}</span>
					<span data-tip data-for={'wind'+0}><FontAwesomeIcon icon='wind' size='1x' /> {wind ? wind.speed : '-'} m/s</span>
					<span data-tip data-for={'humidity'+0}><FontAwesomeIcon icon='tint' size='1x' /> {main ? main.humidity : '-'}%</span>
				</div>
			</div>
		</div>
		<div className="forecast__weather">
			{days.map((day, i) => 
				<div key={i+1} className="forecast__pin">
					<div className="forecast__head">
						<span className="forecast__day">{ t(whatDay[(ddd[i]).getDay()])}</span>
						<span className="forecast__desc">{t(day.weather[0].description)}</span>
						<img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={t(day.weather[0].description)} />
					</div>	
					<div className="forecast__line">
						<span data-tip data-for={'dayTemp'+i} className="day_temp">
							<FontAwesomeIcon icon='sun' /> 
							{convertedUnits(day.feels_like.day).toFixed(0)+ '°'}
							<ReactTooltip id={'dayTemp'+i} type='error' className='tooltip1'>
								<span>{t('By day')}</span>
							</ReactTooltip>
						</span>
						<span data-tip data-for={'wind'+i} className="wind_f">							
							{day.wind_speed.toFixed(0)}
							<ReactTooltip id={'wind'+i} type='error' className='tooltip1'>
								<span>{t('Wind')}</span>
							</ReactTooltip>
							<FontAwesomeIcon icon='wind' />
						</span>
					</div>
					<div className="forecast__line">
						<span data-tip data-for={'nightTemp'+i} className="night_temp">
							<FontAwesomeIcon icon='moon' /> 
							{convertedUnits(day.feels_like.night).toFixed(0)+ '°'}
							<ReactTooltip id={'nightTemp'+i} type='error' className='tooltip1'>
								<span>{t('At night')}</span>
							</ReactTooltip>
						</span>
						<span data-tip data-for={'humidity'+i} className="humidity_f">							
							{day.humidity}
							<ReactTooltip id={'humidity'+i} type='error' className='tooltip1'>
								<span>{t('Humidity')}</span>
							</ReactTooltip>
							<FontAwesomeIcon icon='tint' />
						</span>
					</div>
				</div>
			)
			}
		</div>
		<ReactTooltip id={'now'} type='error' className='tooltip1'>
			<span>{t('Now')}</span>
		</ReactTooltip>
		
	</div>
	);
	
}

export default WeatherBox;