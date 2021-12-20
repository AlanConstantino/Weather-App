import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import {
    convertUnixTimeStamp,
    convertMilitaryTimeToRegularTime
} from '../services/timeConverter';

const localization = {
    'EN': {
        title: "8 Day Forecast",
        min: "Min",
        max: "Max",
        humidity: "Humidity",
        uvIndex: "UV Index",
        windSpeed: "Wind Speed",
        sunrise: "Sunrise",
        sunset: "Sunset",
        snow: "Snow Volume",
        rain: "Rain Volume",
    },
    'ES': {
        title: "Previsión de 8 días",
        min: "Mínimo",
        max: "Máximo",
        humidity: "Humedad",
        uvIndex: "Índice ultravioleta",
        windSpeed: "Velocidad del viento",
        sunrise: "Amanecer",
        sunset: "Atardecer",
        snow: "Volumen de nieve",
        rain: "Volumen de lluvia",
    },
    'FR': {
        title: "Prévisions sur 8 jours",
        min: "Minimum",
        max: "Maximum",
        humidity: "Humedad",
        uvIndex: "Indice ultraviolet",
        windSpeed: "Vitesse du vent",
        sunrise: "Lever du soleil",
        sunset: "Le coucher du soleil",
        snow: "Volume de neige",
        rain: "Volume de pluie",
    },
    'RU': {
        title: "Прогноз на 8 дней",
        min: "Минимум",
        max: "Максимум",
        humidity: "Влажность",
        uvIndex: "Ультрафиолетовый индекс",
        windSpeed: "Скорость ветра",
        sunrise: "Восход солнца",
        sunset: "Закат",
        snow: "Объем снега",
        rain: "Объем дождя",
    },
    'IT': {
        title: "Previsione a 8 giorni",
        min: "Minimo",
        max: "Massimo",
        humidity: "Umidità",
        uvIndex: "Indice ultravioletto",
        windSpeed: "Velocità del vento",
        sunrise: "Alba",
        sunset: "Tramonto",
        snow: "Volume di neve",
        rain: "Volume pioggia",
    },
    'JA': {
        title: "8日間の天気予報",
        min: "最小",
        max: "最大",
        humidity: "湿度",
        uvIndex: "紫外線指数",
        windSpeed: "風速",
        sunrise: "日の出",
        sunset: "日没",
        snow: "積雪量",
        rain: "雨量",    
    },
    'KR': {
        title: "8일 예측",
        min: "최저한의",
        max: "최고",
        humidity: "습기",
        uvIndex: "자외선 지수",
        windSpeed: "풍속",
        sunrise: "해돋이",
        sunset: "일몰",
        snow: "적설량",
        rain: "강우량",    
    },
};

export default function Forecast({lang = 'EN', weatherData, tempScale, speedScale}) {
    const iconImage = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

    return (
        <>
            <Typography align='center' variant='h6' >{localization[lang].title}</Typography>
            {weatherData.daily.map((day, i) => {
                return (
                    <Accordion key={i}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='subtitle1' sx={{fontWeight: '500'}}>
                                {convertUnixTimeStamp(day.dt)[1].toDateString()}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <img
                                src={iconImage(day.weather[0].icon)}
                                alt='Weather Icon'
                                align='right'
                            />
                            <Typography variant='h6'>
                                {day.weather[0].main}
                            </Typography>
                            <Typography variant='body1' gutterBottom>
                                ({day.weather[0].description})
                            </Typography>
                            <Typography variant='body1'>
                                {localization[lang].min} {day.temp.min} {tempScale}
                            </Typography>
                            <Typography variant='body1'>
                                {localization[lang].max} {day.temp.max} {tempScale}
                            </Typography>
                            {day.rain ?
                                <Typography variant='body1'>
                                    {localization[lang].rain} {day.rain} mm
                                </Typography>
                            : (null) }
                            {day.snow ?
                                <Typography variant='body1'>
                                    {localization[lang].snow} {day.snow} mm
                                </Typography>
                            : (null) }
                            <Typography variant='body1'>
                                {localization[lang].humidity} {day.humidity}%
                            </Typography>
                            <Typography variant='body1'>
                                {localization[lang].uvIndex} {day.uvi}
                            </Typography>
                            <Typography variant='body1'>
                                {localization[lang].windSpeed} {day.wind_speed} {speedScale}
                            </Typography>
                            <Typography variant='body1'>
                                {localization[lang].sunrise} {convertMilitaryTimeToRegularTime(convertUnixTimeStamp(day.sunrise)[0])}
                            </Typography>
                            <Typography variant='body1'>
                                {localization[lang].sunset} {convertMilitaryTimeToRegularTime(convertUnixTimeStamp(day.sunset)[0])}
                            </Typography>
                        </AccordionDetails>
                    </Accordion> 
                );
            })}
        </>
    );
}
