import React, { useCallback } from "react"
import { Text, View } from "react-native"
import IconArrow from 'react-native-vector-icons/MaterialIcons'
import IconStatistics from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles } from './styles'
import ShowMonthTable from "./ShowMonthTable"
import { useScheduleContext, useTodayDateContext } from "./provider"
import { getMonthForm, getStatisticsFormat } from "./function"

const iconSize = 40
const iconSize_mini = 25

export default function Monthly() {
    const {theMonth, updateTheMonth} = useTodayDateContext()
    const {theMonthSchedules} = useScheduleContext()
    const theMonthString = getMonthForm(theMonth)
    const statisticsOfMonth = getStatisticsFormat(theMonthSchedules?.statisticsOfMonth)

    const changeMonth = useCallback((type: string) => {
        updateTheMonth(type)
    }, [theMonth])

    return(
        <View>
            <View style={[styles.topView, styles.flexRowBetween]}>
                <IconArrow name="navigate-before" size={iconSize} color='white' onPress={() => changeMonth("before")}/>
                <Text style={[styles.topText, styles.alignCenter]}>{theMonthString}</Text>
                <IconArrow name="navigate-next" size={iconSize} color='white' onPress={() => changeMonth("after")}/>
            </View>
            <View style={styles.container}>
                <ShowMonthTable/>
                <View style={[styles.statisticsView, styles.flexRowCenter, styles.topBoundary]}>
                    <View style={[styles.statisticsInnerView, styles.statisticsLeftBoundary]}>
                        <View style={[styles.iconTextView]}>
                            <IconStatistics name="calendar-clock" size={iconSize_mini} color='black'/>
                            <Text style={[styles.statisticsContentText, styles.alignCenter]}>{statisticsOfMonth[0]}</Text>
                        </View>
                    </View>
                    <View style={[styles.statisticsInnerView, styles.flexRowCenter, styles.statisticsRightBoundary]}>
                        <View style={styles.iconTextView}>
                            <IconStatistics name="gauge" size={iconSize_mini} color='black'/>
                            <Text style={[styles.statisticsContentText, styles.alignCenter]}>{statisticsOfMonth[1]}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}