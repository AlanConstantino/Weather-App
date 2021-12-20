// converts a unix time stamp a readable data and time
// returns an array of formatted military (24 hr) time and a formatted date
export function convertUnixTimeStamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

    return [formattedTime, date];
}

// converts military 24 hour time to regular 12 hour time
// time parameter has to be in '00:00:00' format
export function convertMilitaryTimeToRegularTime(time) {
    const [hours, minutes, seconds] = time.split(':');
    const convertedTime = (hours > 12) ? 
        `${hours - 12}:${minutes} PM` : 
        `${hours}:${minutes} AM`;
        // `${hours - 12}:${minutes}:${seconds} PM` : 
        // `${hours}:${minutes}:${seconds} AM`;

    return convertedTime;
}