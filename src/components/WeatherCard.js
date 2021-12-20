import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import AirQuality from './AirQuality';
import Forecast from './Forecast';
import Weather from './Weather';

const localization = {
  'EN': {
    imperial: "Imperial",
    metric: "Metric",
    standard: "Standard",
  },
  'ES': {
    imperial: "Imperial",
    metric: "Métrico",
    standard: "Estándar",
  },
  'FR': {
    imperial: "Impérial",
    metric: "Métrique",
    standard: "Standard",
  },
  'RU': {
    imperial: "Императорский",
    metric: "Метрическая",
    standard: "Стандарт",
  },
  'IT': {
    imperial: "Imperiale",
    metric: "Metrica",
    standard: "Standard",
  },
  'JA': {
    imperial: "インペリアル",
    metric: "メトリック",
    standard: "標準",
  },
  'KR': {
    imperial: "장엄한",
    metric: "미터법",
    standard: "기준",
  },
};
  

export default function WeatherCard({weatherData, lang, airPollutionData, units, locationName}) {
    let tempScale; // K, °C, or °F
    let speedScale; // m/s or mph

    const collator = new Intl.Collator(lang.toLowerCase());

    // can't be a switch statement, has to be like this
    if (collator.compare(localization[lang].standard, units) === 0) {
      tempScale = 'K';
      speedScale = 'm/s';
    } else if (collator.compare(localization[lang].metric, units) === 0) {
      tempScale = '°C';
      speedScale = 'm/s';
    } else if (collator.compare(localization[lang].imperial, units) === 0) {
      tempScale = '°F';
      speedScale = 'mph';  
    } else {
      tempScale = '°F';
      speedScale = 'm/s';
    }

    return (
        <div>
            <Card sx={{
                minWidth: 350,
                background: 'white',
                boxShadow: '5px 10px 15px rgba(0, 0, 0, 0.3)'
            }}>
                <CardContent align='left'>
                    <Weather
                        lang={lang}
                        locationName={locationName}
                        weatherData={weatherData.current}
                        tempScale={tempScale}
                        speedScale={speedScale}
                    />
                </CardContent>
                <Divider variant='middle' />
                <CardContent>
                    <AirQuality
                        lang={lang}
                        airPollutionData={airPollutionData}
                    />
                </CardContent>
                <Divider variant='middle' />
                <CardContent align='left'>
                    <Forecast
                        lang={lang}
                        weatherData={weatherData}
                        tempScale={tempScale}
                        speedScale={speedScale}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
