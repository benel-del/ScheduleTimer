import { iSchedule } from "../typeDeclare";

const getStudyTimeAndCheck = (scheduleList: iSchedule[]) => {
    let studyTime = 0
    let countCheck = 0
    const numOfSchedule = scheduleList.length
    for (let index = 0; index < numOfSchedule; index++) {
        const schedule = scheduleList[index];
        const planTime = schedule.timeSetting_hour * 3600 + schedule.timeSetting_minute * 60
        studyTime += (planTime - schedule.timeRemaining)

        if(schedule.isChecked)
            countCheck += 1
    }
    return [studyTime, countCheck, numOfSchedule]
}

const getFormatting = (time: number, countCheck: number, numOfSchedule: number) => {
    const studyTime = Math.floor(time / 3600) + "시간 " + Math.floor(time/60) % 60 + "분" 
    const gauge = Math.floor(countCheck / numOfSchedule * 100)
    return [studyTime, gauge]
}

export const getStatisticsOfDay = (scheduleList: iSchedule[]) => {
    let [time, countCheck, numOfSchedule] = getStudyTimeAndCheck(scheduleList)
    return getFormatting(time, countCheck, numOfSchedule)
}

export const getStatisticsOfMonth = (scheduleList: iSchedule[][]) => {
    let studyTimes = 0
    let checks = 0
    let num = 0
    let numOfSchedules = scheduleList.length
    for (let index = 0; index < numOfSchedules; index++) {
        let [studyTime, countCheck, numOfSchedule] = getStudyTimeAndCheck(scheduleList[index]);
        studyTimes += studyTime
        checks += countCheck
        num += numOfSchedule
    }
    return getFormatting(studyTimes, checks, num)
}