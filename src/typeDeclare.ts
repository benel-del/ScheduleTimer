export type iSchedule = {
    index: number,
    date: string,
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