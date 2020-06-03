import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, NavigationControl,FullscreenControl,GeolocateControl,FlyToInterpolator } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWxleG1hbGtvdiIsImEiOiJja2FjaDU5bWUxZ2x6MnNtazdkMWx1MzZiIn0.T9U5tfEljgOS3bBS17wpKA';

function Map(props) {
	const width = 264;
	const height = 456;
	const animate = props.animate ? 'animation_allowed' : '';
	const [viewport, setViewport] = useState({
		width: width,
		height: height,
		latitude: 0,
		longitude: 0,
		zoom: 8,
		bearing: 0,
		pitch: 0,
	});
	const updateEnd = props.updateEnd;
	function updateViewport(view) {
		setViewport(viewport => ({
			...viewport,
			...view
		}));
	}
	const _goToViewport = ({longitude, latitude}) => {
		updateViewport({
			longitude,
			latitude,
			zoom: 8,
			transitionInterpolator: new FlyToInterpolator({speed: 2}),
			transitionDuration: 'auto'
		});
	};
	useEffect(() => {	
		const update = props.mapUpdated.update;
		const longitude = props.mapUpdated.lon;
		const latitude = props.mapUpdated.lat;
		if (update && props.lon !== viewport.longitude && props.lat !== viewport.latitude) {
			_goToViewport({longitude, latitude});
			updateEnd();
		}
		// eslint-disable-next-line
	}, [props.mapUpdated]);
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
			latitude={viewport.latitude}
  			longitude={viewport.longitude}
			mapStyle={customStyle}
			mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
			onViewportChange={(viewport) => updateViewport(viewport)}
			onClick={(e) => _clickHandler(e)}
		>
			<Marker
				longitude={props.lon ? props.lon : 27}
				latitude={props.lat ? props.lat : 53}
				offsetTop={-35}
				offsetLeft={-28}
			>
				<div className={'marker__container ' + animate}>
					<FontAwesomeIcon icon='map-marker-alt' className={'markerBack'} />
					<FontAwesomeIcon icon='map-marker-alt' className={'markerBack2'} />
					<FontAwesomeIcon icon='map-marker-alt' className={'marker marker_user'} />		
				</div>		
			</Marker>
			<div className='controls__navigation'>
				<NavigationControl onViewportChange={(viewport) => updateViewport(viewport)} />
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