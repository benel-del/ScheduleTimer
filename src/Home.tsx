import React, { useEffect } from "react"
import { View, Text, ScrollView } from "react-native"
import IconCheck from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles } from './styles'
import { useScheduleContext, useTodayDateContext } from "./provider"
import { getDailyStatistics, getDateForm, getMonthForm, getMonthlyStatistics, getStatisticsFormat, getTimeSetting } from "./function"
import { useIsFocused } from "@react-navigation/native"

const iconSize = 33
const iconSize_mini = 23
const iconColor = 'black'

export default function Home() {
    const {today, updateTheDate} = useTodayDateContext()
    const {schedules} = useScheduleContext()
    const toMonthSchedules = schedules.find(dates => dates.month == getMonthForm(today))
    const todaySchedules = toMonthSchedules?.schedulesOfMonth.find(schs => schs.date == getDateForm(today))
    const statisticsOfToday = getStatisticsFormat(todaySchedules?.statisticsOfDate)
    const statisticsOfDaily = getDailyStatistics(toMonthSchedules?.statisticsOfMonth)
    const statisticsOfMonthly = getMonthlyStatistics(schedules)
    const focused = useIsFocused()

    useEffect(()=>{
        if(focused)
            updateTheDate(today)
    }), [focused];

    const scheduleList = todaySchedules?.scheduleOfDate.map((schedule, index) => {
        return (
            <View style={[styles.scrollInnerView, styles.iconTextView, {marginVertical: 5}]} key={index}>
                {!schedule.isChecked && <IconCheck name="square" size={iconSize_mini} color={iconColor}/>}
                {schedule.isChecked && <IconCheck name="check-square" size={iconSize_mini} color={iconColor}/>}
                <Text style={styles.scrollViewText}>{schedule.name} ({getTimeSetting(schedule)})</Text>
            </View>
        )
    })

    return (
        <View>
            <View style={styles.topView}>
                <Text style={[styles.topText, styles.alignCenter, {paddingTop: 2}]}>Study Timer</Text>
            </View>
            <View style={styles.container}>
                <View style={[styles.homeDateView, styles.bottomBoundary, styles.alignCenter, {width: "50%"}]}>
                    <Text style={[styles.todayText, styles.alignCenter]}>{getDateForm(today)}</Text>
                </View>
                <View style={[styles.homeContentView, styles.bottomBoundary]}>
                    <View style={[styles.homeTitleView, {width: "30%"}]}>
                        <Text style={styles.homeTitleText}>오늘의...</Text>
                    </View>
                    <View style={styles.innerView}>
                        <View style={styles.iconTextView}>
                            <Icon name="calendar-today" size={iconSize} color={iconColor}/>
                            <Text style={[styles.homeTodayContentText, {marginTop: 3}]}>계획</Text>
                        </View>
                        <ScrollView style={styles.homeScrollView} horizontal={false}>
                            {scheduleList}
                        </ScrollView>
                    </View>

                    <View style={[styles.innerView, {marginVertical: 3}]}>
                        <View style={styles.iconTextView}>
                            <Icon name="calendar-clock" size={iconSize} color={iconColor}/>
                            <Text style={[styles.homeTodayContentText, {marginTop: 3}]}>공부 시간 :   {statisticsOfToday[0]}</Text>
                        </View>
                    </View>
                    <View style={[styles.innerView, {marginVertical: 3}]}>
                        <View style={styles.iconTextView}>
                            <Icon name="gauge" size={iconSize} color={iconColor}/>
                            <Text style={[styles.homeTodayContentText, {marginTop: 3}]}>계획 달성률 :   {statisticsOfToday[1]}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.statisticsView, styles.flexRowCenter]}>
                    <View style={[styles.statisticsInnerView, styles.statisticsLeftBoundary]}>
                        <View style={[styles.homeTitleView, {width: "70%"}]}>
                            <Text style={styles.homeStatisticsTitleText}>일별 통계</Text>
                        </View>
                        <View style={[styles.iconTextView, {marginVertical: 1}]}>
                            <Icon name="calendar-clock" size={iconSize_mini} color={iconColor}/>
                            <Text style={styles.homeStatisticsContentText}>{statisticsOfDaily[0]}</Text>
                        </View>
                        <View style={[styles.iconTextView, {marginVertical: 1}]}>
                            <Icon name="gauge" size={iconSize_mini} color={iconColor}/>
                            <Text style={styles.homeStatisticsContentText}>{statisticsOfDaily[1]}</Text>
                        </View>
                    </View>
                    <View style={[styles.statisticsInnerView, styles.statisticsRightBoundary]}>
                        <View style={[styles.homeTitleView, {width: "70%"}]}>
                            <Text style={styles.homeStatisticsTitleText}>월별 통계</Text>
                        </View>
                        <View style={[styles.iconTextView, {marginVertical: 1}]}>
                            <Icon name="calendar-clock" size={iconSize_mini} color={iconColor}/>
                            <Text style={styles.homeStatisticsContentText}>{statisticsOfMonthly[0]}</Text>
                        </View>
                        <View style={[styles.iconTextView, {marginVertical: 1}]}>
                            <Icon name="gauge" size={iconSize_mini} color={iconColor}/>
                            <Text style={styles.homeStatisticsContentText}>{statisticsOfMonthly[1]}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}