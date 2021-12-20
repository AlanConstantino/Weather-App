import * as React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';

const localization = {
    "EN": {
        error: "Error! Enable location data and refresh the page to use your current location.",
    },
    "ES": {
        error: "¡Error! Habilite los datos de ubicación y actualice la página para usar su ubicación actual.",
    },
    "FR": {
        error: "Erreur! Activez les données de localisation et actualisez la page pour utiliser votre position actuelle.",
    },
    "RU": {
        error: "Ошибка! Включите данные о местоположении и обновите страницу, чтобы использовать ваше текущее местоположение.",
    },
    "IT": {
        error: "Errore! Abilita i dati sulla posizione e aggiorna la pagina per utilizzare la tua posizione attuale.",
    },
    "JA": {
        error: "エラー！位置データを有効にし、現在の位置を使用するようにページを更新します。",
    },
    "KR": {
        error: "오류! 현재 위치를 사용하려면 위치 데이터를 활성화하고 페이지를 새로고침하세요.",
    },
};

export default function LocationErrorAlert({lang}) {
    const [open, setOpen] = React.useState(true);

    return (
        <>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => setOpen(false)}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    severity="error"
                    sx={{marginBottom: '1rem'}}
                >
                    <AlertTitle>{localization[lang].error}</AlertTitle>
                </Alert>
            </Collapse>
        </>
    );
}
