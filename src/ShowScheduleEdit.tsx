import React, { FC, useCallback } from 'react'
import { View } from 'react-native'
import IconCheck from 'react-native-vector-icons/Feather'
import IconEdit from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles } from './styles'
import { Text } from "./theme"
import { iSchedule } from './typeDeclare'
import { getTimeSetting } from './function'

export type parentType = {
    schedule: iSchedule,
    updateSchedule: (schedule: iSchedule) => void
}

const ShowScheduleEidt: FC<parentType> = ({schedule, updateSchedule}) => {
    const Icon = useCallback(() => {
        if(schedule.index != -1)
            return <IconEdit name="calendar-minus" size={32} color='black' onPress={() => {updateSchedule(schedule)}}/>
        return <IconEdit name="calendar-plus" size={32} color='black' onPress={() => {updateSchedule(schedule)}}/>
    }, [schedule])

    return (
        <View style={[styles.textIconView, styles.scheduleBoundary]}>
            <View style={[styles.iconTextView]}>
                <IconCheck name={schedule.isChecked? "check-square" : "square"} size={25} color='black' style={{marginTop: 2}}/>
                <View style={styles.flexRowBetween}>
                    <Text style={styles.daysScheduleText}>{schedule.name}</Text>
                    <Text style={[styles.daysScheduleText, {color: '#000033', fontSize: 20}]}>{getTimeSetting(schedule.planTime)}</Text>
                </View>
            </View>
            <Icon />
        </View>
    )
}

export default ShowScheduleEidt