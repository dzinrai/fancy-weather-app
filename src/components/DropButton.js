import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DropButton(props) { 
	return (
	<div className={props.className}>
		<select 
			id="langs" 
			name="langs" 
			className='switch_select' 
			value={localStorage.getItem('i18nextLng') ? localStorage.getItem('i18nextLng') : 'en'}
			onChange={(event) => props.langChanger(event.target.value)}>
			<option value="en">EN</option>
			<option value="ru">RU</option>
			<option value="by">BY</option>
		</select> 
		<FontAwesomeIcon icon='caret-down' className={props.iconClass}/>
	</div>
	);
}

export default DropButton;