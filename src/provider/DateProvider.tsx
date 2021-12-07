import React, { createContext, useContext } from "react"
import type { FC } from "react"
export type DateContextType = {
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

const DateContext = createContext<DateContextType>(defaultContext)
type DateContextProperties = {
    today: Date,
    theDate: Date,
    theMonth: Date,
    updateTheDate: (arg0: string | Date) => void,
    updateTheMonth: (arg0: string | Date) => void
}

export const DateProvider: FC<DateContextProperties> = ({children, today, theDate, theMonth, updateTheDate, updateTheMonth}) => {
    const value = {today, theDate, theMonth, updateTheDate, updateTheMonth}
    return <DateContext.Provider value={value}>{children}</DateContext.Provider>
}

export const useDateContext = () => {
    const {today, theDate, theMonth, updateTheDate, updateTheMonth} = useContext(DateContext)
    return {today, theDate, theMonth, updateTheDate, updateTheMonth}
}