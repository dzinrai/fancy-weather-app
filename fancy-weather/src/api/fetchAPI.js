async function fetchAPI(url, nolog=false) {
	if (!nolog) console.log(url);
	const response = await fetch(url);
	if (!nolog) console.log(response);
	if (!response.ok) return response;
	let data = await response.json();
	if (!nolog) console.log(data);
	return data;
}

export default fetchAPI;