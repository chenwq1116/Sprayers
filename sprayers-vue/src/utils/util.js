export function dateFormat_y_m_d_hm(date){
    const dateFormat = new Date(date);
    return dateFormat.getFullYear() + "-" + dateFormat.getMonth() + '-' + dateFormat.getDay() + ' ' + dateFormat.getHours() + ':' + dateFormat.getMinutes();
}
