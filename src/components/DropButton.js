import React from 'react';

function DropButton(props) {
	return (
	<select id="langs" name="langs" className={props.classes}>
		<option value="EN">EN</option>
		<option value="RU">RU</option>
		<option value="BY">BY</option>
	</select> 
	);
}

export default DropButton;