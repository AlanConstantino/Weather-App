import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { usePosition } from '../hooks/usePosition';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const localization = {
  'EN': {
    search: "Search",
    searchToolTip: "City Name, State, Country (for US only, for all other countries ignore State parameter)",
    useCurrentLocation: "Use Current Location",
    imperial: "Imperial",
    metric: "Metric",
    standard: "Standard",
    language: "Language",
    units: "Units",
    unitSystem: "Unit System",
  },
  'ES': {
    search: "Búsqueda",
    searchToolTip: "Nombre de la ciudad, estado, país (solo para EE. UU., Para todos los demás países ignore el parámetro de estado)",
    useCurrentLocation: "Usar ubicación actual",
    imperial: "Imperial",
    metric: "Métrico",
    standard: "Estándar",
    language: "Idioma",
    units: "Unidades",
    unitSystem: "Unidad de sistema"
  },
  'FR': {
    search: "Chercher",
    searchToolTip: "Nom de la ville, État, Pays (pour les États-Unis uniquement, pour tous les autres pays, ignorez le paramètre État)",
    useCurrentLocation: "Utiliser l'emplacement actuel",
    imperial: "Impérial",
    metric: "Métrique",
    standard: "Standard",
    language: "Langue",
    units: "Unités",
    unitSystem: "Système d'unité"
  },
  'RU': {
    search: "Поиск",
    searchToolTip: "Название города, штат, страна (только для США, для всех остальных стран параметр State игнорируется)",
    useCurrentLocation: "Использовать текущее местоположение",
    imperial: "Императорский",
    metric: "Метрическая",
    standard: "Стандарт",
    language: "Язык",
    units: "Единицы",
    unitSystem: "Система единиц"
  },
  'IT': {
    search: "Ricerca",
    searchToolTip: "Nome città, Stato, Paese (solo per gli Stati Uniti, per tutti gli altri paesi ignorare il parametro Stato)",
    useCurrentLocation: "Usa la posizione attuale",
    imperial: "Imperiale",
    metric: "Metrica",
    standard: "Standard",
    language: "Lingua",
    units: "Unità",
    unitSystem: "Sistema di unità"
  },
  'JA': {
    search: "検索",
    searchToolTip: "都市名、州、国（米国のみ、他のすべての国では州のパラメーターを無視します）",
    useCurrentLocation: "現在地を使用",
    imperial: "インペリアル",
    metric: "メトリック",
    standard: "標準",
    language: "言語",
    units: "単位",
    unitSystem: "単位系"
  },
  'KR': {
    search: "찾다",
    searchToolTip: "도시 이름, 주, 국가(미국만 해당, 다른 모든 국가의 경우 주 매개변수 무시)",
    useCurrentLocation: "현재 위치 사용",
    imperial: "장엄한",
    metric: "미터법",
    standard: "기준",
    language: "언어",
    units: "단위",
    unitSystem: "단위계"
  },
};

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

export default function Navbar({lang = 'EN', setLanguage, setQuery, setQueryNow, setUnits, setUserLocationError, setLatLon}) {
  const userLocation = usePosition();

  const languageKey = {
    1: 'EN', // english
    2: 'ES', // spanish
    3: 'FR', // french
    4: 'RU', // russian
    5: 'IT', // italian
    6: 'JA', // japanese
    7: 'KR', // korean
  };

  const unitKey = {
    1: 'standard',
    2: 'metric',
    3: 'imperial',
  };

  const [search, setSearch] = React.useState('');
  
  // unit dropdown menu states
  const [unitEl, setUnitEl] = React.useState(null);
  const unitOpen = Boolean(unitEl);

  // language dropdown menu states
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // search event handlers
  const handleSearchChange = (event) => setSearch(event.target.value);
  const handleSearch = (event) => {
    setQuery(search);
    setQueryNow(true);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setQuery(search);
      setQueryNow(true);
    }
  };
  
  // language dropdown event handlers
  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLanguageClose = (event) => {
    const languageNumber = event.currentTarget.value || 0;

    // so long as there is a valid key (i.e. languageNumber), update the language
    if (languageNumber) {
      setLanguage(languageKey[languageNumber]);
    }

    setAnchorEl(null);
  };

  // units dropdown event handlers
  const handleUnitClick = (event) => {
    setUnitEl(event.currentTarget);
  };
  const handleUnitClose = (event) => {
    const unitNumber = event.currentTarget.value || 0;

    // so long as a valid key (i.e. unitNumber) exists, update the units
    if (unitNumber) {
      const unitType = unitKey[unitNumber];
      setUnits(localization[lang][unitType]);
    }

    setUnitEl(null);
  };

  // whenever the user clicks on the current location icon
  // lat and lon will be updated
  const handleLocationClick = (event) => {
    if (userLocation.error) {
      setUserLocationError(true);
    } else {
      setUserLocationError(false);
      setLatLon({lat: userLocation.lat, lon: userLocation.lon});
    }
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <div>
            <Tooltip title={localization[lang].searchToolTip}>
              <StyledInputBase
                edge="start"
                placeholder={localization[lang].search}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
              />
            </Tooltip>
            <Tooltip title={localization[lang].search}>
              <IconButton onClick={handleSearch}>
                <SearchIcon sx={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
          </div>

          <Tooltip title={localization[lang].useCurrentLocation}>
            <IconButton onClick={handleLocationClick} sx={{marginLeft: 'auto'}}>
                <MyLocationIcon sx={{ color: 'white' }} />
            </IconButton>
          </Tooltip>

          {/* Dropdown button for units */}
          <Tooltip title={localization[lang].unitSystem} arrow>
            <Button
              id="demo-customized-button"
              aria-controls="demo-customized-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleUnitClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {localization[lang].units}
            </Button>
          </Tooltip>

          {/* Dropdown button for languages */}
          <Tooltip title={localization[lang].language} arrow>
            <Button
              id="demo-customized-button"
              aria-controls="demo-customized-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleLanguageClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {lang}
            </Button>
          </Tooltip>

          {/* Dropdown menu for units */}
          <Menu
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorEl={unitEl}
            open={unitOpen}
            onClose={handleUnitClose}
          >
            <MenuItem value={1} onClick={handleUnitClose} disableRipple>
              {localization[lang].standard}
            </MenuItem>
            <MenuItem value={2} onClick={handleUnitClose} disableRipple>
              {localization[lang].metric}
            </MenuItem>
            <MenuItem value={3} onClick={handleUnitClose} disableRipple>
              {localization[lang].imperial}
            </MenuItem>
          </Menu>

          {/* Dropdown menu for languages */}
          <Menu
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleLanguageClose}
          >
            <MenuItem value={1} onClick={handleLanguageClose} disableRipple>
              EN
            </MenuItem>
            <MenuItem value={2} onClick={handleLanguageClose} disableRipple>
              ES
            </MenuItem>
            <MenuItem value={3} onClick={handleLanguageClose} disableRipple>
              FR
            </MenuItem>
            <MenuItem value={4} onClick={handleLanguageClose} disableRipple>
              RU
            </MenuItem>
            <MenuItem value={5} onClick={handleLanguageClose} disableRipple>
              IT
            </MenuItem>
            <MenuItem value={6} onClick={handleLanguageClose} disableRipple>
              JA
            </MenuItem>
            <MenuItem value={7} onClick={handleLanguageClose} disableRipple>
              KR
            </MenuItem>
          </Menu>
        </ Toolbar>
      </AppBar>
    </div>
  );
}
