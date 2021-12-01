import React, { useCallback, useLayoutEffect, useState } from "react";
import Navigator from "./Navigator";
import { NavigationContainer } from "@react-navigation/native";
import { iSchedule, iSchedulesOfDate, iSchedulesOfMonth } from "./src/typeDeclare"
import { SchedulesProvider, TodayDateProvider } from "./src/provider";
import { getDateForm, getMonthForm, newSchedulesOfDate, newSchedulesofMonth, updateScheduleOfDate, updateScheduleOfMonth } from "./src/function";

export default function App(){
  const [today, setToday] = useState(new Date())
  const [theDate, setTheDate] = useState(today)
  const [theMonth, setTheMonth] = useState(today)
  const [schedules, setSchedules] = useState<iSchedulesOfMonth[]>([])
  const [theDateSchedules, setTheDateSchedules] = useState<iSchedulesOfDate>()
  const [theMonthSchedules, setTheMonthSchedules] = useState<iSchedulesOfMonth>()

  useLayoutEffect(() => {
    if(schedules != []){
      const monthSchedules = schedules.find(dates => dates.month == getMonthForm(theMonth))
      setTheMonthSchedules(monthSchedules)
    }
  }, [schedules, theMonth])

  useLayoutEffect(() => {
    if(schedules != []){
      const monthSchedules = schedules.find(dates => dates.month == getMonthForm(theDate))
      const dateSchedules = monthSchedules?.schedulesOfMonth.find(schs => schs.date == getDateForm(theDate))
      setTheDateSchedules(dateSchedules)
    }
  }, [schedules, theDate])

  const updateTheDate = useCallback((type: string | Date) => {
    if(typeof(type) == "string")
      setTheDate(
        new Date(theDate.getFullYear(), theDate.getMonth(), theDate.getDate() + (type == "before" ? -1 : 1))
      )
    else
        setTheDate(type)
  }, [theDate])

  const updateTheMonth = useCallback((type: string | Date) => {
    if(typeof(type) == "string"){
      const dd = new Date(theMonth.getFullYear(), theMonth.getMonth() + (type == "before" ? -1 : 1))
      setTheDate(dd)
      setTheMonth(dd)
    }
    else
      setTheMonth(type)
  }, [theMonth])

  const updateSchedules = useCallback((type: string, schedule: iSchedule) => {
    if(theMonthSchedules != undefined){
      if(theDateSchedules != undefined){
        const oldDateScheduleList = theDateSchedules.scheduleOfDate
        let newDateScheduleList: iSchedule[]
        if(type == "insert")
          newDateScheduleList = [...oldDateScheduleList, schedule]
        else if(type == "remove")
          newDateScheduleList = oldDateScheduleList.filter(sch => sch.index !== schedule.index)
        else  // "modify"
          newDateScheduleList = oldDateScheduleList.map(sch => sch.index == schedule.index? schedule : sch)
        
        const theNewDate = updateScheduleOfDate(theDateSchedules, newDateScheduleList)
        const theNewMonth = updateScheduleOfMonth(theMonthSchedules, theNewDate, "")
        setSchedules(
          schedules.map(month => month.month == theNewMonth.month? theNewMonth : month)
        )
      }
      else{   // theDateSchedules: undefined
        const theNewDate = newSchedulesOfDate(theDate, schedule)
        const theNewMonth = updateScheduleOfMonth(theMonthSchedules, theNewDate, "add")
        setSchedules(
          schedules.map(month => month.month == theNewMonth.month? theNewMonth : month)
        )
      }
      
    }
    else{   // theMonthSchedules: undefined
      const theNewMonth = newSchedulesofMonth(theDate, schedule)
      setSchedules([...schedules, theNewMonth])
    }
  }, [theDate, theDateSchedules])

  const dd = new Date()
  if(getDateForm(today) != getDateForm(dd)){
    setToday(dd)
  }

  return (
    <TodayDateProvider today={today} theDate={theDate} theMonth={theMonth} updateTheDate={updateTheDate} updateTheMonth={updateTheMonth}>
      <SchedulesProvider schedules={schedules} updateSchedules={updateSchedules} theMonthSchedules={theMonthSchedules} theDateSchedules={theDateSchedules}>
        <NavigationContainer>
          <Navigator/>
        </NavigationContainer>
      </SchedulesProvider>
    </TodayDateProvider>
  )
}