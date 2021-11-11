import { useRef, useCallback } from "react"
import { iSchedule } from "../typeDeclare"

let scheduleIndex = 0
export const newSchedule = (date: Date, name: string, timeSetting_hour: number, timeSetting_minute: number) => {
    const sch: iSchedule = {
        index: scheduleIndex,
        date: date,
        name: name,
        timeSetting_hour: timeSetting_hour,
        timeSetting_minute: timeSetting_minute,
        timeRemaining: timeSetting_hour * 3600 + timeSetting_minute * 60,
        timerIcon: "timer",
        isChecked: false,
        checkIcon: "square"
    }
    scheduleIndex += 1
    return sch
}

export const newTempSchedule = () => {
    const sch: iSchedule = {
        index: -1,
        date: new Date(),
        name: "",
        timeSetting_hour: 0,
        timeSetting_minute: 0,
        timeRemaining: 0,
        timerIcon: "timer",
        isChecked: false,
        checkIcon: "square"
    }
    return sch
}

export const setTimerIcon = (schedule: iSchedule, newIcon: string) => {
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
}

export const setTimeRemaining = (schedule: iSchedule, timeRemaining: number) => {
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
}

export const setTimeOver = (schedule: iSchedule) => {
    const sch: iSchedule = {
        index: schedule.index,
        date: schedule.date,
        name: schedule.name,
        timeSetting_hour: schedule.timeSetting_hour,
        timeSetting_minute: schedule.timeSetting_minute,
        timeRemaining: 0,
        timerIcon: "",
        isChecked: true,
        checkIcon: "check-square"
    }
    return sch
}

export const getTimeSetting = (schedule: iSchedule) => {
    let time = ""
    if(schedule.timeSetting_hour != 0)
        time += schedule.timeSetting_hour + "시간 "
    if(schedule.timeSetting_minute != 0)
        time += schedule.timeSetting_minute + "분"
    return time
}
