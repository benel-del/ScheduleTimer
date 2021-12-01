const today = new Date();
const daysKor = ["일", "월", "화", "수", "목", "금", "토"];

export function getTense(day: Date){
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

export function getTenseByString(day: string){
    let interval = Number(day.substring(0, 4)) - today.getFullYear()
    if(interval > 0)
        return "Future"
    else if(interval < 0)
        return "Past"
    else{
        interval = Number(day.substring(5, 7)) - today.getMonth() - 1
        if(interval > 0)
            return "Future"
        else if(interval < 0)
            return "Past"
        else{
            interval = Number(day.substring(8, 10)) - today.getDate()
            if(interval > 0)
                return "Future"
            else if(interval < 0)
                return "Past"
            else
                return "Today"
        }
    }
}

export function getDateForm(day: Date){
    const dd = day.getDate()
    return day.getFullYear() + "." + (day.getMonth() + 1) + "." + (dd < 10 ? "0" + dd: dd) + " " + daysKor[day.getDay()]
}

export function getMonthForm(day: Date){
    return day.getFullYear() + "." + (day.getMonth() + 1)
}