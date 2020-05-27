import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DropButton(props) { 
	const [value, setValue] = useState(localStorage.getItem('i18nextLng') ? localStorage.getItem('i18nextLng') : 'en');
	function handleChange(event) {
		props.langChanger(event.target.value);
		setValue(event.target.value);
	}
	return (
	<div className={props.className}>
		<select 
			id="langs" 
			name="langs" 
			className='switch_select' 
			value={value}
			onChange={handleChange}>
			<option value="en">EN</option>
			<option value="ru">RU</option>
			<option value="by">BY</option>
		</select> 
		<FontAwesomeIcon icon='caret-down' className={props.iconClass}/>
	</div>
	);
}

export default DropButton;