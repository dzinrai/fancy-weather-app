import React, { useState, Children, useEffect } from 'react';
import { useSpeechRecognition } from "react-speech-kit";
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import { useTranslation } from 'react-i18next';

function Search(props) {
	const { t } = useTranslation();
	const [search, setSearch] = useState('');
	const { listen, listening, stop, supported } = useSpeechRecognition({
		onResult: result => {
			setSearch(result);
		},
		onEnd: () => {
			handleSubmit();
		}
	});
	useEffect(() => {
		stop();
	},[search]);
	console.log(supported);
	const startListening = (event) => {
		if (!supported && props.errorHandler) props.errorHandler({statusText: "Browser doesn't support voice enter"});
		if (!supported) return null;
		console.log('start', event);
		if (event) event.preventDefault();
		if (!listening) listen({interimResults: false});
		else stop();
	};
	const stopListening = (event) => {
		if (!supported) return null;
		stop();
		if (event) event.preventDefault();
		console.log('stop');
	};
	function handleSubmit(event, res) {
		console.log(res,search, listening);
		if (event) event.preventDefault();
		if (!res && !search) return;
		const searchCity = !res ? search : res;
		props.startSearch(searchCity);
	}
	return (
		<div className='search__container'>
			<form onSubmit={handleSubmit} className='search__form'>
				<input 
					className={(props.error ? 'wrong__input' : '')} 
					placeholder={props.text}
					onChange={(e) => setSearch(e.target.value)}
					value={search}
				/>
				<span 
					className='mic' 
					onClick={!listening ? startListening : stopListening} 
					data-for='voice-search'
					data-tip
					type='btn'
				>
					<FontAwesomeIcon icon={supported ? 'microphone' : 'microphone-slash'} className={listening ? 'active' : ''} />
				</span>
				<Button text={props.btnText} type='submit' value='Submit' />
			</form>
			<ReactTooltip id={'voice-search'} type='error' className='tooltip1'>
				<span>{supported ? t('Voice search') : t('Browser doesn\'t support voice enter')}</span>
				
			</ReactTooltip>
		</div>
	);

}

export default Search;