import React, { FC, useCallback } from 'react'
import { View } from 'react-native'
import IconCheck from 'react-native-vector-icons/Feather'
import IconTimer from 'react-native-vector-icons/MaterialIcons'
import IconTimerSand from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles } from './styles'
import { Text } from "./theme/Text"
import { iSchedule } from './typeDeclare'
import { getTimeSetting } from './function'

export type parentType = {
    tense: string,
    schedule: iSchedule,
    startTimer: (schedule: iSchedule) => void,
    stopTimer: (scheduel: iSchedule) => void
}

const ShowScheduleTimer: FC<parentType> = ({tense, schedule, startTimer, stopTimer}) => {
    const Icon = useCallback(() => { 
        if (tense == "Today" && schedule.timerIcon == "timer")
            return <IconTimer name={schedule.timerIcon} size={32} color='black' onPress={() => {startTimer(schedule)}}/>
        else if(tense == "Today" && schedule.timerIcon == "timer-sand")
            return <IconTimerSand name={schedule.timerIcon} size={32} color='black' onPress={() => {stopTimer(schedule)}}/>
        return <IconTimer name="timer" size={32} color='white'/>
    }, [schedule])

    return (
        <View style={[styles.textIconView, styles.scheduleBoundary]}>
            <View style={[styles.iconTextView]}>
                <IconCheck name={schedule.checkIcon} size={25} color='black' style={{marginTop: 2}}/>
                <Text style={styles.daysScheduleText}>{schedule.name} {getTimeSetting(schedule)}</Text>
            </View>
            <Icon/>
        </View>
    )
}

export default ShowScheduleTimer