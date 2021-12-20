import './App.css';
import {useEffect, useState} from 'react';
import {getWeatherData} from './services/getWeatherData';
import {getGeocodeData} from './services/getGeocodeData';
import {getAirPollutionData} from './services/getAirPollutionData';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import WeatherCard from './components/WeatherCard';
import WeatherAlerts from './components/WeatherAlerts';
import MapWidget from './components/MapWidget';
import Container from '@mui/material/Container';
import {sanitizeQuery} from './services/sanitizeQuery';
import {getReverseGeocodeData} from './services/getReverseGeocodeData';
import LocationErrorAlert from './components/LocationErrorAlert';

require('dotenv').config();

const localization = {
  'EN': {
    "Imperial": "imperial",
    "Metric": "metric",
    "Standard": "standard",
  },
  'ES': {
    "Imperial": "imperial",
    "Métrico": "metric",
    "Estándar": "standard",
  },
  'FR': {
    "Impérial": "imperial",
    "Métrique": "metric",
    "Standard": "standard",
  },
  'RU': {
    "Императорский": "imperial",
    "Метрическая": "metric",
    "Стандарт": "standard",
  },
  'IT': {
    "Imperiale": "imperial",
    "Metrica": "metric",
    "Standard": "standard",
  },
  'JA': {
    "インペリアル": "imperial",
    "メトリック": "metric",
    '標準': "standard",
  },
  'KR': {
    "장엄한": "imperial",
    "미터법": "metric",
    "기준": "standard",
  },
};

function App() {
  // for navbar dropdowns
  const [language, setLanguage] = useState('EN');
  const [units, setUnits] = useState('imperial'); // measurement units

  // for navbar searchbar
  const [query, setQuery] = useState('');
  const [queryNow, setQueryNow] = useState(false);

  // localized name of location
  const [locationName, setLocationName] = useState('');

  // for language localization
  const [geoCodeData, setGeoCodeData] = useState(null);
  // determines if there is an error getting user location or not
  const [userLocationError, setUserLocationError] = useState(false);

  // default location is CSUN
  const [latLon, setLatLon] = useState({
    lat: 34.24106361025065,
    lon: -118.52767937749145
  });
  const [weatherData, setWeatherData] = useState(null);
  const [airPollutionData, setAirPollutionData] = useState(null);

  // gathers weather data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getWeatherData(
        latLon.lat, 
        latLon.lon,
        localization[language][units],
        language, process.env.REACT_APP_WEATHER_KEY
      ).then((response) => {
          if (response) {
            setWeatherData(response);
          }
        });
    }

    return () => mounted = false;
  }, [language, units, latLon]);

  // gathers air pollution data
  useEffect(() => {
    let mounted = true;

    if (mounted && latLon) {
      getAirPollutionData(
        latLon.lat,
        latLon.lon,
        process.env.REACT_APP_WEATHER_KEY
      ).then((response) => {
          if (response.list.length !== 0) {
            setAirPollutionData(response.list[0]);
          }
        });
    }

    return () => mounted = false;
  }, [latLon]);

  // gathers coordinates based on query search
  useEffect(() => {
    let mounted = true;

    if (mounted && queryNow) {
      // will have to sanitize query here
      const sanitizedQuery = sanitizeQuery(query);

      getGeocodeData(sanitizedQuery, 1, process.env.REACT_APP_WEATHER_KEY)
      .then((response) => {
          const data = response[0];
          if (data && data.local_names) {
            setLocationName(data.local_names[language.toLowerCase()] || data.name);
          } else {
            setLocationName(data.name);
          }

          if (data) {
            setGeoCodeData(data); // for language support
            setLatLon({lat: data.lat, lon: data.lon});
          }

          // if this is removed, you will make infinite API calls
          // DON'T REMOVE THIS LINE
          setQueryNow(false);
        });
    }

    return () => mounted = false;
  }, [queryNow, units]);
  
  // gathers localized names for places based on coordinates
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getReverseGeocodeData(
        latLon.lat,
        latLon.lon,
        5,
        process.env.REACT_APP_WEATHER_KEY
      ).then((response) => {
          const {
            name,
            local_names: localizedNames,
          } = response[0];

          if (localizedNames && localizedNames[language.toLowerCase()]) {
            setLocationName(localizedNames[language.toLowerCase()]);
          } else {
            setLocationName(name);
          }
        });
    }

    return () => mounted = true;
  }, [language, latLon]);

  return (
    <div className="App">
      <Navbar
        lang={language}
        units={units}
        setLanguage={setLanguage}
        setUnits={setUnits}
        setQuery={setQuery}
        setQueryNow={setQueryNow}
        setLatLon={setLatLon}
        setUserLocationError={setUserLocationError}
      />
      {!weatherData ?
        <CircularProgress sx={{marginTop: 10}} />
      :
        <Container maxWidth="lg">
          <Box sx={{margin: '2rem 0'}}>
              {userLocationError ? <LocationErrorAlert lang={language}/> : (null)}
              {weatherData.alerts ? <WeatherAlerts alerts={weatherData.alerts} /> : (null) }
              <Box sx={{display: 'flex', justifyContent: 'center', gap: '2rem'}}>
                {weatherData && airPollutionData ?
                  <WeatherCard
                    lang={language}
                    locationName={locationName}
                    geoCodeData={geoCodeData}
                    weatherData={weatherData}
                    airPollutionData={airPollutionData}
                    units={units}
                  />
                : (null)}
                <MapWidget
                  lat={latLon.lat}
                  lon={latLon.lon}
                />
              </Box>
              <div style={{display: 'flex', flex: 1}}>
              </div>
          </Box>
        </Container>
      }
    </div>
  );
}

export default App;
