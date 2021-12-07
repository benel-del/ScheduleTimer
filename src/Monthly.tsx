import React, { useCallback } from "react"
import { View } from "react-native"
import IconArrow from 'react-native-vector-icons/MaterialIcons'
import IconStatistics from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles } from './styles'
import { Text } from "./theme/Text"
import ShowMonthTable from "./ShowMonthTable"
import { useScheduleContext, useDateContext } from "./provider"
import { getMonthForm, getStatisticsFormat } from "./function"

const iconSize = 40
const iconSize_mini = 25

export default function Monthly() {
    const {theMonth, updateTheMonth} = useDateContext()
    const {theMonthSchedules} = useScheduleContext()
    const statisticsOfMonth = getStatisticsFormat(theMonthSchedules?.statisticsOfMonth)

    const changeMonth = useCallback((type: string) => {
        updateTheMonth(type)
    }, [theMonth])

    return(
        <View style={styles.safeAreaView}>
            <View style={[styles.topView, styles.flexRowBetween]}>
                <IconArrow name="navigate-before" size={iconSize} color='white' onPress={() => changeMonth("before")}/>
                <Text style={[styles.topText, styles.alignCenter]}>{getMonthForm(theMonth)}</Text>
                <IconArrow name="navigate-next" size={iconSize} color='white' onPress={() => changeMonth("after")}/>
            </View>
            <View style={styles.container}>
                <ShowMonthTable/>
                <View style={[styles.statisticsView, styles.flexRowCenter, styles.topBoundary]}>
                    <View style={[styles.statisticsInnerView, styles.flexRowCenter, styles.statisticsLeftBoundary]}>
                        <View style={styles.iconTextView}>
                            <IconStatistics name="calendar-clock" size={iconSize_mini} color='black'/>
                            <Text style={styles.statisticsContentText}>{statisticsOfMonth[0]}</Text>
                        </View>
                    </View>
                    <View style={[styles.statisticsInnerView, styles.flexRowCenter]}>
                        <View style={styles.iconTextView}>
                            <IconStatistics name="gauge" size={iconSize_mini} color='black'/>
                            <Text style={styles.statisticsContentText}>{statisticsOfMonth[1]}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}