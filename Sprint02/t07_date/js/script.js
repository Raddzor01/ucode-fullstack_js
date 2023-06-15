function addzero(date) {
    if(String(date).length == 1) {
        return '0' + date
    }
    return date;
}

function getFormattedDate(dateObject) {
    var days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    return addzero(dateObject.getDate()) + '.' + addzero(dateObject.getMonth() + 1) + '.' + addzero(dateObject.getFullYear())
    + ' ' + addzero(dateObject.getHours()) + ':' + addzero(dateObject.getMinutes()) + ' ' + days[dateObject.getDay()];
}
