import React, { createContext, useContext } from "react"
import type { FC } from "react"
import { iSchedule, iSchedulesOfDate, iSchedulesOfMonth } from "../typeDeclare"

export type ScheduleContextType = {
    schedules: iSchedulesOfMonth[],
    updateSchedules: (arg0: string, arg1: iSchedule) => void,
    theMonthSchedules: iSchedulesOfMonth | undefined,
    theDateSchedules: iSchedulesOfDate | undefined
}

const defaultContext = {
    schedules: [],
    updateSchedules: () => {},
    theMonthSchedules: undefined,
    theDateSchedules: undefined
}

const ScheduleContext = createContext<ScheduleContextType>(defaultContext)
type ScheduleContextProperties = {
    schedules: iSchedulesOfMonth[],
    updateSchedules: (arg0: string, arg1: iSchedule) => void,
    theMonthSchedules: iSchedulesOfMonth | undefined,
    theDateSchedules: iSchedulesOfDate | undefined
}

export const SchedulesProvider: FC<ScheduleContextProperties> = ({children, schedules, updateSchedules, theMonthSchedules, theDateSchedules}) => {
    const value = {schedules, updateSchedules, theMonthSchedules, theDateSchedules}
    return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>
}

export const useScheduleContext = () => {
    const {schedules, updateSchedules, theMonthSchedules, theDateSchedules} = useContext(ScheduleContext)
    return {schedules, updateSchedules, theMonthSchedules, theDateSchedules}
}