import React, { useState, useEffect } from 'react';

function Menu(props) {
	const opened = props.opened;

	return (
		<div className={'menu ' + (opened ? 'opened' : '')}>
			{props.children}
		</div>
	);

}

export default Menu;