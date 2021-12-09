import React, { useCallback, useLayoutEffect, useState } from "react";
import Navigator from "./Navigator";
import AsyncStorage from "@react-native-community/async-storage"
import { NavigationContainer } from "@react-navigation/native";
import { iSchedule, iSchedulesOfDate, iSchedulesOfMonth } from "./src/typeDeclare"
import { SchedulesProvider, DateProvider } from "./src/provider";
import { getDateFormat, getTheDateSchedules, getTheMonthScehudules, newSchedulesOfDate, newSchedulesofMonth, updateScheduleOfDate, updateScheduleOfMonth } from "./src/function";

export default function App(){
  const [today, setToday] = useState<Date>(new Date())
  const [theDate, setTheDate] = useState<Date>(today)
  const [theMonth, setTheMonth] = useState<Date>(today)
  const [schedules, setSchedules] = useState<iSchedulesOfMonth[]>([])
  const [theDateSchedules, setTheDateSchedules] = useState<iSchedulesOfDate | undefined>()
  const [theMonthSchedules, setTheMonthSchedules] = useState<iSchedulesOfMonth | undefined>()

  useLayoutEffect(() => {
    //AsyncStorage.clear()  // for reset
    AsyncStorage.getItem('@ScheduleTimer:Schedules').then((state)=> {
      if(state != null){
        const data:iSchedulesOfMonth[] = JSON.parse(state)
        setSchedules(data)
        setTheDateSchedules(getTheDateSchedules(data, theDate))
        setTheMonthSchedules(getTheMonthScehudules(data, theDate))
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  useLayoutEffect(() => {
    const dd = new Date()
    if(getDateFormat(today) != getDateFormat(dd)){
      setToday(dd)
    }
  })

  const updateTheDate = useCallback((date: string | Date) => {
    if(typeof(date) == "string")
      date = new Date(theDate.getFullYear(), theDate.getMonth(), theDate.getDate() + (date == "before" ? -1 : 1))
    setTheDate(date)
    setTheDateSchedules(getTheDateSchedules(schedules, date))
    setTheMonth(date)
    setTheMonthSchedules(getTheMonthScehudules(schedules, date))
  }, [theDate, schedules])

  const updateTheMonth = useCallback((date: string | Date) => {
    if(typeof(date) == "string")
      date = new Date(theMonth.getFullYear(), theMonth.getMonth() + (date == "before" ? -1 : 1))
    setTheMonth(date)
    setTheMonthSchedules(getTheMonthScehudules(schedules, date))
  }, [theMonth, schedules])

  const saveData = useCallback((data: iSchedulesOfMonth[]) => {
    AsyncStorage.setItem('@ScheduleTimer:Schedules', JSON.stringify(data)).catch((err) => {
      console.log(err)
    })
    setSchedules(data)
    setTheDateSchedules(getTheDateSchedules(data, theDate))
    setTheMonthSchedules(getTheMonthScehudules(data, theDate))
  }, [theDate])

  const updateSchedules = useCallback((type: string, schedule: iSchedule) => {
    AsyncStorage.getItem('@ScheduleTimer:Schedules').then((state)=> {
      if(state != null)
          return JSON.parse(state)
    }).then((data) => {      
      update(type, schedule, data != undefined? data : [])
    }).catch((err) => {
      console.log(err)
    })
  },[theDate])

  const update = useCallback((type: string, schedule: iSchedule, schedules: iSchedulesOfMonth[]) => {
    let newSchedules: iSchedulesOfMonth[]
    let theNewDate: iSchedulesOfDate
    let theNewMonth: iSchedulesOfMonth

    const monthSchedules = getTheMonthScehudules(schedules, theMonth)
    const dateSchedules = getTheDateSchedules(schedules, theDate)

    if(monthSchedules != undefined){
      let newMonthScheduleList: iSchedulesOfDate[]
      if(dateSchedules != undefined){
        const oldDateScheduleList = dateSchedules.scheduleOfDate
        let newDateScheduleList: iSchedule[]

        if(type == "insert")
          newDateScheduleList = [...oldDateScheduleList, schedule]
        else if(type == "remove")
          newDateScheduleList = oldDateScheduleList.filter(sch => sch.index !== schedule.index)
        else{  // "modify"  
          newDateScheduleList = oldDateScheduleList.map(sch => sch.index == schedule.index? schedule : sch)
        }
        theNewDate = updateScheduleOfDate(dateSchedules, newDateScheduleList)
        newMonthScheduleList = monthSchedules.schedulesOfMonth.map(oldDate => oldDate.date == theNewDate.date? theNewDate : oldDate)
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
    saveData(newSchedules)
  }, [theDate, schedules])

  return (
    <DateProvider today={today} theDate={theDate} theMonth={theMonth} updateTheDate={updateTheDate} updateTheMonth={updateTheMonth}>
      <SchedulesProvider schedules={schedules} updateSchedules={updateSchedules} theMonthSchedules={theMonthSchedules} theDateSchedules={theDateSchedules}>
        <NavigationContainer>
          <Navigator/>
        </NavigationContainer>
      </SchedulesProvider>
    </DateProvider>
  )
}