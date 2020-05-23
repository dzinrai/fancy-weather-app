import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWxleG1hbGtvdiIsImEiOiJja2FjaDU5bWUxZ2x6MnNtazdkMWx1MzZiIn0.T9U5tfEljgOS3bBS17wpKA';
const style = {
	padding: '10px',
	color: '#fff',
	cursor: 'pointer',
	background: '#000000',
	borderRadius: '6px'
};

function Map(props) {
	const [viewport, setViewport] = useState({
		width: 400,
		height: 400,
		latitude: 53.54,
		longitude: 27.34,
		zoom: 8
	});
	const [marker, setMarker] = useState({
		latitude: 53.54,
		longitude: 27.34
	});
	const update = props.mapUpdated.update;
	const updateEnd = props.updateEnd;
	const lon = props.mapUpdated.lon;
	const lat = props.mapUpdated.lat;
	useEffect(() => {
		if (update) {
			setViewport((viewport) => ({
				...viewport,
				longitude: lon,
				latitude: lat,
			}));
			updateEnd();
		}
	}, [update, lon, lat]);
	function _onMarkerDragEnd(event){
		setMarker({
			longitude: event.lngLat[0],
			latitude: event.lngLat[1]
		});
	};
	function updateControl(view) {
		setViewport(view);
	}
	return (
		<ReactMapGL
			{...viewport}
			mapStyle="mapbox://styles/mapbox/light-v9"
			mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
			onViewportChange={(viewport) => updateControl(viewport)}
		>
			<Marker
				longitude={props.lon ? props.lon : 27}
				latitude={props.lat ? props.lat : 53}
			>
				<div style={style}>You</div>
			</Marker>
			<Marker
				longitude={marker.longitude}
				latitude={marker.latitude}
				onDragEnd={_onMarkerDragEnd}
				draggable
			>
				<div style={style}>Here</div>
			</Marker>
			<div className="nav">
				<NavigationControl />
			</div>
		</ReactMapGL>
	);
	
}

export default Map;