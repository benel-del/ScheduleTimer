import React, { useCallback, useState } from "react"
import { View, Text, Alert } from "react-native"
import { Colors } from "react-native-paper"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import { styles } from './styles'
import { getTense, getDayFormatting } from "./function/date"
import { getStatisticsOfDay } from './function/statistics'
import { newSchedule } from './function/schedule'
import ShowTimerMode from "./ShowTimerMode"
import ShowEditMode from "./ShowEditMode"

const iconSize = 40
const iconSize_mini = 25

export default function Days() {
    const [isEditMode, setIsEditMode] = useState(false)
    const [isTimerStop, setIsTimerStop] = useState(true)
    const [date, setDate] = useState(new Date())
    
    let tense = getTense(date)

    const [schedules, setSchedules] = useState([
        newSchedule(date, "뇌행", 0, 1),
        newSchedule(date, "컴특", 0, 1),
        newSchedule(date, "테테", 0, 1),
        newSchedule(date, "모소 기획서", 0, 1),
        newSchedule(new Date(date.getFullYear(), date.getMonth(), date.getDate()+1), "테스트", 0, 2)
    ])

    const todaySchedules = schedules.filter(sch => sch.date == getDayFormatting(date))
    let statistics = getStatisticsOfDay(todaySchedules)

    const beforePage = useCallback(() => {
        if(isEditMode)
            Alert.alert("경고", "편집 모드입니다.")
        else if(!isTimerStop)
            Alert.alert("경고", "타이머가 돌아가고 있습니다.")
        else{
            setDate((date: Date) => {
                return new Date(date.getFullYear(), date.getMonth(), date.getDate()-1)
            })
            tense = getTense(date)
        }
    }, [isEditMode, isTimerStop])

    const nextPage = useCallback(() => {
        if(isEditMode)
            Alert.alert("경고", "편집 모드입니다.")
        else if(!isTimerStop)
            Alert.alert("경고", "타이머가 돌아가고 있습니다.")
        else{
            setDate((date: Date) => {
                return new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)
            })
            tense = getTense(date)
        }
    }, [isEditMode, isTimerStop])

    let showContent = <ShowTimerMode tense={tense} setIsTimerStop={setIsTimerStop} setIsEditMode={setIsEditMode} schedules={schedules} setSchedules={setSchedules} date={date}/>
    if(isEditMode)
        showContent = <ShowEditMode setIsEditMode={setIsEditMode} schedules={schedules} setSchedules={setSchedules} date={date}/>
    
    return (
        <View style={styles.container}>
            <View style={[styles.topView, styles.flexRowBetween]}>
                <Icon3 name="navigate-before" size={iconSize} color={Colors.white} onPress={beforePage}/>
                <Text style={[styles.topText, styles.alignCenter]}>{getDayFormatting(date)}</Text>
                <Icon3 name="navigate-next" size={iconSize} color={Colors.white} onPress={nextPage}/>
            </View>
            
            {showContent}

            <View style={[styles.statisticsView, styles.flexRowCenter, styles.topBoundary]}>
                <View style={[styles.statisticsInnerView, styles.statisticsLeftBoundary]}>
                    <View style={[styles.iconTextView]}>
                        <Icon name="calendar-clock" size={iconSize_mini} color={Colors.black}/>
                        <Text style={[styles.homeStatisticsContentText, styles.alignCenter]}>{statistics[0]}</Text>
                    </View>
                </View>
                <View style={[styles.statisticsInnerView, styles.flexRowCenter, styles.statisticsRightBoundary]}>
                    <View style={styles.iconTextView}>
                        <Icon name="gauge" size={iconSize_mini} color={Colors.black}/>
                        <Text style={[styles.homeStatisticsContentText, styles.alignCenter]}>{statistics[1]}% 달성</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}