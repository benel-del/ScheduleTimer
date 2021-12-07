import { iSchedule, iSchedulesOfDate, iSchedulesOfMonth, iStatistics } from "../typeDeclare";

export const newStatistics = (type: string | undefined) => {
    const temp: iStatistics = {
        numOfSchedules: type? 0 : 1,
        numOfCompleteSchedules: 0,
        amountOfTime: 0,
        amountOfCompleteTime: 0,
        numOfDatesInMonth: type? 0 : 1,
        numOf100PercentDatesInMonth: 0
    }
    return temp;
}

export const updateStatisticsOfDate = (schedules: iSchedule[]) => {
    let statistics = newStatistics("a")
    schedules.forEach(schedule => {
        statistics.numOfSchedules += 1
        if(schedule.isChecked)
            statistics.numOfCompleteSchedules += 1
        const planTime = schedule.timeSetting_hour * 3600 + schedule.timeSetting_minute * 60
        statistics.amountOfTime += planTime
        statistics.amountOfCompleteTime += planTime - schedule.timeRemaining
    });
    statistics.numOfDatesInMonth = 1
    return statistics
}

export const updateStatisticsOfMonth = (schedulesList: iSchedulesOfDate[]) => {
    let statistics = newStatistics("a")
    schedulesList.forEach(schedules => {
        const st = updateStatisticsOfDate(schedules.scheduleOfDate)
        statistics.numOfSchedules += st.numOfSchedules
        statistics.numOfCompleteSchedules += st.numOfCompleteSchedules
        statistics.amountOfTime += st.amountOfTime
        statistics.amountOfCompleteTime += st.amountOfCompleteTime
        statistics.numOfDatesInMonth += st.numOfSchedules != 0 ? 1: 0
        statistics.numOf100PercentDatesInMonth += (st.numOfSchedules == st.numOfCompleteSchedules && st.numOfSchedules != 0) ? 1 : 0
    })
    return statistics
}

export const getStatisticsFormat = (statistics: iStatistics | undefined) => {
    if(statistics == undefined || statistics.numOfSchedules == 0)
        return ["0시간 0분", "0% 달성"]
    const studyTime = Math.floor(statistics.amountOfCompleteTime / 3600) + "시간 " + Math.floor(statistics.amountOfCompleteTime / 60) % 60 + "분" 
    const gauge = Math.floor(statistics.numOfCompleteSchedules / statistics.numOfSchedules * 100) + "% 달성"
    return [studyTime, gauge]
}

export const getTotalStatistics = (schedules: iSchedulesOfMonth[]) => {
    if(schedules.length == 0)
        return ["0/0", "0/0", "0/0"]
    let numOfDates = [0, 0] // real, plan
    let numOfSchedules = [0, 0]
    let studyTime = [0, 0]
    
    schedules.forEach((month) => {
        const monthStatistics = month.statisticsOfMonth
        numOfDates[0] += monthStatistics.numOf100PercentDatesInMonth
        numOfDates[1] += monthStatistics.numOfDatesInMonth
        numOfSchedules[0] += monthStatistics.numOfCompleteSchedules
        numOfSchedules[1] +=  monthStatistics.numOfSchedules
        studyTime[0] +=  monthStatistics.amountOfCompleteTime
        studyTime[1] += monthStatistics.amountOfTime
    })

    const date = numOfDates[0] + " 일 / " + numOfDates[1] + " 일"
    const schedule = numOfSchedules[0] + " 개 / " + numOfSchedules[1] + " 개"
    const time = getTimeFormat(studyTime[0]) + " / " + getTimeFormat(studyTime[1])
    return [date, schedule, time]
}

const getTimeFormat = (time : number) => {
    if(time == 0)
        return "0 분"
    return Math.floor(time / 60)  + " 분" 
}