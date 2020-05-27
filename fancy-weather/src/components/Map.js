import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, NavigationControl,FullscreenControl,GeolocateControl } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWxleG1hbGtvdiIsImEiOiJja2FjaDU5bWUxZ2x6MnNtazdkMWx1MzZiIn0.T9U5tfEljgOS3bBS17wpKA';

function Map(props) {
	const width = 270;
	const height = 456;
	const animate = props.animate ? 'animation_allowed' : '';
	const [viewport, setViewport] = useState({
		width: width,
		height: height,
		latitude: 53.54,
		longitude: 27.34,
		zoom: 8,
		bearing: 0,
        pitch: 0
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
	}, [update, lon, lat, updateEnd]);
	function _onMarkerDragEnd(event){
		console.log('lon',event.lngLat[0],'lat',event.lngLat[1]);
		setMarker({
			longitude: event.lngLat[0],
			latitude: event.lngLat[1]
		});
	};
	function updateControl(view) {
		setViewport(view);
	}
	function _clickHandler(e) {
		if (e.target.className === 'mapboxgl-ctrl-icon') {
			setViewport({
				...viewport, 
				width: width,
				height: height
			});
		}
	}
	const stylePref = 'mapbox://styles/mapbox/';
	const styles = ['streets-v11', 'outdoors-v11','light-v10','dark-v10','satellite-v9','satellite-streets-v11'];  
	const style = props.night ? stylePref.concat(styles[3]) : stylePref.concat(styles[1]);
	const customStyle = (props.style !== null && props.style >= 0) ? stylePref.concat(styles[props.style]) : style;
	return (
		<ReactMapGL
			{...viewport}
			mapStyle={customStyle}
			mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
			onViewportChange={(viewport) => updateControl(viewport)}
			onClick={(e) => _clickHandler(e)}
		>
			<Marker
				longitude={props.lon ? props.lon : 27}
				latitude={props.lat ? props.lat : 53}
				offsetTop={-35}
          		offsetLeft={-28}
			>
				<FontAwesomeIcon icon='map-marker-alt' className={'marker marker_user ' + animate} />
			</Marker>
			<Marker
				longitude={marker.longitude}
				latitude={marker.latitude}
				offsetTop={-35}
          		offsetLeft={-28}
				onDragEnd={_onMarkerDragEnd}
				draggable
			>
				<FontAwesomeIcon icon='map-marker-alt' className='marker' />
			</Marker>
			<div className='controls__navigation'>
				<NavigationControl onViewportChange={(viewport) => updateControl(viewport)} />
			</div>
			<div className='controls__fullscreen'>
				<FullscreenControl  />
			</div>
			<div className='controls__geolocate'>
				<GeolocateControl
					positionOptions={{enableHighAccuracy: true}}
					trackUserLocation={true}
				/>
			</div>
			
		</ReactMapGL>
	);
	
}

export default Map;