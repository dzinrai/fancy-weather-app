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
		latitude: 53.54,
		longitude: 27.34,
		zoom: 8,
		bearing: 0,
		pitch: 0,
	});
	const update = props.mapUpdated.update;
	const updateEnd = props.updateEnd;
	const lon = props.mapUpdated.lon;
	const lat = props.mapUpdated.lat;
	function updateControl(view) {
		setViewport(view);
	}
	const _onViewportChange = viewport => setViewport({...viewport});

	const _goToViewport = ({longitude, latitude}) => {
		_onViewportChange({
			longitude,
			latitude,
			zoom: 8,
			transitionInterpolator: new FlyToInterpolator({speed: 2}),
			transitionDuration: 'auto'
		});
	};
	useEffect(() => {	
		if (update) {
			_goToViewport({longitude: lon, latitude: lat });
			updateEnd();
		}
		// eslint-disable-next-line
	}, [update]);
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
				transitionInterpolator={new FlyToInterpolator({speed: 1.2})}
				transitionDuration='auto'
			>
				<div className={'marker__container ' + animate}>
					<FontAwesomeIcon icon='map-marker-alt' className={'markerBack'} />
					<FontAwesomeIcon icon='map-marker-alt' className={'markerBack2'} />
					<FontAwesomeIcon icon='map-marker-alt' className={'marker marker_user'} />		
				</div>		
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