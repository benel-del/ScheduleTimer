import { iSchedule, iSchedulesOfDate, iSchedulesOfMonth, iStatistics } from "../typeDeclare";

export const newStatistics = () => {
    const temp: iStatistics = {
        numOfSchedules: 1,
        numOfCompleteSchedules: 0,
        amountOfCompleteTime: 0,
        numOfDatesInMonth: 0
    }
    return temp;
}

const newTempStatistics = () => {
    const temp: iStatistics = {
        numOfSchedules: 0,
        numOfCompleteSchedules: 0,
        amountOfCompleteTime: 0,
        numOfDatesInMonth: 0
    }
    return temp;
} 

export const updateStatisticsOfDate = (schedules: iSchedule[]) => {
    let statistics = newTempStatistics()
    schedules.forEach(schedule => {
        statistics.numOfSchedules += 1
        if(schedule.isChecked)
            statistics.numOfCompleteSchedules += 1
        const planTime = schedule.timeSetting_hour * 3600 + schedule.timeSetting_minute * 60
        statistics.amountOfCompleteTime += planTime - schedule.timeRemaining
    });
    return statistics
}

export const updateStatisticsOfMonth = (schedulesList: iSchedulesOfDate[]) => {
    let statistics = newTempStatistics()
    schedulesList.forEach(schedules => {
        const st = updateStatisticsOfDate(schedules.scheduleOfDate)
        statistics.numOfSchedules += st.numOfSchedules
        statistics.numOfCompleteSchedules += st.numOfCompleteSchedules
        statistics.amountOfCompleteTime += st.amountOfCompleteTime
        statistics.numOfDatesInMonth += 1
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

export const getDailyStatistics = (toMonthStatistics: iStatistics | undefined) => {
    if(toMonthStatistics == undefined)
        return ["0시간 0분", "0% 달성"]
    const numOfDates = toMonthStatistics.numOfDatesInMonth
    const aveTime = Math.floor(toMonthStatistics.amountOfCompleteTime / numOfDates)
    const studyTime = Math.floor(aveTime / 3600) + "시간 " + Math.floor(aveTime / 60) % 60 + "분"
    const aveNumOfSchedules = Math.floor(toMonthStatistics.numOfSchedules / numOfDates)
    const aveNumOfCompleteSchedules = Math.floor(toMonthStatistics.numOfCompleteSchedules / numOfDates)
    const gauge = Math.floor(aveNumOfCompleteSchedules / aveNumOfSchedules * 100) + "% 달성"
    return [studyTime, gauge]
}

export const getMonthlyStatistics = (schedules: iSchedulesOfMonth[]) => {
    let monthCount = 0
    let monthStudyTime = 0
    let monthNumOfSchedules = 0
    let monthNumOfCompleteSchedules = 0
    schedules.forEach(month => {
        monthCount += 1
        monthStudyTime += month.statisticsOfMonth.amountOfCompleteTime
        monthNumOfSchedules += month.statisticsOfMonth.numOfSchedules
        monthNumOfCompleteSchedules += month.statisticsOfMonth.numOfCompleteSchedules
    })

    const aveTime = Math.floor(monthStudyTime / monthCount)
    const studyTime = Math.floor(aveTime / 3600) + "시간 " + Math.floor(aveTime / 60) % 60 + "분"
    const aveNumOfSchedules = Math.floor(monthNumOfSchedules / monthCount)
    const aveNumOfCompleteSchedules = Math.floor(monthNumOfCompleteSchedules / monthCount)
    const gauge = Math.floor(aveNumOfCompleteSchedules / aveNumOfSchedules * 100) + "% 달성"
    return [studyTime, gauge]
}