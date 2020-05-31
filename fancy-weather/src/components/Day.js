import React from 'react';
import { useTranslation } from 'react-i18next';

function Day(props) {
    const { t } = useTranslation();
    const day = new Date();
	const whatDay = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	const dayName = whatDay[day.getDay()];
    const month = day.toDateString().split(' ')[1];
    const offset = props.dayOffset ? props.dayOffset : 0;
    if (offset > 0) day.setDate(day.getDate() + offset);
    
    if (props.monthShow) {
        return (
            <span className={props.className}>{`${t(dayName)} ${day.getDate()} ${t(month)} `}</span>
        );
    } else {
        return (
            <span className={props.className}>{ t(whatDay[(day).getDay()])}</span>
        );
    }
}

export default Day;