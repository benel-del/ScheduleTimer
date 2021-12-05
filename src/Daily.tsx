import React, { useCallback, useState } from "react"
import { View, Text, ToastAndroid } from "react-native"
import IconArrow from 'react-native-vector-icons/MaterialIcons'
import IconStatistics from 'react-native-vector-icons/MaterialCommunityIcons'
import DateTimePicker from "@react-native-community/datetimepicker"

import { styles } from './styles'
import { getTense, getStatisticsFormat, getDateForm } from "./function"
import ShowEditMode from "./ShowEditMode"
import ShowTimerMode from "./ShowTimerMode"
import { useScheduleContext, useTodayDateContext } from "./provider"

const iconSize = 40
const iconSize_mini = 25

export default function Daily() {
    const [isEditMode, setIsEditMode] = useState(false)
    const [isTimerStop, setIsTimerStop] = useState(true)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const {theDate, updateTheDate} = useTodayDateContext()
    const {theDateSchedules} = useScheduleContext()
    const statisticsOfDate = getStatisticsFormat(theDateSchedules?.statisticsOfDate)

    let tense = getTense(theDate)
    const changeDate = useCallback((type: string) => {
        if(isEditMode)
            ToastAndroid.show("편집모드에서 날짜를 이동할 수 없습니다.", ToastAndroid.SHORT)
        else if(!isTimerStop)
            ToastAndroid.show("타이머가 돌아가고 있습니다.", ToastAndroid.LONG)
        else{
            updateTheDate(type)
            tense = getTense(theDate)
        }
    }, [isEditMode, isTimerStop, theDate])

    const onChange = useCallback((event: Event, date: Date) => {
        setIsCalendarOpen(false)
        if(date != undefined)
            updateTheDate(date)
    }, [])

    return (
        <View>
            <View style={[styles.topView, styles.flexRowBetween]}>
                <IconArrow name="navigate-before" size={iconSize} color='white' onPress={() => changeDate("before")}/>
                <Text style={[styles.topText, styles.alignCenter]} onPress={() => setIsCalendarOpen(true)}>   {getDateForm(theDate).split(' ')[0]} =</Text>
                {isCalendarOpen && <DateTimePicker value={theDate} mode="date" display="calendar" onChange={onChange}/>}
                <IconArrow name="navigate-next" size={iconSize} color='white' onPress={() => changeDate("after")}/>
            </View>
            <View style={styles.container}>
                {isEditMode && <ShowEditMode setIsEditMode={setIsEditMode}/>}
                {!isEditMode && <ShowTimerMode tense={tense} setIsTimerStop={setIsTimerStop} setIsEditMode={setIsEditMode}/>}
                <View style={[styles.statisticsView, styles.flexRowCenter, styles.topBoundary]}>
                    <View style={[styles.statisticsInnerView, styles.statisticsLeftBoundary]}>
                        <View style={[styles.iconTextView]}>
                            <IconStatistics name="calendar-clock" size={iconSize_mini} color='black'/>
                            <Text style={[styles.homeStatisticsContentText, styles.alignCenter]}>{statisticsOfDate[0]}</Text>
                        </View>
                    </View>
                    <View style={[styles.statisticsInnerView, styles.flexRowCenter, styles.statisticsRightBoundary]}>
                        <View style={styles.iconTextView}>
                            <IconStatistics name="gauge" size={iconSize_mini} color='black'/>
                            <Text style={[styles.homeStatisticsContentText, styles.alignCenter]}>{statisticsOfDate[1]}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}