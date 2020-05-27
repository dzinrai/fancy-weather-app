import React, { useState, useEffect } from 'react';

function Clock(props) {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const timerID = setInterval( () => tick(), 1000 );
		return function cleanup() {
			clearInterval(timerID);
		};
	}, []);
	function tick() {
		setDate(new Date());
	}

	return (
		<span>
			{date.toLocaleTimeString(props.countryTag ? props.countryTag : 'BY', {
				timeZone: props.timezone ? props.timezone : "Europe/Minsk"
			}).split(' ').slice(0,-1).join('')}
		</span>
	);

}

export default Clock;