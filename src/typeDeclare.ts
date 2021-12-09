export type iSchedule = {
    index: number,
    name: string,
    planTime: number,
    remainTime: number,
    isChecked: boolean,
    timerIcon: string
}

export type iTimer = {
    hour: number,
    minute: number,
    second: number
}

export type iStatistics = {
    numOfSchedules: number,
    numOfCompleteSchedules: number,
    amountOfTime: number,
    amountOfCompleteTime: number,
    numOfDatesInMonth: number
    numOf100PercentDatesInMonth: number
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