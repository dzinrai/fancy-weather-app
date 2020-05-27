import React from 'react';
import {ReactComponent as Cloudy} from '../img/static/cloudy.svg';
import {ReactComponent as CloudyDay1} from '../img/static/cloudy-day-1.svg';
import {ReactComponent as CloudyDay2} from '../img/static/cloudy-day-2.svg';
import {ReactComponent as CloudyNight1} from '../img/static/cloudy-night-1.svg';
import {ReactComponent as CloudyNight2} from '../img/static/cloudy-night-2.svg';
import {ReactComponent as Day} from '../img/static/day.svg';
import {ReactComponent as Night} from '../img/static/night.svg';
import {ReactComponent as Rainy4} from '../img/static/rainy-4.svg';
import {ReactComponent as Rainy5} from '../img/static/rainy-5.svg';
import {ReactComponent as Rainy6} from '../img/static/rainy-6.svg';
import {ReactComponent as Rainy7} from '../img/static/rainy-7.svg';
/*
import {ReactComponent as CloudyDay3} from '../img/static/cloudy-day-3.svg';
import {ReactComponent as CloudyNight3} from '../img/static/cloudy-night-3.svg';
import {ReactComponent as Rainy1} from '../img/static/rainy-1.svg';
import {ReactComponent as Rainy2} from '../img/static/rainy-2.svg';
import {ReactComponent as Rainy3} from '../img/static/rainy-3.svg';
import {ReactComponent as Snowy1} from '../img/static/snowy-1.svg';
import {ReactComponent as Snowy2} from '../img/static/snowy-2.svg';
import {ReactComponent as Snowy3} from '../img/static/snowy-3.svg';
import {ReactComponent as Snowy4} from '../img/static/snowy-4.svg';
import {ReactComponent as Snowy5} from '../img/static/snowy-5.svg';
import {ReactComponent as Weather} from '../img/static/weather.svg';
import {ReactComponent as Sagittarius} from '../img/static/weather_sagittarius.svg';
import {ReactComponent as Sunset} from '../img/static/weather_sunset.svg';
import {ReactComponent as Sprite} from '../img/static/weather-sprite.svg';
*/
import {ReactComponent as Snowy6} from '../img/static/snowy-6.svg';
import {ReactComponent as Thunder} from '../img/static/thunder.svg';


import '../sass/iconAnim.css';

function Icon(props) { 
    let icon;
    const id = props.id;
    const width = props.width;
    const height = props.height;
    const classes = props.animate ? 'anim' : '';
    const viewBox = props.viewBox ? props.viewBox : '0 0 64 64';
    switch (id) {
        case '01d': //clear sky
            return <Day width={width} height={height} className={classes} viewBox={viewBox} />;
        case '01n': //clear sky
            return <Night width={width} height={height} className={classes} viewBox={viewBox} />;
        case '02d': //few clouds 
            return <CloudyDay1 width={width} height={height} className={classes} viewBox={viewBox} />;
        case '02n': //few clouds 
            return <CloudyNight1 width={width} height={height} className={classes} viewBox={viewBox} />;
        case '03d':
            return <CloudyDay2 width={width} height={height} className={classes} viewBox={viewBox} />;
        case '03n': //scattered clouds 
            return <CloudyNight2 width={width} height={height} className={classes} viewBox={viewBox} />;
        case '04d':
        case '04n': //broken clouds 
            return <Cloudy width={width} height={height} className={classes} viewBox={viewBox} />;
        case '10d-light':
        case '10n-light':
        case '09d-light':
        case '09n-light':
            // shower rain 
            return <Rainy4 width={width} height={height} className={classes} viewBox={viewBox} />;
        case '10d-moderate':
        case '10n-moderate':
        case '09d-moderate':
        case '09n-moderate':
            // shower rain 
            return <Rainy5 width={width} height={height} className={classes} viewBox={viewBox} />;
        case '09d':
        case '09n':
            // shower rain 
            return <Rainy6 width={width} height={height} className={classes} viewBox={viewBox} />;
        case '10d':
        case '10n':
            // rain 
            return <Rainy7 width={width} height={height} className={classes} viewBox={viewBox} />;
        case '11d':
        case '11n':
            return <Thunder width={width} height={height} className={classes} viewBox={viewBox} />;
        case '13d':
        case '13n':
                return <Snowy6 width={width} height={height} className={classes} viewBox={viewBox} />;
        default:
            return <img src={`http://openweathermap.org/img/wn/${id}@2x.png`} alt="" width="100px" height="100px" />;
    }
}

export default Icon;