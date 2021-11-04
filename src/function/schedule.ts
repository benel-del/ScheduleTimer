import { useRef, useCallback } from "react"
import { iSchedule } from "../typeDeclare"

const scheduleIndex = useRef(0)
export const newSchedule = useCallback((date: Date, name: string, timeSetting_hour: number, timeSetting_minute: number) => {
    const sch: iSchedule = {
        index: scheduleIndex.current,
        date: date,
        name: name,
        timeSetting_hour: timeSetting_hour,
        timeSetting_minute: timeSetting_minute,
        timeRemaining: timeSetting_hour * 3600 + timeSetting_minute * 60,
        timerIcon: "timer",
        isChecked: false,
        checkIcon: "square"
    }
    scheduleIndex.current += 1
    return sch
}, [])

export const setTimerIcon = useCallback((schedule: iSchedule, newIcon: string) => {
    const sch: iSchedule = {
        index: schedule.index,
        date: schedule.date,
        name: schedule.name,
        timeSetting_hour: schedule.timeSetting_hour,
        timeSetting_minute: schedule.timeSetting_minute,
        timeRemaining: schedule.timeRemaining,
        timerIcon: newIcon,
        isChecked: schedule.isChecked,
        checkIcon: schedule.checkIcon
    }
    return sch
}, [])

export const setTimeRemaining = useCallback((schedule: iSchedule, timeRemaining: number) => {
    const sch: iSchedule = {
        index: schedule.index,
        date: schedule.date,
        name: schedule.name,
        timeSetting_hour: schedule.timeSetting_hour,
        timeSetting_minute: schedule.timeSetting_minute,
        timeRemaining: timeRemaining,
        timerIcon: schedule.timerIcon,
        isChecked: schedule.isChecked,
        checkIcon: schedule.checkIcon
    }
    return sch
}, [])

export const getTimeSetting = useCallback((schedule: iSchedule) => {
    let time = ""
    if(schedule.timeSetting_hour != 0)
        time += schedule.timeSetting_hour + "시간 "
    if(schedule.timeSetting_minute != 0)
        time += schedule.timeSetting_minute + "분"
    return time
}, [])

