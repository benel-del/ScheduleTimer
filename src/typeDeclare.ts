export type iSchedule = {
    index: number,
    name: string,
    timeSetting_hour: number,
    timeSetting_minute: number,
    timeRemaining: number,
    isChecked: boolean,
    timerIcon: string,
    checkIcon: string
}

export type iTimer = {
    hour: number,
    minute: number,
    second: number
}

export type iStatistics = {
    numOfSchedules: number,
    numOfCompleteSchedules: number,
    amountOfCompleteTime: number,
    numOfDates: number
}

export type iSchedulesOfDate = {
    date: string,
    scheduleOfDate: iSchedule[],
    statisticsOfDate: iStatistics
}

export type iSchedulesOfMonth = {
    month: string,
    schedulesOfMonth: iSchedulesOfDate[],
    statisticsOfMonth: iStatistics
}