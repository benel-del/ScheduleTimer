import React, { FC, useCallback } from 'react'
import { View } from 'react-native'
import IconCheck from 'react-native-vector-icons/Feather'
import IconEdit from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles } from './styles'
import { Text } from "./theme/Text"
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
                <IconCheck name={schedule.checkIcon} size={25} color='black'/>
                <Text style={styles.daysScheduleText}>{schedule.name} {getTimeSetting(schedule)}</Text>
            </View>
            <Icon />
        </View>
    )
}

export default ShowScheduleEidt