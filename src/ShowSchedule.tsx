import React, { Dispatch, FC, SetStateAction, useState, useCallback, useRef } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { styles } from './styles'
import { iSchedule, iTimer } from './typeDeclare'
import { newSchedule, setTimerIcon, setTimeRemaining, setTimeOver, newTempSchedule } from './function/schedule'
import { initTimer, isTimerInit, newTimer } from './function/timer'
import ShowScheduleTimer from './ShowScheduleTimer'
import ShowScheduleEdit from './ShowScheduleEdit'
import ShowTimer from './ShowTimer'
import { getStatisticsOfDay } from './function/statistics'

export type parentType = {
    setIsTimerStop: Dispatch<SetStateAction<boolean>>,
    date: Date,
    updateStatistics: Dispatch<SetStateAction<(string | number)[]>>,
    isEditMode: boolean
}

let tmStop = false
let exitTimer = true
const ShowSchedule: FC<parentType> = ({setIsTimerStop, date, updateStatistics, isEditMode}) => {
    let newSch = newTempSchedule()
    const [timer, setTimer] = useState(initTimer())
    const [schedules, setSchedules] = useState([
        newSchedule(date, "뇌행", 0, 2),
        newSchedule(date, "컴특", 0, 1),
        newSchedule(date, "모소 기획서", 3, 0)
    ])

    const startTimer = (schedule:iSchedule) => {
        if(exitTimer){
            newSch = setTimerIcon(schedule, "timer-sand")
            setSchedules(
                schedules.map(sch => sch.index == schedule.index? newSch: sch)
            )
            tmStop = false
            exitTimer = false
            setIsTimerStop(exitTimer)
            setTimer(newTimer(newSch.timeRemaining))
            countDown()
        }
        else{
            Alert.alert("경고", "다른 타이머가 돌아가고 있습니다.")
        }
    }

    const stopTimer = (schedule:iSchedule) => {
        tmStop = true
        newSch = schedule
        Alert.alert("타이머를 종료하겠습니까?", "", [
            {text: "종료", onPress: () => {exitTimer = true, setIsTimerStop(exitTimer)}},
            {text: "취소", onPress: () => {tmStop = false}}
        ])
    }

    const countDown = () => {
        let time = newSch.timeRemaining
        const start = setInterval(() => {
            if(time < 0){
                exitTimer = true
                setIsTimerStop(exitTimer)
                stop(setTimeOver(newSch))
            }
            else if(exitTimer)
                stop(setTimeRemaining(setTimerIcon(newSch, "timer"), time))              
            else if(!tmStop){
                time -= 1
                setTimer(newTimer(time))                
            }
             
        }, 1000)

        const stop = (newSch: iSchedule) => {
            clearInterval(start)
            setSchedules(
                schedules.map(sch => sch.index == newSch.index? newSch: sch)
            )
            //updateStatistics(getStatisticsOfDay(schedules))
            setTimer(initTimer())
        }
    }

    let scheduleList
    if(!isEditMode)
        scheduleList = schedules.map((schedule, index) => {
            return <ShowScheduleTimer schedule={schedule} startTimer={startTimer} stopTimer={stopTimer} key={index}/>
        })
    else
        scheduleList = schedules.map((schedule, index) => {
            return <ShowScheduleEdit schedule={schedule} startTimer={startTimer} stopTimer={stopTimer} key={index}/>   // TODO
        })
    
    let timerView
    if(exitTimer)
        timerView = null
    else
        timerView = <ShowTimer timer={timer}></ShowTimer>

    return (
        <View style={styles.daysContentView}>
            <ScrollView style={[styles.daysScrollView, styles.alignCenter, styles.topBoundary]} horizontal={false}>
                {scheduleList}
            </ScrollView>
            {timerView}
        </View>
    )
}

export default ShowSchedule