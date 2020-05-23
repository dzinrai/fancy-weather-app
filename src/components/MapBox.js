import React from 'react';
import Map from './Map';

function MapBox(props) {
	const lat = parseFloat(props.lat);
	const lon = parseFloat(props.lon);
	let map;
	if (lat && lon) map = <Map lon={lon} lat={lat} />;
		
	return (
		<div className='mapbox__container'>
			<div className='map'>
				{map ? map : 'Loading...'}	
			</div>
			<span>Latitude: {lat.toFixed(2)}</span><br />
			<span>Longitude: {lon.toFixed(2)}</span>
		</div>
	);
	
}

export default MapBox;