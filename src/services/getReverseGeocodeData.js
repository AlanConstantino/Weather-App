// will return geolocation data based on query results
export function getReverseGeocodeData(lat, lon, limit, key) {
    return fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${key}`)
        .then(data => data.json());
}