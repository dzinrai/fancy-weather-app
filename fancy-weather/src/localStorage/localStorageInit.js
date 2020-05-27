function boolconvert(item) {
	if (item === 'false') return false;
	if (item === 'true') return true;
	return item;
}
function localStorageInit() {
	let units = localStorage.getItem('units');
	let night = localStorage.getItem('night');
	let animationOn = localStorage.getItem('animationOn');
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
	const res = { units, night, animationOn };
	[...Object.keys(res)].forEach((key) => {
		res[key] = boolconvert(res[key]);
	});
	console.log(res);
	return res;
}

const settings = localStorageInit();

export default settings;