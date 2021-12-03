import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Navigator from "./Navigator";
import { NavigationContainer } from "@react-navigation/native";
import { iSchedule, iSchedulesOfDate, iSchedulesOfMonth } from "./src/typeDeclare"
import { SchedulesProvider, TodayDateProvider } from "./src/provider";
import { getDateForm, getTheDateSchedules, getTheMonthScehudules, newSchedule, newSchedulesOfDate, newSchedulesofMonth, updateScheduleOfDate, updateScheduleOfMonth } from "./src/function";

export default function App(){
  const [today, setToday] = useState(new Date())
  const [theDate, setTheDate] = useState(today)
  const [theMonth, setTheMonth] = useState(today)
  const [schedules, setSchedules] = useState<iSchedulesOfMonth[]>([])
  const [theDateSchedules, setTheDateSchedules] = useState<iSchedulesOfDate>()
  const [theMonthSchedules, setTheMonthSchedules] = useState<iSchedulesOfMonth>()

  //testCode
  if(schedules.length == 0){
    console.log("testDate")
    let date = newSchedulesOfDate(today, newSchedule("test", 0, 1))
    date.scheduleOfDate.push(newSchedule("test2", 0, 1))
    const month = newSchedulesofMonth(today, date)
    setSchedules([month])
  }


  useLayoutEffect(() => {
    if(schedules.length != 0){
      const monthSchedules = getTheMonthScehudules(schedules, theMonth)
      const dateSchedules = getTheDateSchedules(schedules, theDate)
      setTheMonthSchedules(monthSchedules)
      setTheDateSchedules(dateSchedules)
    }
  }, [theDate, theMonth, schedules])

  useEffect(() => {
    console.log("schedules change!")
    theDateSchedules?.scheduleOfDate.map(sch => console.log(sch))
  }, [theDateSchedules])

  const updateTheDate = useCallback((type: string | Date) => {
    if(typeof(type) == "string")
      type = new Date(theDate.getFullYear(), theDate.getMonth(), theDate.getDate() + (type == "before" ? -1 : 1))
    setTheDate(type)
  }, [theDate])

  const updateTheMonth = useCallback((type: string | Date) => {
    if(typeof(type) == "string")
      type = new Date(theMonth.getFullYear(), theMonth.getMonth() + (type == "before" ? -1 : 1))
    setTheMonth(type)
  }, [theMonth])

  const updateSchedules = useCallback((type: string, schedule: iSchedule) => {
    let newSchedules: iSchedulesOfMonth[]
    let theNewDate: iSchedulesOfDate
    let theNewMonth: iSchedulesOfMonth

    const monthSchedules = getTheMonthScehudules(schedules, theMonth)
    const dateSchedules = getTheDateSchedules(schedules, theDate)

    if(monthSchedules != undefined){
      let newMonthScheduleList: iSchedulesOfDate[]
      if(dateSchedules != undefined){
        let oldDateScheduleList = dateSchedules.scheduleOfDate
        let newDateScheduleList: iSchedule[]
        console.log("command: " + type)
        if(type == "insert")
          newDateScheduleList = [...oldDateScheduleList, schedule]
        else if(type == "remove")
          newDateScheduleList = oldDateScheduleList.filter(sch => sch.index !== schedule.index)
        else{  // "modify"
          oldDateScheduleList.map(sch => console.log(sch))
          newDateScheduleList = oldDateScheduleList.map(sch => sch.index == schedule.index? schedule : sch)
        
        }
        theNewDate = updateScheduleOfDate(dateSchedules, newDateScheduleList)
        newMonthScheduleList = monthSchedules.schedulesOfMonth.map(oldDate => oldDate.date == theNewDate.date? theNewDate : oldDate)

        theNewDate.scheduleOfDate.map((date) => {
          console.log(date.name + ": " + date.timeRemaining)
        })
      }
      else{   // theDateSchedules: undefined
        theNewDate = newSchedulesOfDate(theDate, schedule)
        newMonthScheduleList = [...monthSchedules.schedulesOfMonth, theNewDate]
      }
      theNewMonth = updateScheduleOfMonth(monthSchedules, newMonthScheduleList)
      newSchedules = schedules.map(month => month.month == theNewMonth.month? theNewMonth : month)
    }
    else{   // theMonthSchedules: undefined
      theNewDate = newSchedulesOfDate(theDate, schedule)
      theNewMonth = newSchedulesofMonth(theDate, theNewDate)
      newSchedules = [...schedules, theNewMonth]
    }
    setTheDateSchedules(theNewDate)
    setTheMonthSchedules(theNewMonth)
    setSchedules(newSchedules)
  }, [theDate, theDateSchedules?.scheduleOfDate.length, theDateSchedules?.statisticsOfDate.amountOfCompleteTime])

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