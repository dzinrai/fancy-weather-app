import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DropButton(props) {
	return (
	<div className={props.className}>
		<select id="langs" name="langs" className='switch_select'>
			<option value="EN">EN</option>
			<option value="RU">RU</option>
			<option value="BY">BY</option>
			
		</select> 
		<FontAwesomeIcon icon='caret-down' className={props.iconClass}/>
	</div>
	);
}

export default DropButton;