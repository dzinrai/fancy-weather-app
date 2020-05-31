import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import Clock from './Clock';
import Day from './Day';
import Icon from './Icon';
import {ReactComponent as DayIcon} from '../img/static/day.svg';
import {ReactComponent as NightIcon} from '../img/static/night.svg';
import convertedUnits from '../assets/convertedUnits';

function WeatherBox(props) {
	const { t } = useTranslation();
	const city = typeof props.cityInfo === 'string' ? props.cityInfo : '-';
	const openData = props.openData;
	const main = props.openData.main;
	const units = props.units ? props.units : 'metric';
	const temperature = main ? convertedUnits(main.temp, units) : 0;
	const feels_like = main ? convertedUnits(main.feels_like, units) : 0;
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
	//
	let forecast = props.forecast;
	//<img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={t(day.weather[0].description)} />
	return (
	<div className="weather__box">
		<h2 className='city'>{city.toUpperCase()}</h2>
		<Day monthShow={true} className='time' />
		<Clock countryTag={props.openData.countryTag} timezone={props.openData.timezone} />
		<div className='main__weather'>
			<div className='left-box'>
				<FontAwesomeIcon icon='thermometer-quarter' />
				<span data-tip data-for={'now'} className="average_temp">{ (temperature ? temperature.toFixed(0) : '0') + '°'}</span>
				<Icon id={getIcon(weather)} animate={props.animationOn} width='150' height='150' viewBox="6 10 50 50" />
				<div className='during__temps'>
					<span data-tip data-for={'dayTemp'+0} className="day_temp">
						<DayIcon className={props.animationOn ? 'anim' : ''} width='40' height='40' viewBox="16 16 32 32" />
						<span>{convertedUnits(dayTemp, units).toFixed(0)+'°'}</span>
					</span>
					<span data-tip data-for={'nightTemp'+0} className="night_temp">
						<NightIcon className={props.animationOn ? 'anim' : ''} width='40' height='40' viewBox="16 16 32 32" />
						<span>{convertedUnits(nightTemp, units).toFixed(0)+'°'}</span>
					</span>
				</div>
			</div>
			<div className='right-box'>
				<span>{t(description).toUpperCase()}</span>
				<span>{t('FEELS LIKE').toUpperCase()}: {(feels_like ? feels_like.toFixed(0) : '0') + '°'}</span>
				<div className="wind-humidity__container">
					<span data-tip data-for={'wind'+0}><FontAwesomeIcon icon='wind' size='1x' /> {wind ? wind.speed.toFixed(0) : '-'} {t('m/s')}</span>
					<span data-tip data-for={'humidity'+0}><FontAwesomeIcon icon='tint' size='1x' /> {main ? main.humidity : '-'}%</span>
				</div>
			</div>
		</div>
		<div className="forecast__weather">
			{forecast.map((day, i) => 
				<div key={i+1} className="forecast__pin">
					<div className="forecast__head">
						<Day dayOffset={i+1} monthShow={false} className='forecast__day' />
						<span className="forecast__desc">{t(day.weather[0].description)}</span>
						<Icon id={getIcon(day.weather[0])} animate={props.animationOn} />
					</div>	
					<div className="forecast__line">
						<span data-tip data-for={'dayTemp'+i} className="day_temp">
							<FontAwesomeIcon icon='sun' /> 
							{convertedUnits(day.temp.day, units).toFixed(0)+ '°'}
							<ReactTooltip id={'dayTemp'+i} type='error' className='tooltip1'>
								<span>{t('By day')}</span>
							</ReactTooltip>
						</span>
						<span data-tip data-for={'wind'+i} className="wind_f">							
							{day.wind_speed.toFixed(0) + ' ' + t('m/s')}
							<ReactTooltip id={'wind'+i} type='error' className='tooltip1'>
								<span>{t('Wind')}</span>
							</ReactTooltip>
						</span>
					</div>
					<div className="forecast__line">
						<span data-tip data-for={'nightTemp'+i} className="night_temp">
							<FontAwesomeIcon icon='moon' /> 
							{convertedUnits(day.temp.night, units).toFixed(0)+ '°'}
							<ReactTooltip id={'nightTemp'+i} type='error' className='tooltip1'>
								<span>{t('At night')}</span>
							</ReactTooltip>
						</span>
						<span data-tip data-for={'humidity'+i} className="humidity_f">							
							{day.humidity + ' %'}
							<ReactTooltip id={'humidity'+i} type='error' className='tooltip1'>
								<span>{t('Humidity')}</span>
							</ReactTooltip>
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