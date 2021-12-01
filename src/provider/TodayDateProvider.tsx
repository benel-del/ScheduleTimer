import React, { createContext, useContext } from "react"
import type { FC } from "react"
export type TodayDateContextType = {
    today: Date,
    theDate: Date,
    theMonth: Date,
    updateTheDate: (arg0: string | Date) => void,
    updateTheMonth: (arg0: string | Date) => void
}

const dd = new Date()
const defaultContext = {
    today: dd,
    theDate: dd,
    theMonth: dd,
    updateTheDate: () => {},
    updateTheMonth: () => {}
}

const TodayDateContext = createContext<TodayDateContextType>(defaultContext)
type TodayDateContextProperties = {
    today: Date,
    theDate: Date,
    theMonth: Date,
    updateTheDate: (arg0: string | Date) => void,
    updateTheMonth: (arg0: string | Date) => void
}

export const TodayDateProvider: FC<TodayDateContextProperties> = ({children, today, theDate, theMonth, updateTheDate, updateTheMonth}) => {
    const value = {today, theDate, theMonth, updateTheDate, updateTheMonth}
    return <TodayDateContext.Provider value={value}>{children}</TodayDateContext.Provider>
}

export const useTodayDateContext = () => {
    const {today, theDate, theMonth, updateTheDate, updateTheMonth} = useContext(TodayDateContext)
    return {today, theDate, theMonth, updateTheDate, updateTheMonth}
}