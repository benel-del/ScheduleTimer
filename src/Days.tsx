import React, { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { View, Text, Alert, ScrollView } from "react-native"
import { Colors } from "react-native-paper"
import { styles } from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import { getTense, getDayFormatting } from "./function/date"
import { getStatisticsOfDay } from './function/statistics'
import { newSchedule } from './function/schedule'
import ShowSchedule from "./ShowSchedule"

const iconSize = 40
const iconSize_mini = 21

export default function Days() {
    let isEditMode = false
    const [isTimerStop, setIsTimerStop] = useState(true)
    const [date, setDate] = useState(new Date())
    
    let tense = getTense(date)

    const [schedules, setSchedules] = useState([
        newSchedule(date, "뇌행", 0, 1),
        newSchedule(date, "컴특", 0, 1),
        newSchedule(date, "테테", 0, 1),
        newSchedule(date, "모소 기획서", 0, 1)
    ])

    let statistics = getStatisticsOfDay(schedules)

    const beforePage = useCallback(() => {
        if(isTimerStop){
            setDate((date: Date) => {
                return new Date(date.getFullYear(), date.getMonth(), date.getDate()-1)
            })
            tense = getTense(date)
        }
        else
            Alert.alert("경고", "타이머가 돌아가고 있습니다.")
        
    }, [isTimerStop])
    const nextPage = useCallback(() => {
        if(isTimerStop){
            setDate((date: Date) => {
                return new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)
            })
            tense = getTense(date)
        }
        else
            Alert.alert("경고", "타이머가 돌아가고 있습니다.")
    }, [isTimerStop])

    const startEdit = useCallback(() => {
        if(isTimerStop){
            Alert.alert(tense + ", " + date);
            isEditMode = true
        }
        else
            Alert.alert("경고", "타이머가 돌아가고 있습니다.")
    }, [isTimerStop, date])

    const stopEdit = () => {

    }

    let editIcon = <Icon name="calendar-edit" size={iconSize} color={Colors.black} onPress={startEdit}/>
    if(tense == "Past" || !isTimerStop)
        editIcon = <Icon name="calendar-edit" size={iconSize} color={Colors.white}/>
    else if(isEditMode)
        editIcon = <Icon name="calendar-check" size={iconSize} color={Colors.black} onPress={stopEdit}/>

    return (
        <View style={styles.container}>
            <View style={[styles.topView, styles.flexRowBetween]}>
                <Icon3 name="navigate-before" size={iconSize} color={Colors.white} onPress={beforePage}/>
                <Text style={[styles.topText, styles.alignCenter]}>{getDayFormatting(date)}</Text>
                <Icon3 name="navigate-next" size={iconSize} color={Colors.white} onPress={nextPage}/>
            </View>
            <View style={[styles.daysTitleView, styles.textIconView]}>
                <View style={styles.iconTextView}>
                    <Icon name="calendar-today" size={iconSize} color={Colors.black}/>
                    <Text style={styles.daysTitleText}>계획</Text>
                </View>
                {editIcon}
            </View>
            
            <ShowSchedule setIsTimerStop={setIsTimerStop} isEditMode={isEditMode} schedules={schedules} setSchedules={setSchedules}/>

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