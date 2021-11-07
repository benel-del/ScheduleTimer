import React, { Dispatch, FC, SetStateAction, useState, useCallback, useRef } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { styles } from './styles'
import { iSchedule } from './typeDeclare'
import { setTimerIcon, setTimeRemaining, setTimeOver, newTempSchedule } from './function/schedule'
import { initTimer, newTimer } from './function/timer'
import ShowScheduleTimer from './ShowScheduleTimer'
import ShowScheduleEdit from './ShowScheduleEdit'
import ShowTimer from './ShowTimer'

export type parentType = {
    setIsTimerStop: Dispatch<SetStateAction<boolean>>,
    isEditMode: boolean,
    schedules: iSchedule[],
    setSchedules: Dispatch<SetStateAction<iSchedule[]>>
}

let tmStop = false
let exitTimer = true
const ShowSchedule: FC<parentType> = ({setIsTimerStop, isEditMode, schedules, setSchedules}) => {
    let newSch = newTempSchedule()
    const [timer, setTimer] = useState(initTimer())

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
            if(time < 1){
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

        const stop = (schedule: iSchedule) => {
            clearInterval(start)
            setSchedules(
                schedules.map(sch => sch.index == schedule.index? schedule: sch)
            )
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