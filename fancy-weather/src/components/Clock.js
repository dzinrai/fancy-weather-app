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
			{date.toLocaleTimeString(props.country, {
				timeZone: props.timezone
			}).split(' ').slice(0,-1).join('')}
		</span>
	);

}

export default Clock;