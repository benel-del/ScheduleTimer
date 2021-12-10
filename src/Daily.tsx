import React, { useCallback, useState } from "react"
import { View, ToastAndroid, SafeAreaView } from "react-native"
import IconArrow from 'react-native-vector-icons/MaterialIcons'
import IconStatistics from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles } from './styles'
import { Text } from "./theme"
import { getTense, getStatisticsFormat, getDateFormat } from "./function"
import ShowEditMode from "./ShowEditMode"
import ShowTimerMode from "./ShowTimerMode"
import { useScheduleContext, useDateContext } from "./provider"

const iconSize = 40
const iconSize_mini = 25

export default function Daily() {
    const [isEditMode, setIsEditMode] = useState(false)
    const [isTimerStop, setIsTimerStop] = useState(true)
    const {today, theDate, updateTheDate} = useDateContext()
    const {theDateSchedules} = useScheduleContext()
    const statisticsOfDate = getStatisticsFormat(theDateSchedules?.statisticsOfDate)

    let tense = getTense(theDate, today)
    const changeDate = useCallback((type: string) => {
        if(isEditMode)
            ToastAndroid.show("편집모드에서 날짜를 이동할 수 없습니다.", ToastAndroid.SHORT)
        else if(!isTimerStop)
            ToastAndroid.show("타이머 동작 중에 날짜를 이동할 수 없습니다.", ToastAndroid.LONG)
        else
            updateTheDate(type)
    }, [isEditMode, isTimerStop, theDate])

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={[styles.topView, styles.flexRowBetween]}>
                <IconArrow name="navigate-before" size={iconSize} color='white' onPress={() => changeDate("before")}/>
                <Text style={[styles.topText, styles.alignCenter]}>{getDateFormat(theDate).split(' ')[0]}</Text>
                <IconArrow name="navigate-next" size={iconSize} color='white' onPress={() => changeDate("after")}/>
            </View>
            <View style={styles.container}>
                {isEditMode && <ShowEditMode setIsEditMode={setIsEditMode}/>}
                {!isEditMode && <ShowTimerMode tense={tense} setIsTimerStop={setIsTimerStop} setIsEditMode={setIsEditMode}/>}
                <View style={[styles.statisticsView, styles.flexRowCenter, styles.topBoundary]}>
                    <View style={[styles.statisticsInnerView, styles.flexRowCenter, styles.statisticsLeftBoundary]}>
                        <View style={styles.iconTextView}>
                            <IconStatistics name="calendar-clock" size={iconSize_mini} color='black'/>
                            <Text style={styles.statisticsContentText}>{statisticsOfDate[0]}</Text>
                        </View>
                    </View>
                    <View style={[styles.statisticsInnerView, styles.flexRowCenter]}>
                        <View style={styles.iconTextView}>
                            <IconStatistics name="gauge" size={iconSize_mini} color='black'/>
                            <Text style={styles.statisticsContentText}>{statisticsOfDate[1]}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}