import { useCallback } from "react"
import { iTimer } from '../typeDeclare'

export const initTimer = useCallback(() => {
    const timer: iTimer = {
        hour: 0,
        minute: 0,
        second: 0
    }
    return timer
}, [])

export const newTimer = useCallback((timeSetting: number) => {
    const timer: iTimer = {
        hour: Math.floor(timeSetting / 3600),
        minute: Math.floor(timeSetting / 60) % 60,
        second: timeSetting % 60
    }
    return timer
}, [])