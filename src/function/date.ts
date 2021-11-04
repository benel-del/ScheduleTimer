const today = new Date();
const daysKor = ["일", "월", "화", "수", "목", "금", "토"];

export function getTense(day: Date){
    var interval = day.getFullYear() - today.getFullYear()
    interval += day.getMonth() - today.getMonth()
    interval += day.getDay() - today.getDay()

    if(interval > 0)
        return "Future"
    else if(interval < 0)
        return "Past"
    return "Today"
}

export function getDayFormatting(day: Date){
    return day.getFullYear() + "." + (day.getMonth() + 1) + "." + day.getDate() + " " + daysKor[day.getDay()]
}

export function getMonthFormatting(day: Date){
    return day.getFullYear() + "." + day.getMonth()
}