import React, { Dispatch, FC, SetStateAction, useState, useCallback } from 'react'
import { ScrollView, Alert } from 'react-native'
import { styles } from './styles'
import { iSchedule, iTimer } from './typeDeclare'
import { newSchedule, setTimerIcon, setTimeRemaining } from './function/schedule'
import { initTimer, newTimer } from './function/timer'
import ShowScheduleTimer from './ShowScheduleTimer'

export type parentType = {
    date: Date,
    timer: iTimer,
    setTimer: Dispatch<SetStateAction<iTimer>>
}

const ShowSchedule: FC<parentType> = ({date, timer, setTimer}) => {
    const [schedules, setSchedules] = useState([
        newSchedule(date, "뇌행", 1, 20),
        newSchedule(date, "컴특", 1, 20),
        newSchedule(date, "모소 기획서", 3, 0)
    ])

    const startTimer = useCallback((schedule:iSchedule) => {
        Alert.alert("타이머를 시작합니다.")
        setSchedules(
            schedules.map(sch => sch.index == schedule.index? setTimerIcon(schedule, "timer-sand"): sch)
        )
        setTimer(newTimer(schedule.timeRemaining))
    }, [timer])

    const stopTimer = useCallback((schedule:iSchedule) => {
        Alert.alert("타이머를 종료하겠습니까?", "", [
            {text: "종료", onPress: () => {stop(schedule)}},
            {text: "취소", onPress: () => {}}
        ])
    }, [])

    const stop = useCallback((schedule: iSchedule) => {
        const time = timer.hour * 3600 + timer.minute * 60 + timer.second
        setSchedules(
            schedules.map(sch => sch.index == schedule.index? setTimeRemaining(setTimerIcon(schedule, "timer"), time): sch)
        )
        setTimer(initTimer())
    }, [])

    const scheduleList = schedules.map((schedule, index) => {
        return <ShowScheduleTimer schedule={schedule} startTimer={startTimer} stopTimer={stopTimer} key={index}/>
    })

    return (
        <ScrollView style={[styles.daysScrollView, styles.alignCenter, styles.topBoundary]} horizontal={false}>
            {scheduleList}
        </ScrollView>
    )
}

export default ShowSchedule