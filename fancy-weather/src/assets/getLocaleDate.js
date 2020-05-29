function getLocaleTime(countryTag, timezone, date) {
    const day = !date ? new Date() : date;
	const time = day.toLocaleTimeString(countryTag ? countryTag : 'BY', {
        timeZone: timezone ? timezone : "Europe/Minsk",
        hour12: false
    });
    return time;
}

export default getLocaleTime;