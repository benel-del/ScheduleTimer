import React, { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { Colors, shadow } from 'react-native-paper'
import IconCheck from 'react-native-vector-icons/Feather'
import IconTimer from 'react-native-vector-icons/MaterialIcons'
import IconTimerSand from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from './styles'
import { iSchedule } from '../type/schedule'
import getTense from './function/getTense'
import { iTimer } from '../type/timer'

export type schType = {
    schedule: iSchedule,
    setSchedule: Dispatch<SetStateAction<iSchedule>>,
    timer: iTimer,
    setTimer: Dispatch<SetStateAction<iTimer>>
}

const initTimer: iTimer = {
    hour: 0,
    minute: 0,
    second: 0
}

const ShowScheduleTimer: FC<schType> = ({schedule, setSchedule, timer, setTimer}) => {
    const startTimer = useCallback(() => {
        if(timer.hour == initTimer.hour && timer.minute == initTimer.minute && timer.second == initTimer.second){
            Alert.alert("타이머를 시작합니다.")
            setSchedule(() => {
                const sch: iSchedule = {
                    date: schedule.date,
                    name: schedule.name,
                    timeSetting: schedule.timeSetting,
                    timeRemaining: schedule.timeRemaining,
                    timerIcon: "timer-sand",
                    isChecked: schedule.isChecked,
                    checkIcon: schedule.checkIcon
                }
                return sch
            })
            setTimer(() => {
                const timeSetting = schedule.timeRemaining
                const tm: iTimer = {
                    hour: Math.floor(timeSetting / 3600),
                    minute: Math.floor(timeSetting / 60) % 60,
                    second: timeSetting % 60
                }
                return tm
            })
        }
        else
            Alert.alert("다른 타이머가 돌아가고 있습니다.")
    }, [timer])

    const stopTimer = useCallback(() => {
        setSchedule((schedule: iSchedule) => {
            const sch:iSchedule = {
                date: schedule.date,
                name: schedule.name,
                timeSetting: schedule.timeSetting,
                timeRemaining: timer.hour * 3600 + timer.minute * 60 + timer.second,
                timerIcon: "timer",
                isChecked: schedule.isChecked,
                checkIcon: schedule.checkIcon
            }
            return sch
        })
        setTimer(initTimer)
    }, [])


    let tense = getTense(schedule.date)
    let icon = <IconTimer name="timer" size={32} color={Colors.white}/>
    if (tense == "Today" && schedule.timerIcon == "timer") {
        icon = <IconTimer name={schedule.timerIcon} size={32} color={Colors.black} onPress={startTimer}/>
    }
    else if(tense == "Today" && schedule.timerIcon == "timer-sand") {
        icon = <IconTimerSand name={schedule.timerIcon} size={32} color={Colors.black} onPress={stopTimer}/>
    }

    return (
        <View style={[styles.textIconView, styles.scheduleBoundary]}>
            <View style={[styles.iconTextView]}>
                <IconCheck name={schedule.checkIcon} size={25} color={Colors.black}/>
                <Text style={styles.daysScheduleText}>{schedule.name} {schedule.timeSetting}</Text>
            </View>
            {icon}
        </View>
    )
}

export default ShowScheduleTimer