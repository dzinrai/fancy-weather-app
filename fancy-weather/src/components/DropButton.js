import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

function DropButton(props) { 
	const { t, i18n } = useTranslation();
	const [value, setValue] = useState(props.value);
	const changer = props.changer;
	const values = props.values ? props.values : {val1: ['en','EN']};
	function handleChange(event) {
		if (changer && event.target.value !== 'DEFAULT') changer(event.target.value);
		if (!props.cities) setValue(event.target.value);
		else setValue('DEFAULT');
	}
	useEffect(() => {
		if (props.cities) setValue('DEFAULT');
		else setValue(i18n.language);
	}, [props.cities, i18n.language]);
	return (
	<div className='switch'>
		<select 
			id={props.id} 
			name="langs" 
			className='switch_select'
			value={value}
			onChange={handleChange}
		>
				{values && !props.cities && [...Object.keys(values)].map((value, i) => 
					values[value] && <option key={i} value={values[value][0]}>{values[value][1]}</option>
				)}
				{props.cities && <option key={0} value='DEFAULT'>{t('Your chosen places')}</option>}
				{values && props.cities && [...Object.keys(values)].map((value, i) => 
					values[value] && <option key={i+1} value={values[value].en}>{values[value][i18n.language]}</option>
				)}
				
		</select> 
		<FontAwesomeIcon icon={props.icon ? props.icon : 'caret-down'} className={props.iconClass}/>
	</div>
	);
}

export default DropButton;