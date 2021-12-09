const daysKor = ["일", "월", "화", "수", "목", "금", "토"];

export function getTense(day: Date, today: Date){
    let interval = day.getFullYear() - today.getFullYear()
    if(interval > 0)
        return "Future"
    else if(interval < 0)
        return "Past"
    else{
        interval = day.getMonth() - today.getMonth()
        if(interval > 0)
            return "Future"
        else if(interval < 0)
            return "Past"
        else{
            interval = day.getDate() - today.getDate()
            if(interval > 0)
                return "Future"
            else if(interval < 0)
                return "Past"
            else
                return "Today"
        }
    }
}

export function getDateFormat(day: Date){
    const mm = day.getMonth() + 1
    const dd = day.getDate()
    return day.getFullYear() + "." + (mm < 10 ? "0" + mm : mm) + "." + (dd < 10 ? "0" + dd : dd) + " " + daysKor[day.getDay()]
}

export function getMonthFormat(day: Date){
    const mm = day.getMonth() + 1
    return day.getFullYear() + "." + (mm < 10 ? "0" + mm : mm)
}

export function getDateFormatByString(day: string){
    // day: yyyy-mm-dd
    const yy = Number(day.substring(0, 4))
    const mm = Number(day.substring(5, 7))
    const dd = Number(day.substring(8, 10))

    return {
        dateFormat: new Date(yy, mm-1, dd),
        stringForm: yy + "." + (mm < 10 ? "0" + mm : mm) + "." + (dd < 10 ? "0" + dd : dd)
    }
}