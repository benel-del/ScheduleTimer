import React, { FC, useCallback } from 'react'
import { View, Text } from 'react-native'
import { Colors } from 'react-native-paper'
import IconCheck from 'react-native-vector-icons/Feather'
import IconTimer from 'react-native-vector-icons/MaterialIcons'
import IconTimerSand from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles } from './styles'
import { iSchedule } from './typeDeclare'
import { getTenseByString } from './function/date'
import { getTimeSetting } from './function/schedule'

export type parentType = {
    schedule: iSchedule,
    startTimer: (schedule: iSchedule) => void,
    stopTimer: (scheduel: iSchedule) => void
}

const ShowScheduleTimer: FC<parentType> = ({schedule, startTimer, stopTimer}) => {
    const getIcon = (schedule: iSchedule) => { 
        const tense = getTenseByString(schedule.date)
        if (tense == "Today" && schedule.timerIcon == "timer")
            return <IconTimer name={schedule.timerIcon} size={32} color={Colors.black} onPress={() => {startTimer(schedule)}}/>
        else if(tense == "Today" && schedule.timerIcon == "timer-sand")
            return <IconTimerSand name={schedule.timerIcon} size={32} color={Colors.black} onPress={() => {stopTimer(schedule)}}/>
        return <IconTimer name="timer" size={32} color={Colors.white}/>
    }

    return (
        <View style={[styles.textIconView, styles.scheduleBoundary]}>
            <View style={[styles.iconTextView]}>
                <IconCheck name={schedule.checkIcon} size={25} color={Colors.black}/>
                <Text style={styles.daysScheduleText}>{schedule.name} {getTimeSetting(schedule)}</Text>
            </View>
            {getIcon(schedule)}
        </View>
    )
}

export default ShowScheduleTimer