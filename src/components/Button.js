import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button(props) {
	const animate = props.animate;
	const animClass = animate ? props.animClass : '';
	const iconClass = props.iconClass + ' ' + animClass;
	return (
		<button 
			className={props.className} 
			onClick={props.onClick} 
			type={props.type}
			value={props.value}
			>
			<FontAwesomeIcon 
				icon={props.icon ? props.icon : 'sync-alt'} 
				className={iconClass}
			/>
			{props.text}
		</button>
	);
	
}

export default Button;