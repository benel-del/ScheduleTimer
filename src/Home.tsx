import React, { useEffect, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { Colors } from "react-native-paper";
import { styles } from './styles'
import { getDayFormatting } from "./function"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Feather'

const iconSize = 25
const iconSize_mini = 21
const iconColor = Colors.black

export default function Home() {
    let date = getDayFormatting(new Date())
    const todayInfo = ["5시간 2분", "75"]
    const statisticesOfDays = ["2시간 12분", "87"]
    const statisticesOfMonths = ["152시간 38분", "56"]

    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <Text style={[styles.topText, styles.alignCenter]}>Study Timer</Text>
            </View>
            <View style={[styles.homeDateView, styles.bottomBoundary, styles.alignCenter, {width: "50%"}]}>
                <Text style={[styles.todayText, styles.alignCenter]}>{date}</Text>
            </View>
            <View style={[styles.homeContentView, styles.bottomBoundary]}>
                <View style={{width: "30%"}}>
                    <Text style={styles.homeTitleText}>오늘의...</Text>
                </View>
                <View style={styles.innerView}>
                    <View style={styles.iconTextView}>
                        <Icon name="calendar-today" size={iconSize} color={iconColor}/>
                        <Text style={styles.homeTodayContentText}>계획</Text>
                    </View>
                    <ScrollView style={styles.homeScrollView} horizontal={false}>
                        <View style={[styles.scrollInnerView, styles.iconTextView]}>
                            <Icon2 name="check-square" size={iconSize_mini} color={iconColor}/>
                            <Text style={styles.scrollViewText}>토익 2시간</Text>
                        </View>
                        <View style={[styles.scrollInnerView, styles.iconTextView]}>
                            <Icon2 name="check-square" size={iconSize_mini} color={iconColor}/>
                            <Text style={styles.scrollViewText}>뇌행 1시간 20분</Text>
                        </View>
                        <View style={[styles.scrollInnerView, styles.iconTextView]}>
                            <Icon2 name="check-square" size={iconSize_mini} color={iconColor}/>
                            <Text style={styles.scrollViewText}>컴특 1시간 20분</Text>
                        </View>
                        <View style={[styles.scrollInnerView, styles.iconTextView]}>
                            <Icon2 name="square" size={iconSize_mini} color={iconColor}/>
                            <Text style={styles.scrollViewText}>모소 기획서 3시간</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.innerView}>
                    <View style={styles.iconTextView}>
                        <Icon name="calendar-clock" size={iconSize} color={iconColor}/>
                        <Text style={styles.homeTodayContentText}>공부 시간: {todayInfo[0]}</Text>
                    </View>
                </View>
                <View style={styles.innerView}>
                    <View style={styles.iconTextView}>
                        <Icon name="gauge" size={iconSize} color={iconColor}/>
                        <Text style={styles.homeTodayContentText}>계획 달성률: {todayInfo[1]}%</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.statisticsView, styles.flexRowCenter]}>
                <View style={[styles.statisticsInnerView, styles.statisticsLeftBoundary]}>
                    <View style={{width: "70%"}}>
                        <Text style={styles.homeTitleText}>일별 통계</Text>
                    </View>
                    <View style={styles.iconTextView}>
                        <Icon name="calendar-clock" size={iconSize_mini} color={iconColor}/>
                        <Text style={styles.homeStatisticsContentText}>{statisticesOfDays[0]}</Text>
                    </View>
                    <View style={styles.iconTextView}>
                        <Icon name="gauge" size={iconSize_mini} color={iconColor}/>
                        <Text style={styles.homeStatisticsContentText}>{statisticesOfDays[1]}% 달성</Text>
                    </View>
                </View>
                <View style={[styles.statisticsInnerView, styles.statisticsRightBoundary]}>
                    <View style={{width: "70%"}}>
                        <Text style={styles.homeTitleText}>월별 통계</Text>
                    </View>
                    <View style={styles.iconTextView}>
                        <Icon name="calendar-clock" size={iconSize_mini} color={iconColor}/>
                        <Text style={styles.homeStatisticsContentText}>{statisticesOfMonths[0]}</Text>
                    </View>
                    <View style={styles.iconTextView}>
                        <Icon name="gauge" size={iconSize_mini} color={iconColor}/>
                        <Text style={styles.homeStatisticsContentText}>{statisticesOfMonths[1]}% 달성</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}