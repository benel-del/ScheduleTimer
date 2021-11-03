const daysKor = ["일", "월", "화", "수", "목", "금", "토"];

export default function getDayFormatting(day: Date){
    return day.getFullYear() + "." + (day.getMonth() + 1) + "." + day.getDate() + " " + daysKor[day.getDay()]
}