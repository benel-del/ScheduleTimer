import { getMonthFormat, newStatistics, updateStatisticsOfDate, updateStatisticsOfMonth } from "."
import { iSchedule, iSchedulesOfDate, iSchedulesOfMonth } from "../typeDeclare"
import { getDateFormat } from "./date"

export const newSchedule = (scheduleIndex: number, name: string, planTime: number) => {
    const sch: iSchedule = {
        index: scheduleIndex,
        name: name,
        planTime: planTime,
        remainTime: planTime,
        timerIcon: "timer",
        isChecked: false
    }
    return sch
}

export const newTempSchedule = () => {
    const sch: iSchedule = {
        index: -1,
        name: "",
        planTime: 0,
        remainTime: 0,
        timerIcon: "timer",
        isChecked: false
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
        remainTime: time
    }
    return sch
}

export const setTimeOver = (schedule: iSchedule) => {
    const sch: iSchedule = {
        ...schedule,
        remainTime: 0,
        timerIcon: "",
        isChecked: true
    }
    return sch
}

export const getTimeSetting = (seconds: number) => {
    let time = ""
    const hour = Math.floor(seconds / 3600)
    const minute = Math.floor(seconds / 60) % 60
    if(hour != 0)
        time += hour + "시간"
    if(minute != 0)
        time += (time != "" ? " " : "") + minute + "분"
    return time
}

export const getLastScheduleIndex = (schedulesOfDate: iSchedulesOfDate | undefined) => {
    let numOfschedules = schedulesOfDate?.statisticsOfDate.numOfSchedules
    if(schedulesOfDate == undefined || schedulesOfDate.scheduleOfDate == undefined || numOfschedules == undefined || numOfschedules == 0)
        return 0
    return schedulesOfDate.scheduleOfDate[numOfschedules-1].index
}

export const newSchedulesOfDate = (date: Date, newSch: iSchedule) => {
    const temp: iSchedulesOfDate = {
        date: getDateFormat(date),
        scheduleOfDate: [newSch],
        statisticsOfDate: newStatistics(undefined)
    }
    return temp
}

export const newSchedulesofMonth = (date: Date, newDate: iSchedulesOfDate) => {
    const temp: iSchedulesOfMonth = {
        month: getMonthFormat(date),
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
    return schedules.find(dates => dates.month == getMonthFormat(theDate))
}

export const getTheDateSchedules = (schedules: iSchedulesOfMonth[], theDate: Date) => {
    const monthSchedules = getTheMonthScehudules(schedules, theDate)
    return monthSchedules?.schedulesOfMonth.find(schs => schs.date == getDateFormat(theDate))
}
