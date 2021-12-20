import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const localization = {
    'EN': {
        airQuality: "Air Quality",
        airData: "Air Data",
        aqi: "Air Quality Index",
        aqiTooltip: "Air Quality Index (1=Good, 2=Fair, 3=Moderate, 4=Poor, 5=Very Poor)",
        co: "Carbon Monoxide",
        no: "Nitrogen Monoxide",
        no2: "Nitrogen Dioxide",
        o3: "Ozone",
        so2: "Sulphur Dioxide",
        pm2_5: "Fine Particle Matter",
        pm10: "Coarse Particulate Matter",
        nh3: "Ammonia",
    },
    'ES': {
        airQuality: "Calidad Del Aire",
        airData: "Datos De Aire",
        aqi: "Índice de calidad del aire",
        aqiTooltip: "Índice de calidad del aire (1 = Bueno, 2 = Regular, 3 = Moderado, 4 = Deficiente, 5 = Muy deficiente)",
        co: "Monóxido de carbono",
        no: "Monóxido de nitrógeno",
        no2: "Dioxido de nitrogeno",
        o3: "Ozono",
        so2: "Dióxido de azufre",
        pm2_5: "Materia de partículas finas",
        pm10: "Materia particulada gruesa",
        nh3: "Amoníaco",
    },
    'FR': {
        airQuality: "Qualité de l'air",
        airData: "Données aériennes",
        aqi: "Indice de qualité de l'air",
        aqiTooltip: "Indice de qualité de l'air (1=Bon, 2=Passable, 3=Modéré, 4=Mauvais, 5=Très mauvais)",
        co: "Monoxyde de carbone",
        no: "Monoxyde d'azote",
        no2: "Dioxyde d'azote",
        o3: "Ozone",
        so2: "Le dioxyde de soufre",
        pm2_5: "Particules fines",
        pm10: "Particules grossières",
        nh3: "Ammoniac",
    },
    'RU': {
        airQuality: "Качество воздуха",
        airData: "Воздушные данные",
        aqi: "Индекс качества воздуха",
        aqiTooltip: "Индекс качества воздуха (1 = хорошее, 2 = удовлетворительное, 3 = умеренное, 4 = плохое, 5 = очень плохое)",
        co: "Монооксид углерода",
        no: "Окись азота",
        no2: "Диоксид азота",
        o3: "Озон",
        so2: "Диоксид серы",
        pm2_5: "Мелкодисперсное вещество",
        pm10: "Крупные твердые частицы",
        nh3: "Аммиак",
    },
    'IT': {
        airQuality: "Qualità dell'aria",
        airData: "Dati dell'aria",
        aqi: "Indice di qualità dell'aria",
        aqiTooltip: "Indice di qualità dell'aria (1=buono, 2=discreto, 3=moderato, 4=scarso, 5=molto scarso)",
        co: "Monossido di carbonio",
        no: "Monossido di azoto",
        no2: "Diossido di azoto",
        o3: "Ozono",
        so2: "Diossido di zolfo",
        pm2_5: "Particelle fini",
        pm10: "Particolato grossolano",
        nh3: "Ammoniaca",
    },
    'JA': {
        airQuality: "空気の質",
        airData: "大気データ",
        aqi: "空気質指数",
        aqiTooltip: "空気質指数（1 =良い、2 =普通、3 =中程度、4 =悪い、5 =非常に悪い）",
        co: "一酸化炭素",
        no: "一酸化窒素",
        no2: "二酸化窒素",
        o3: "オゾン",
        so2: "二酸化硫黄",
        pm2_5: "微粒子状物質",
        pm10: "粗い粒子状物質",
        nh3: "アンモニア",
    },
    'KR': {
        airQuality: "대기질",
        airData: "항공 데이터",
        aqi: "대기질 지수",
        aqiTooltip: "대기 질 지수(1=좋음, 2=보통, 3=보통, 4=나쁨, 5=매우 나쁨)",
        co: "일산화탄소",
        no: "일산화질소",
        no2: "이산화질소",
        o3: "오존",
        so2: "이산화황",
        pm2_5: "미세 입자 물질",
        pm10: "거친 입자상 물질",
        nh3: "암모니아",
    },
};

export default function AirQuality({lang = 'EN', airPollutionData}) {
    return (
        <div>
            <Typography align='center' variant='h6' >{localization[lang].airQuality}</Typography>
            <Accordion align='left'>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {localization[lang].airData}
                </AccordionSummary>
                <AccordionDetails>
                    <Tooltip
                        title={localization[lang].aqiTooltip}
                        placement='left'
                    >
                        <Typography variant='body1'>
                            <span style={{fontWeight: 'bold'}}>{localization[lang].aqi}: </span>{airPollutionData.main.aqi}
                        </Typography>
                    </Tooltip>
                    <Tooltip title={localization[lang].co} placement='left'>
                        <Typography variant='body1'>
                            <span style={{fontWeight: 'bold'}}>CO</span> {airPollutionData.components.co} μg/m3
                        </Typography>
                    </Tooltip>
                    <Tooltip title={localization[lang].no} placement='left'>
                        <Typography variant='body1'>
                            <span style={{fontWeight: 'bold'}}>NO</span> {airPollutionData.components.no} μg/m3
                        </Typography>
                    </Tooltip>
                    <Tooltip title={localization[lang].no2} placement='left'>
                        <Typography variant='body1'>
                            <span style={{fontWeight: 'bold'}}>NO2</span> {airPollutionData.components.no2} μg/m3
                        </Typography>
                    </Tooltip>
                    <Tooltip title={localization[lang].o3} placement='left'>
                        <Typography variant='body1'>
                            <span style={{fontWeight: 'bold'}}>O3</span> {airPollutionData.components.o3} μg/m3
                        </Typography>
                    </Tooltip>
                    <Tooltip title={localization[lang].so2} placement='left'>
                        <Typography variant='body1'>
                            <span style={{fontWeight: 'bold'}}>SO2</span> {airPollutionData.components.so2} μg/m3
                        </Typography>
                    </Tooltip>
                    <Tooltip title={localization[lang].pm2_5} placement='left'>
                        <Typography variant='body1'>
                            <span style={{fontWeight: 'bold'}}>PM2.5</span> {airPollutionData.components.pm2_5} μg/m3
                        </Typography>
                    </Tooltip>
                    <Tooltip title={localization[lang].pm10} placement='left'>
                        <Typography variant='body1'>
                            <span style={{fontWeight: 'bold'}}>PM10</span> {airPollutionData.components.pm10} μg/m3
                        </Typography>
                    </Tooltip>
                    <Tooltip title={localization[lang].nh3} placement='left'>
                        <Typography variant='body1'>
                            <span style={{fontWeight: 'bold'}}>NH3</span> {airPollutionData.components.nh3} μg/m3
                        </Typography>
                    </Tooltip>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
