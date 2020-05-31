import React, { useState, useEffect } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import { useTranslation } from 'react-i18next';

function Search(props) {
	const { t } = useTranslation();
	const [search, setSearch] = useState('');
	const startListening = props.startListening;
	const stopListening = props.stopListening;
	const listening = props.listening;
	const supported = props.supported;
	useEffect(() => {
		if (props.search) setSearch(props.search);
	},[props.search]);
	const handleSubmit = (event) => {
		console.log(search, listening);
		if (event) event.preventDefault();
		if (!search) return;
		const searchCity = search;
		props.startSearch(searchCity);
	};

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