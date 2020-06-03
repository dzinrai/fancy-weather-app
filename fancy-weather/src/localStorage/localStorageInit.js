function boolconvert(item) {
	if (item === 'false') return false;
	if (item === 'true') return true;
	return item;
}
function localStorageInit() {
	let units = localStorage.getItem('units');
	let night = localStorage.getItem('night');
	let animationOn = localStorage.getItem('animationOn');
	let i18nextLng = localStorage.getItem('i18nextLng');
	let pinned = localStorage.getItem('pinned');
	// defaults:
	if (units === null) {
		units = 'metric';
		localStorage.setItem('units', 'metric');
	}
	if (night === null) {
		night = false;
		localStorage.setItem('night', false);
	}
	if (animationOn === null) {
		animationOn = true;
		localStorage.setItem('animationOn', true);
	}
	if (i18nextLng === null || !(['en', 'by', 'ru'].includes(i18nextLng))) {
		i18nextLng = 'en';
		localStorage.setItem('i18nextLng', 'en');
	}
	if (pinned === null) {
		//val1: {en:'', ru:'', by:''}
		pinned = {
			val0: null, 
			val1: null, 
			val2: null, 
			val3: null, 
			val4: null
		};
		localStorage.setItem('pinned', JSON.stringify(pinned));
	} else {
		pinned = JSON.parse(pinned);
		console.log(pinned);
	}
	
	const res = { units, night, animationOn, i18nextLng, pinned };
	[...Object.keys(res)].forEach((key) => {
		res[key] = boolconvert(res[key]);
	});
	console.log(res);
	return res;
}

const settings = localStorageInit();

export default settings;