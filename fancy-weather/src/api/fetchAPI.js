async function fetchAPI(url, nolog=false) {
	try {
		const response = await fetch(url);
		if (!response.ok) return response;
		let data = await response.json();
		return data;
	} catch (e) {
		return null;
	}
}

export default fetchAPI;