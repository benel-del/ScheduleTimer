import React, { Dispatch, FC, SetStateAction } from 'react'
import { View, ScrollView, Alert, Text } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from './styles'
import { iSchedule } from './typeDeclare'
import { newTempSchedule, newSchedule, getTimeSetting } from './function/schedule'
import ShowScheduleEdit from './ShowScheduleEdit'

export type parentType = {
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    schedules: iSchedule[],
    setSchedules: Dispatch<SetStateAction<iSchedule[]>>
}

const iconSize = 40

const ShowEditMode: FC<parentType> = ({setIsEditMode, schedules, setSchedules}) => {
    const insertSchedule = (schedule: iSchedule) => {
        Alert.alert("계획을 추가하겠습니까?", "")
        let newSch = newSchedule(new Date(), "추가", 0, 3)
        setSchedules([...schedules, newSch])
    }

    const removeSchedule = (schedule: iSchedule) => {
        const info = "[" + schedule.name + " " + getTimeSetting(schedule) + "]"
        Alert.alert(info + " 계획을 삭제하겠습니까?", "", [
            {text: "삭제", onPress: () => {remove()}},
            {text: "취소", onPress: () => {}}
        ])
        const remove = () => {
            setSchedules(
                schedules.filter(sch => sch.index !== schedule.index)
            )
        }
    }

    let scheduleList = schedules.map((schedule, index) => {
            return <ShowScheduleEdit schedule={schedule} updateSchedule={removeSchedule} key={index}/>
        })
        scheduleList.push(<ShowScheduleEdit schedule={newTempSchedule()} updateSchedule={insertSchedule} key={scheduleList.length}/>)

    return (
        <View>
            <View style={[styles.daysTitleView, styles.textIconView]}>
                <View style={styles.iconTextView}>
                    <Icon name="calendar-today" size={iconSize} color={Colors.black}/>
                    <Text style={styles.daysTitleText}>계획 편집</Text>
                </View>
                <Icon name="calendar-check" size={iconSize} color={Colors.black} onPress={() => {setIsEditMode(false)}}/>
            </View>
            <View style={styles.daysContentView}>
                <ScrollView style={[styles.daysScrollView, styles.alignCenter, styles.topBoundary]} horizontal={false}>
                    {scheduleList}
                </ScrollView>
            </View>
        </View>
    )
}

export default ShowEditMode