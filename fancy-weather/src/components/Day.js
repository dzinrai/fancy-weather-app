import React from 'react';
import { useTranslation } from 'react-i18next';

function Day(props) {
    const { t } = useTranslation();
    const day = new Date();
    const whatDay = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	const dayName = whatDay[day.getDay()];
    const offset = props.dayOffset ? props.dayOffset : 0;
    if (offset > 0) day.setDate(day.getDate() + offset);
    
    if (props.monthShow) {
        return (
            <span className={props.className}>{`${t(dayName)} ${day.getDate()} ${t(mlist[day.getMonth()])} `}</span>
        );
    } else {
        return (
            <span className={props.className}>{ t(whatDay[(day).getDay()])}</span>
        );
    }
}

export default Day;