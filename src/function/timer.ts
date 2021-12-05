import { iTimer } from '../typeDeclare'

export const initTimer = () => {
    const timer: iTimer = {
        hour: 0,
        minute: 0,
        second: 0
    }
    return timer
}

export const newTimer = (timeSetting: number) => {
    const timer: iTimer = {
        hour: Math.floor(timeSetting / 3600),
        minute: Math.floor(timeSetting / 60) % 60,
        second: timeSetting % 60
    }
    return timer
}

export const isTimerInit = (time: iTimer) => {
    return time.hour == 0 && time.minute == 0 && time.second == 0
}