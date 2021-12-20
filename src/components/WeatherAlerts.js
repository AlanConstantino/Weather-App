import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AlertTitle from '@mui/material/AlertTitle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CloseIcon from '@mui/icons-material/Close';
import {
    convertUnixTimeStamp,
    convertMilitaryTimeToRegularTime
} from '../services/timeConverter';

export default function WeatherAlerts({alerts}) {
    const [alertStates, setAlertStates] = React.useState(
        alerts.map(() => true)
    );

    const handleAlertClose = (i) => {
        const copy = [...alertStates];
        copy[i] = false;
        setAlertStates(copy);
    };

    // will get passed in an array of alerts, if the length of array
    // is 0, then that means there are no alerts in the area to display
    // so you just return an empty component
    if (alerts.length === 0) {
        return (null);
    }

    return (
        <Stack sx={{marginBottom: '1rem'}}>
                {alerts.map((alert, i) => {
                    return (
                        <Collapse key={i} in={alertStates[i]} sx={{marginBottom: '1rem'}}>
                            <Accordion 
                                sx={{background: '#FFF4E5'}}
                                component={Alert}
                                align='left'
                                severity='warning'
                                action={
                                    <IconButton
                                        size='small'
                                        onClick={() => {handleAlertClose(i)}}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                <AccordionSummary
                                    component={AlertTitle}
                                    sx={{marginBottom: '-0.8rem', marginTop: '-0.8rem'}}
                                >
                                    {alert.event}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant='body2' sx={{fontWeight: '500'}}>
                                       {alert.sender_name}
                                    </Typography>
                                    <Typography variant='body2'>
                                        From <span style={{fontWeight: 500}}>{convertMilitaryTimeToRegularTime(convertUnixTimeStamp(alert.start)[0])} </span>
                                        To <span style={{fontWeight: 500}}>{convertMilitaryTimeToRegularTime(convertUnixTimeStamp(alert.end)[0])}</span>
                                    </Typography>
                                    <Typography variant='body2' sx={{marginTop: '1rem'}}>{alert.description}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Collapse>
                    );
                })}
        </Stack>  
    );
}
