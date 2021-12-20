export function getAirPollutionData(lat, lon, key) {
    return fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`)
        .then(data => data.json());
}