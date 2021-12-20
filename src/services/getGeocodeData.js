// will return geolocation data based on query results
export function getGeocodeData(query = '', limit = 1, key) {
    return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${key}`)
        .then(data => data.json());
}