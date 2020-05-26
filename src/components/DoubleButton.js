import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';

function DoubleButton(props) {
	const units = props.units;
	localStorage.setItem('units', props.units ? props.units : 'metric');

	return (
		<div className='double-btn__container'>
			<Button 
				className={'foren__switch ' + (units === 'imperial' ? 'active' : '')}
				text='°F' 
				/*icon={units === 'imperial' ? '' : ''}*/
				onClick={props.onClick[0]} />
			<Button 
				className={'celci__switch ' + (units === 'metric' ? 'active' : '')}
				text='°C' 
				/*icon={units === 'metric' ? '' : ''}*/
				onClick={props.onClick[1]} />
		</div>
	);
}

export default DoubleButton;