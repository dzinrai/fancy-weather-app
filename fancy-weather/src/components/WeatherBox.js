import React, { StrictMode } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import Clock from './Clock';
import Icon from './Icon';
import {ReactComponent as Day} from '../img/static/day.svg';
import {ReactComponent as Night} from '../img/static/night.svg';

function WeatherBox(props) {
	const { t } = useTranslation();
	const openData = props.openData;
	const main = props.openData.main;
	const temperature = main ? convertedUnits(main.temp) : '-';
	const feels_like = main ? convertedUnits(main.feels_like) : '-';
	const wind = props.openData.wind;
	const weather = props.openData.weather[0];
	const dayTemp = openData.dayTemp ? openData.dayTemp : 0;
	const nightTemp = openData.nightTemp ? openData.nightTemp : 0;
	const description = (weather && weather.description) ? weather.description : 'few clouds';
	//
	const getIcon = (weatherT) => {
		let icon = (weatherT && weatherT.icon) ? weatherT.icon : '---';
		if (weatherT && weatherT.description === 'light rain') icon = icon.concat('-light');
		if (weatherT && weatherT.description === 'moderate rain') icon = icon.concat('-moderate');
		return icon;
	};
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
	//<img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={t(day.weather[0].description)} />
	return (
	<div className="weather__box">
		<h2 className='city'>{props.cityInfo}</h2>
		<span className='time'>{`${t(dayName)} ${day.getDate()} ${t(month)} `}</span><Clock countryTag={props.openData.countryTag} timezone={props.openData.timezone} />
		<div>
			<div className='main__weather'>
				<div className='left-box'>
					<FontAwesomeIcon icon='thermometer-quarter' />
					<span data-tip data-for={'now'} className="average_temp">{ temperature.toFixed(0) + '°'}</span>
					<Icon id={getIcon(weather)} animate={props.animationOn} width='150' height='150' viewBox="6 10 50 50" />
					<div className='during__temps'>
						<span data-tip data-for={'dayTemp'+0} className="day_temp">
							<Day className={props.animationOn ? 'anim' : ''} width='40' height='40' viewBox="16 16 32 32" />
							<span>{dayTemp.toFixed(0)+'°'}</span>
						</span>
						<span data-tip data-for={'nightTemp'+0} className="night_temp">
							<Night className={props.animationOn ? 'anim' : ''} width='40' height='40' viewBox="16 16 32 32" />
							<span>{nightTemp.toFixed(0)+'°'}</span>
						</span>
					</div>
				</div>
				<div className='right-box'>
					<span>{t(description).toUpperCase()}</span>
					<span>{t('FEELS LIKE').toUpperCase()}: {feels_like.toFixed(0) + '°'}</span>
					<div className="wind-humidity__container">
						<span data-tip data-for={'wind'+0}><FontAwesomeIcon icon='wind' size='1x' /> {wind ? wind.speed.toFixed(0) : '-'} m/s</span>
						<span data-tip data-for={'humidity'+0}><FontAwesomeIcon icon='tint' size='1x' /> {main ? main.humidity : '-'}%</span>
					</div>
				</div>
			</div>
		</div>
		<div className="forecast__weather">
			{days.map((day, i) => 
				<div key={i+1} className="forecast__pin">
					<div className="forecast__head">
						<span className="forecast__day">{ t(whatDay[(ddd[i]).getDay()])}</span>
						<span className="forecast__desc">{t(day.weather[0].description)}</span>
						<Icon id={getIcon(day.weather[0])} animate={props.animationOn} width='70' height='70' />
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