import React, { FC, useCallback } from 'react'
import { View, TouchableOpacity } from 'react-native'
import IconCheck from 'react-native-vector-icons/Feather'
import IconTimer from 'react-native-vector-icons/MaterialIcons'
import IconTimerSand from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles } from './styles'
import { Text } from "./theme"
import { iSchedule, iTimer } from './typeDeclare'
import { getTimeSetting, newTimer } from './function'

export type parentType = {
    tense: string,
    schedule: iSchedule,
    startTimer: (schedule: iSchedule) => void,
    stopTimer: (scheduel: iSchedule) => void,
    exitTimer: boolean,
    showScheduleIndex: number,
    setShowScheduleIndex: React.Dispatch<React.SetStateAction<number>>,
    setTimer: React.Dispatch<React.SetStateAction<iTimer>>
}

const ShowScheduleTimer: FC<parentType> = ({tense, schedule, startTimer, stopTimer, exitTimer, showScheduleIndex, setShowScheduleIndex, setTimer}) => {
    const Icon = useCallback(() => { 
        if (tense == "Today" && schedule.timerIcon == "timer")
            return <IconTimer name={schedule.timerIcon} size={32} color='black' onPress={() => {if(showScheduleIndex == -1) startTimer(schedule)}}/>
        else if(tense == "Today" && schedule.timerIcon == "timer-sand")
            return <IconTimerSand name={schedule.timerIcon} size={32} color='black' onPress={() => {stopTimer(schedule)}}/>
        return <IconTimer name="timer" size={32} color='white'/>
    }, [schedule, showScheduleIndex])

    const TouchableArea = useCallback(() => {
        const click = () => {
            setTimer(newTimer(schedule.remainTime))
            if(showScheduleIndex == schedule.index)
                setShowScheduleIndex(-1)
            else
                setShowScheduleIndex(schedule.index)
        }

        if(exitTimer)
            return (
                <TouchableOpacity style={{width: "83%", flexDirection: 'row'}} onPress={() => click()}>
                    <Text style={styles.daysScheduleText}>{schedule.name}</Text>
                    <Text style={[styles.daysScheduleText, {color: '#000033', fontSize: 20}]}>{getTimeSetting(schedule.planTime)}</Text>
                </TouchableOpacity>
            )
        else
            return (
                <View style={styles.flexRowBetween}>
                    <Text style={styles.daysScheduleText}>{schedule.name}</Text>
                    <Text style={[styles.daysScheduleText, {color: '#000033', fontSize: 20}]}>{getTimeSetting(schedule.planTime)}</Text>
                </View>
            )
    }, [schedule, showScheduleIndex])

    return (
        <View style={[styles.textIconView, styles.scheduleBoundary]}>
            <View style={[styles.iconTextView]}>
                <IconCheck name={schedule.isChecked? "check-square" : "square"} size={25} color='black' style={{marginTop: 2}}/>
                <TouchableArea/>
            </View>
            <Icon/>
        </View>
    )
}

export default ShowScheduleTimer