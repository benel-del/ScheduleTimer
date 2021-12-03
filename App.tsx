import React, { useCallback, useLayoutEffect, useState } from "react";
import Navigator from "./Navigator";
import AsyncStorage from "@react-native-community/async-storage"
import { NavigationContainer } from "@react-navigation/native";
import { iSchedule, iSchedulesOfDate, iSchedulesOfMonth } from "./src/typeDeclare"
import { SchedulesProvider, TodayDateProvider } from "./src/provider";
import { getDateForm, getTheDateSchedules, getTheMonthScehudules, newSchedulesOfDate, newSchedulesofMonth, updateScheduleOfDate, updateScheduleOfMonth } from "./src/function";

export default function App(){
  const [today, setToday] = useState(new Date())
  const [theDate, setTheDate] = useState(today)
  const [theMonth, setTheMonth] = useState(today)
  const [schedules, setSchedules] = useState<iSchedulesOfMonth[]>([])
  const [theDateSchedules, setTheDateSchedules] = useState<iSchedulesOfDate | undefined>()
  const [theMonthSchedules, setTheMonthSchedules] = useState<iSchedulesOfMonth | undefined>()

  useLayoutEffect(() => {
    //AsyncStorage.clear()
    AsyncStorage.getItem('@StudyTimer:Schedules').then((state)=> {
      if(state != null){
        const data:iSchedulesOfMonth[] = JSON.parse(state)
        setSchedules(data)
        setTheDateSchedules(getTheDateSchedules(data, theDate))
        setTheMonthSchedules(getTheMonthScehudules(data, theDate))
      }
    })
  }, [])

  const updateTheDate = useCallback((type: string | Date) => {
    if(typeof(type) == "string")
      type = new Date(theDate.getFullYear(), theDate.getMonth(), theDate.getDate() + (type == "before" ? -1 : 1))
    setTheDate(type)
    setTheMonth(type)
    setTheDateSchedules(getTheDateSchedules(schedules, type))
    setTheMonthSchedules(getTheMonthScehudules(schedules, type))
  }, [theDate, schedules])

  const updateTheMonth = useCallback((type: string | Date) => {
    if(typeof(type) == "string")
      type = new Date(theMonth.getFullYear(), theMonth.getMonth() + (type == "before" ? -1 : 1))
    setTheMonth(type)
    setTheMonthSchedules(getTheMonthScehudules(schedules, type))
  }, [theMonth, schedules])

  const saveData = useCallback((data: iSchedulesOfMonth[]) => {
    AsyncStorage.setItem('@StudyTimer:Schedules', JSON.stringify(data))
    setSchedules(data)
    setTheDateSchedules(getTheDateSchedules(data, theDate))
    setTheMonthSchedules(getTheMonthScehudules(data, theDate))
  }, [theDate])

  const updateSchedules = useCallback((type: string, schedule: iSchedule) => {
    AsyncStorage.getItem('@StudyTimer:Schedules').then((state)=> {
      if(state != null)
          return JSON.parse(state)
    }).then((data) => {      
      update(type, schedule, data != undefined? data : [])
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