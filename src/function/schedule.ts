import { getMonthForm, newStatistics, updateStatisticsOfDate, updateStatisticsOfMonth } from "."
import { iSchedule, iSchedulesOfDate, iSchedulesOfMonth } from "../typeDeclare"
import { getDateForm } from "./date"

let scheduleIndex = 0
export const newSchedule = (name: string, timeSetting_hour: number, timeSetting_minute: number) => {
    const sch: iSchedule = {
        index: scheduleIndex,
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
        ...schedule,
        timerIcon: newIcon
    }
    return sch
}

export const setTimeRemaining = (schedule: iSchedule, time: number) => {
    const sch: iSchedule = {
        ...schedule,
        timeRemaining: time
    }
    return sch
}

export const setTimeOver = (schedule: iSchedule) => {
    const sch: iSchedule = {
        ...schedule,
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

export const newSchedulesOfDate = (date: Date, newSch: iSchedule) => {
    const temp: iSchedulesOfDate = {
        date: getDateForm(date),
        scheduleOfDate: [newSch],
        statisticsOfDate: newStatistics()
    }
    return temp
}

export const newSchedulesofMonth = (date: Date, newDate: iSchedulesOfDate) => {
    const temp: iSchedulesOfMonth = {
        month: getMonthForm(date),
        schedulesOfMonth: [newDate],
        statisticsOfMonth: updateStatisticsOfDate(newDate.scheduleOfDate)
    }
    return temp
}

export const updateScheduleOfDate = (theOldDate: iSchedulesOfDate, newSchedules: iSchedule[]) => {
    const theNewDate: iSchedulesOfDate = {
        date: theOldDate.date,
        scheduleOfDate: newSchedules,
        statisticsOfDate: updateStatisticsOfDate(newSchedules)
    }
    return theNewDate
}

export const updateScheduleOfMonth = (theOldMonth: iSchedulesOfMonth, newList: iSchedulesOfDate[]) => {
    const theNewMonth: iSchedulesOfMonth = {
        month: theOldMonth.month,
        schedulesOfMonth: newList,
        statisticsOfMonth: updateStatisticsOfMonth(newList)
    }
    return theNewMonth
}

export const getTheMonthScehudules = (schedules: iSchedulesOfMonth[], theDate: Date) => {
    return schedules.find(dates => dates.month == getMonthForm(theDate))
}

export const getTheDateSchedules = (schedules: iSchedulesOfMonth[], theDate: Date) => {
    const monthSchedules = getTheMonthScehudules(schedules, theDate)
    return monthSchedules?.schedulesOfMonth.find(schs => schs.date == getDateForm(theDate))
}
