import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

function ErrorLog(props) {
	const { t } = useTranslation();
	let error;
	const [animate, setAnimate] = useState(true);

	if (props.error) error = props.error.statusText;
	if (error === 'Not Found') error = t('Unknown location');
	else if (error === "Browser doesn't support voice enter") error = t("Browser doesn't support voice enter");
	else if (error === "Forbidden") error = t('Background change is not yet available'); 
	else if (error) error = t('Something went wrong'); 
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