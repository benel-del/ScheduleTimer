import React from "react"
import { View, ScrollView, SafeAreaView } from "react-native"
import IconCheck from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles } from './styles'
import { Text, TextBold } from "./theme"
import { useScheduleContext, useDateContext } from "./provider"
import { getTotalStatistics, getDateForm, getMonthForm, getStatisticsFormat, getTimeSetting } from "./function"
import { useFocusEffect } from "@react-navigation/native"

const iconSize = 33
const iconSize_mini = 23
const iconColor = 'black'

export default function Home() {
    const {today, updateTheDate} = useDateContext()
    const {schedules} = useScheduleContext()
    const toMonthSchedules = schedules.find(dates => dates.month == getMonthForm(today))
    const todaySchedules = toMonthSchedules?.schedulesOfMonth.find(schs => schs.date == getDateForm(today))
    const statisticsOfToday = getStatisticsFormat(todaySchedules?.statisticsOfDate)
    const statisticsOfTotal = getTotalStatistics(schedules)

    useFocusEffect(() => {
        updateTheDate(today)
    })

    const scheduleList = todaySchedules?.scheduleOfDate.map((schedule, index) => {
        return (
            <View style={[styles.scrollInnerView, styles.iconTextView]} key={index}>
                {!schedule.isChecked && <IconCheck name="square" size={iconSize_mini} color={iconColor}/>}
                {schedule.isChecked && <IconCheck name="check-square" size={iconSize_mini} color={iconColor}/>}
                <Text style={styles.scrollViewText}>{schedule.name} ({getTimeSetting(schedule)})</Text>
            </View>
        )
    })

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.topView}>
                <TextBold style={[styles.topText, styles.alignCenter, {paddingTop: 5}]}>Schedule Timer</TextBold>
            </View>
            <View style={styles.container}>
                <View style={[styles.homeDateView, styles.bottomBoundary, styles.alignCenter, {width: "50%"}]}>
                    <TextBold style={styles.todayText}>{getDateForm(today)}</TextBold>
                </View>
                <View style={[styles.homeContentView, styles.bottomBoundary]}>
                    <View style={styles.homeTitleView}>
                        <TextBold style={styles.homeTitleText}>오늘의...</TextBold>
                    </View>
                    <View style={styles.innerView}>
                        <View style={styles.iconTextView}>
                            <Icon name="calendar-today" size={iconSize} color={iconColor}/>
                            <Text style={styles.homeContentText}>계획</Text>
                        </View>
                        <View style={styles.homeScrollView}>
                            <ScrollView style={{paddingHorizontal: 20}} horizontal={false}>
                                {scheduleList}
                            </ScrollView>
                        </View>
                    </View>

                    <View style={[styles.innerView, {marginVertical: 3}]}>
                        <View style={styles.iconTextView}>
                            <Icon name="calendar-clock" size={iconSize} color={iconColor}/>
                            <Text style={styles.homeContentText}>공부 시간 :   {statisticsOfToday[0]}</Text>
                        </View>
                    </View>
                    <View style={[styles.innerView, {marginVertical: 3}]}>
                        <View style={styles.iconTextView}>
                            <Icon name="gauge" size={iconSize} color={iconColor}/>
                            <Text style={styles.homeContentText}>계획 달성률 :   {statisticsOfToday[1]}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.statisticsView]}>
                    <View style={{paddingHorizontal: 10}}>
                        <View style={styles.homeTitleView}>
                            <TextBold style={styles.homeTitleText}>전체 통계</TextBold>
                        </View>
                        <View style={{paddingHorizontal: 5}}>
                            <View style={[styles.flexRowBetween, {marginVertical: 3}]}>
                                <View style={styles.iconTextView}>
                                    <Icon name="check" size={20} color={iconColor} style={{marginTop: 4}}/>
                                    <Text style={styles.homeContentText}>100% 달성한 날짜 :</Text>
                                </View>
                                <Text style={styles.homeContentText}>{statisticsOfTotal[0]}</Text>
                            </View>
                            <View style={[styles.flexRowBetween, {marginVertical: 3}]}>
                                <View style={styles.iconTextView}>
                                    <Icon name="check" size={20} color={iconColor} style={{marginTop: 4}}/>
                                    <Text style={styles.homeContentText}>달성한 계획 :</Text>
                                </View>
                                <Text style={styles.homeContentText}>{statisticsOfTotal[1]}</Text>
                            </View>
                            <View style={[styles.flexRowBetween, {marginVertical: 3}]}>
                                <View style={styles.iconTextView}>
                                    <Icon name="check" size={20} color={iconColor} style={{marginTop: 4}}/>
                                    <Text style={styles.homeContentText}>공부한 시간 :</Text>
                                </View>
                                <Text style={styles.homeContentText}>{statisticsOfTotal[2]}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}