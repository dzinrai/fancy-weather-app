import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

function Button(props) {
	const [animation, setAnimation] = useState('');
	const animClass = props.animClass;

	useEffect(() => {
		if (props.animate) setAnimation(animClass);
		else setAnimation('');
	}, [props.animate]);

	return (
		<button 
			className={props.className} 
			onClick={props.onClick} 
			type={props.type}
			value={props.value}
			>
			{props.icon && <FontAwesomeIcon 
				icon={props.icon} 
				className={props.iconClass + ' ' + animation}
			/>}
			{props.text}
			{props.tooltip && <span data-tip data-for={props.tooltip.id} className='tooltip__target-box'></span>}
			{props.tooltip && <ReactTooltip id={props.tooltip.id} type='error' className='tooltip1'>
				<span>{props.tooltip.text}</span>
			</ReactTooltip>}
		</button>
	);
	
}

export default Button;