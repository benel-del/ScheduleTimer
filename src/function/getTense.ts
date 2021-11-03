const today = new Date();

export default function getTense(day: Date){
    var interval = day.getFullYear() - today.getFullYear()
    interval += day.getMonth() - today.getMonth()
    interval += day.getDay() - today.getDay()

    if(interval > 0)
        return "Future"
    else if(interval < 0)
        return "Past"
    return "Today"
}
