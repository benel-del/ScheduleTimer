import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles } from './styles'
import { TextBold } from "./theme"
import { iSchedule } from './typeDeclare'
import ShowInputForm from './ShowInputForm'
import ShowScheduleEdit from './ShowScheduleEdit'
import { useScheduleContext } from './provider'
import { newTempSchedule, getTimeSetting } from './function'

export type parentType = {
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}

const iconSize = 40

const ShowEditMode: FC<parentType> = ({setIsEditMode}) => {
    const {updateSchedules, theDateSchedules} = useScheduleContext()
    const [modalVisible, setModalVisible] = useState(false)
    const focused = useIsFocused()

    useEffect(()=>{
        if(!focused)
            setIsEditMode(false)
    }), [focused];

    const insertSchedule = useCallback((schedule: iSchedule) => {
        setModalVisible(true)
    }, [])

    const removeSchedule = useCallback((schedule: iSchedule) => {
        const info = schedule.name + " " + getTimeSetting(schedule.planTime)
        Alert.alert(info, " 계획을 삭제하겠습니까?", [
            {text: "취소", onPress: () => {}},
            {text: "삭제", onPress: () => {updateSchedules("remove", schedule)}}
        ])
    }, [theDateSchedules])

    let scheduleList
    if(theDateSchedules != undefined){
        scheduleList = theDateSchedules.scheduleOfDate.map((schedule, index) => {
            return <ShowScheduleEdit schedule={schedule} updateSchedule={removeSchedule} key={index}/>
        })
        scheduleList.push(<ShowScheduleEdit schedule={newTempSchedule()} updateSchedule={insertSchedule} key={scheduleList.length}/>)
    } 
    else
        scheduleList = <ShowScheduleEdit schedule={newTempSchedule()} updateSchedule={insertSchedule} key={-1}/>

    return (
        <View style={styles.contentView}>
            <View style={[styles.daysTitleView, styles.textIconView]}>
                <View style={styles.iconTextView}>
                    <Icon name="calendar-today" size={iconSize} color='black'/>
                    <TextBold style={styles.daysTitleText}>계획 편집</TextBold>
                </View>
                <Icon name="calendar-check" size={iconSize} color='black' onPress={() => {setIsEditMode(false)}}/>
            </View>
            <View style={styles.daysContentView}>
                <ScrollView style={[styles.daysScrollView, styles.alignCenter, styles.topBoundary]} horizontal={false}>
                    {scheduleList}
                </ScrollView>
            </View>
            <View>
                <ShowInputForm modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            </View>
        </View>
    )
}

export default ShowEditMode