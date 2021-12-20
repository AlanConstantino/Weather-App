import * as React from 'react';
import Typography from '@mui/material/Typography';
import {
    convertUnixTimeStamp,
    convertMilitaryTimeToRegularTime
} from '../services/timeConverter';

const localization = {
    'EN': {
        asOf: "As of",
        feelsLike: "Feels Like",
        humidity: "Humidity",
        uvIndex: "UV Index",
        windSpeed: "Wind Speed",
        sunrise: "Sunrise",
        sunset: "Sunset",
        snow: "Snow Volume",
        rain: "Rain Volume",
    },
    'ES': {
        asOf: "A partir de",
        feelsLike: "Se siente como",
        humidity: "Humedad",
        uvIndex: "Índice ultravioleta",
        windSpeed: "Velocidad del viento",
        sunrise: "Amanecer",
        sunset: "Atardecer",
        snow: "Volumen de nieve",
        rain: "Volumen de lluvia",
    },
    'FR': {
        asOf: "À partir de",
        feelsLike: "Se siente como",
        humidity: "Humedad",
        uvIndex: "Indice ultraviolet",
        windSpeed: "Vitesse du vent",
        sunrise: "Lever du soleil",
        sunset: "Le coucher du soleil",
        snow: "Volume de neige",
        rain: "Volume de pluie",
    },
    'RU': {
        asOf: "По состоянию на",
        feelsLike: "Как будто",
        humidity: "Влажность",
        uvIndex: "Ультрафиолетовый индекс",
        windSpeed: "Скорость ветра",
        sunrise: "Восход солнца",
        sunset: "Закат",
        snow: "Объем снега",
        rain: "Объем дождя",
    },
    'IT': {
        asOf: "Come di",
        feelsLike: "Si sente come",
        humidity: "Umidità",
        uvIndex: "Indice ultravioletto",
        windSpeed: "Velocità del vento",
        sunrise: "Alba",
        sunset: "Tramonto",
        snow: "Volume di neve",
        rain: "Volume pioggia",
    },
    'JA': {
        asOf: "現在",
        feelsLike: "のように感じている",
        humidity: "湿度",
        uvIndex: "紫外線指数",
        windSpeed: "風速",
        sunrise: "日の出",
        sunset: "日没",
        snow: "積雪量",
        rain: "雨量",    
    },
    'KR': {
        asOf: "현재",
        feelsLike: "같은 느낌",
        humidity: "습기",
        uvIndex: "자외선 지수",
        windSpeed: "풍속",
        sunrise: "해돋이",
        sunset: "일몰",
        snow: "적설량",
        rain: "강우량",    
    },
};

export default function Weather({lang = 'EN', weatherData, tempScale, speedScale, locationName}) {
    const iconImage = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;
    const {
        dt,
        temp, // kelvin, Celsius, Farenheit
        feels_like, // kelvin, Celsius, Farenheit
        humidity, // %
        uvi, // UV Index
        wind_speed, // default: metre/sec, metric: metre/sec, imperial: miles/hour
        sunrise, // unix time for sunrise
        sunset, // unix time for sunset
        weather, // array of current type of weather and its description
        rain, // object of rain volume for past hour (mm)
        snow, // object of snow volume for past hour (mm)
    } = weatherData;
    const formattedSunriseTime = convertMilitaryTimeToRegularTime(convertUnixTimeStamp(sunrise)[0]);
    const formattedSunsetTime = convertMilitaryTimeToRegularTime(convertUnixTimeStamp(sunset)[0]);
    const formattedTime = convertMilitaryTimeToRegularTime(convertUnixTimeStamp(dt)[0]);

    return (
        <>
            <img
                src={iconImage(weather[0].icon)}
                alt="Weather Icon"
                align='right'
            />
            <Typography variant='h6'>{locationName ? locationName : 'Current Location'}</Typography>
            <Typography>{localization[lang].asOf} {formattedTime}</Typography>
            <Typography variant="h4">{temp} {tempScale}</Typography>
            <Typography variant="h6">{weather[0].main}</Typography>
            <Typography variant="body1" gutterBottom>({weather[0].description})</Typography>
            <Typography>{localization[lang].feelsLike} {feels_like} {tempScale}</Typography>
            {weatherData.rain ? <Typography>{localization[lang].rain} {rain['1h']} mm</Typography> : (null)}
            {weatherData.snow ? <Typography>{localization[lang].snow} {snow['1h']} mm</Typography> : (null)}
            <Typography>{localization[lang].humidity} {humidity}%</Typography>
            <Typography>{localization[lang].uvIndex} {uvi}</Typography>
            <Typography>{localization[lang].windSpeed} {wind_speed} {speedScale}</Typography>
            <Typography>{localization[lang].sunrise} {formattedSunriseTime}</Typography>
            <Typography>{localization[lang].sunset} {formattedSunsetTime}</Typography>
        </>
    );
}
