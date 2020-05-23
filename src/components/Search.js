import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';

function Search(props) {
	const [search, setSearch] = useState('');
	function handleSubmit(event) {
		event.preventDefault();
		props.startSearch(search);
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input 
					className={props.classes} 
					placeholder={props.text}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button text={props.btnText} classes='' type='submit' value='Submit' />
			</form>
		</div>
	);

}

export default Search;