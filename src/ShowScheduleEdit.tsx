import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { Colors } from 'react-native-paper'
import { styles } from './styles'
import { iSchedule } from './typeDeclare'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconCheck from 'react-native-vector-icons/Feather'
import { getTimeSetting } from './function/schedule'

export type parentType = {
    schedule: iSchedule,
    updateSchedule: (schedule: iSchedule) => void
}

const ShowScheduleEidt: FC<parentType> = ({schedule, updateSchedule}) => {
    const getIcon = () => {
        if(schedule.index != -1)
            return <Icon name="calendar-minus" size={32} color={Colors.black} onPress={() => {updateSchedule(schedule)}}/>
        return <Icon name="calendar-plus" size={32} color={Colors.black} onPress={() => {updateSchedule(schedule)}}/>
    }

    return (
        <View style={[styles.textIconView, styles.scheduleBoundary]}>
            <View style={[styles.iconTextView]}>
                <IconCheck name={schedule.checkIcon} size={25} color={Colors.black}/>
                <Text style={styles.daysScheduleText}>{schedule.name} {getTimeSetting(schedule)}</Text>
            </View>
            {getIcon()}
        </View>
    )
}

export default ShowScheduleEidt