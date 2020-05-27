import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ErrorLog(props) {
	let error;
	const [animate, setAnimate] = useState(true);

	if (props.error) error = props.error.statusText;
	if (error === 'Not Found') error = 'Данное местоположение не найдено';
	else if (error) error = 'Что-то пошло явно не так...'; 
	const scale = () => {
		setAnimate(true);
	};
	useEffect(() => {
		setAnimate(true);
	}, [props.error]);

	if (error) {
		return (
			<div className="error__log">
				<div className={"error-span " + (animate ? 'anim' : '')} onClick={scale} onAnimationEnd={() => setAnimate(false)}>
					<span>{error}</span>
					<FontAwesomeIcon icon='times' onClick={props.clearErrors} className='close__btn' />
				</div>
			</div>
		);
	} else {
		return null;
	}

}

export default ErrorLog;