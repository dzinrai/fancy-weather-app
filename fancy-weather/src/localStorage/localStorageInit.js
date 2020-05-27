function localStorageInit(item) {
	const value = localStorage.getItem(item);
	if (value) {
		return value;
	}
	if (item === 'units') return 'metric';
}

export default localStorageInit;