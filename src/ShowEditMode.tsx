import React, { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { View, ScrollView, Alert, Text } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from './styles'
import { iSchedule } from './typeDeclare'
import { newTempSchedule, getTimeSetting } from './function/schedule'
import { getDayFormatting } from './function/date'
import ShowScheduleEdit from './ShowScheduleEdit'
import ShowInputForm from './ShowInputForm'

export type parentType = {
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    schedules: iSchedule[],
    setSchedules: Dispatch<SetStateAction<iSchedule[]>>,
    date: Date
}

const iconSize = 40

const ShowEditMode: FC<parentType> = ({setIsEditMode, schedules, setSchedules, date}) => {
    let todaySchedules = schedules.filter(sch => sch.date == getDayFormatting(date))
    const [modalVisible, setModalVisible] = useState(false)

    const insertSchedule = (schedule: iSchedule) => {
        //Alert.alert("계획을 추가하겠습니까?", "")
        setModalVisible(true)
    }

    const removeSchedule = useCallback((schedule: iSchedule) => {
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
    }, [todaySchedules])

    let scheduleList = todaySchedules.map((schedule, index) => {
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
            
            <View>
                <ShowInputForm modalVisible={modalVisible} setModalVisible={setModalVisible} schedules={schedules} setSchedules={setSchedules} date={date}/>
            </View>
        </View>
    )
}

export default ShowEditMode