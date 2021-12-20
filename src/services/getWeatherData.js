// will return weather data based on passed in latitude and longitude
export function getWeatherData(lat, lon, units = 'imperial', lang = 'en', key, exclude = 'minutely,hourly') {
  return fetch(`https://api.openweathermap.org/data/2.5/onecall?&lat=${lat}&lon=${lon}&units=${units}&lang=${lang.toLowerCase()}&appid=${key}&exclude=${exclude}`)
    .then(data => data.json());
}