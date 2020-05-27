import React, { useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';

function Search(props) {
	const [search, setSearch] = useState('');
	function handleSubmit(event) {
		event.preventDefault();
		const searchCity = search;
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
				<Button text={props.btnText} type='submit' value='Submit' />
			</form>
		</div>
	);

}

export default Search;