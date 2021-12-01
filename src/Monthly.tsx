import React, { useCallback, useEffect, useState } from "react"
import { Text, View } from "react-native"
import IconArrow from 'react-native-vector-icons/MaterialIcons'
import IconStatistics from 'react-native-vector-icons/MaterialCommunityIcons'
import DateTimePicker from "@react-native-community/datetimepicker"
import { useIsFocused } from "@react-navigation/native"

import { styles } from './styles'
import ShowMonthTable from "./ShowMonthTable"
import { useScheduleContext, useTodayDateContext } from "./provider"
import { getMonthForm, getStatisticsFormat } from "./function"

const iconSize = 40
const iconSize_mini = 25

export default function Monthly() {
    const {today, theMonth, updateTheMonth} = useTodayDateContext()
    const {theMonthSchedules} = useScheduleContext()
    const theMonthString = getMonthForm(theMonth)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const focused = useIsFocused()
    useEffect(()=>{
        if(!focused)
            updateTheMonth(today)
    }), [focused];

    const statisticsOfMonth = () => {
        if(theMonthSchedules == undefined)
            return ["0시간 0분", "0% 달성"]
        else
            return getStatisticsFormat(theMonthSchedules.statisticsOfMonth)
    }

    const beforePage = useCallback(() => {
        updateTheMonth("before")
    }, [theMonth])

    const nextPage = useCallback(() => {
        updateTheMonth("after")
    }, [theMonth])

    const onChange = useCallback((event: Event, date: Date) => {
        setIsCalendarOpen(false)
        if(date != undefined){
            updateTheMonth(date)
        }            
    }, [])

    return(
        <View style={styles.container}>
            <View style={[styles.topView, styles.flexRowBetween]}>
                <IconArrow name="navigate-before" size={iconSize} color='white' onPress={beforePage}/>
                <Text style={[styles.topText, styles.alignCenter]} onPress={() => setIsCalendarOpen(true)}>{theMonthString}</Text>
                {isCalendarOpen && <DateTimePicker value={theMonth} mode="date" display="calendar" onChange={onChange}/>}
                <IconArrow name="navigate-next" size={iconSize} color='white' onPress={nextPage}/>
            </View>

            <ShowMonthTable/>

            <View style={[styles.statisticsView, styles.flexRowCenter, styles.topBoundary]}>
                <View style={[styles.statisticsInnerView, styles.statisticsLeftBoundary]}>
                    <View style={[styles.iconTextView]}>
                        <IconStatistics name="calendar-clock" size={iconSize_mini} color='black'/>
                        <Text style={[styles.homeStatisticsContentText, styles.alignCenter]}>{statisticsOfMonth()[0]}</Text>
                    </View>
                </View>
                <View style={[styles.statisticsInnerView, styles.flexRowCenter, styles.statisticsRightBoundary]}>
                    <View style={styles.iconTextView}>
                        <IconStatistics name="gauge" size={iconSize_mini} color='black'/>
                        <Text style={[styles.homeStatisticsContentText, styles.alignCenter]}>{statisticsOfMonth()[1]}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}