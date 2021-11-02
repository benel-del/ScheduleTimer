const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const daysEng = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const daysKor = ["월", "화", "수", "목", "금", "토", "일"];

export default function getDayFormatting(today: string){
    var year = today.substring(11, 15);
    var month = today.substring(4, 7);
    var day = today.substring(8, 10);
    var dayOfWeek = today.substring(0, 3);

    for(var i = 0; i < 12; i++){
        if(months[i] == month){
            month = "" + (i+1);
            break;
        }
    }

    for(var i = 0; i < 7; i++){
        if(daysEng[i] == dayOfWeek){
            dayOfWeek = daysKor[i];
            break;
        }
    }

    return year + "." + month + "." + day + " " + dayOfWeek
}