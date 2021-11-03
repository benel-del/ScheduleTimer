import React, { useEffect, useState } from "react"
import { View, Text, Alert, ScrollView } from "react-native"
import { Colors } from "react-native-paper"
import { styles } from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import getDayFormatting from "./function/getDayFormatting"

const iconSize = 40
const iconSize_timer = 32
const iconSize_square = 25
const iconSize_mini = 21
const iconColor = Colors.black
const iconColor_inactive = Colors.white

export default function Days() {
    const [date, setDate] = useState(new Date())
    const beforePage = function(){
        setDate((date: Date) => {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate()-1)
        })
    }
    const nextPage = function(){
        setDate((date: Date) => {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)
        })
    }

    const statisticesOfDays = ["5시간 2분", "75"]
    const timer = ["00", "28", "47"]
    const edit = () => {
        Alert.alert("Icon edit");
    }

    return (
        <View style={styles.container}>
            <View style={[styles.topView, styles.flexRowBetween]}>
                <Icon3 name="navigate-before" size={iconSize} color={iconColor_inactive} onPress={beforePage}/>
                <Text style={[styles.topText, styles.alignCenter]}>{getDayFormatting(date)}</Text>
                <Icon3 name="navigate-next" size={iconSize} color={iconColor_inactive} onPress={nextPage}/>
            </View>
            <View style={[styles.daysTitleView, styles.textIconView]}>
                <View style={styles.iconTextView}>
                    <Icon name="calendar-today" size={iconSize} color={iconColor}/>
                    <Text style={styles.daysTitleText}>계획</Text>
                </View>
                <Icon name="calendar-edit" size={iconSize} color={iconColor} onPress={edit}/>
            </View>
            
            <View style={styles.daysContentView}>
                <ScrollView style={[styles.daysScrollView, styles.alignCenter, styles.topBoundary]} horizontal={false}>
                    <View style={[styles.textIconView, styles.scheduleBoundary]}>
                        <View style={[styles.iconTextView]}>
                            <Icon2 name="check-square" size={iconSize_square} color={iconColor}/>
                            <Text style={styles.daysScheduleText}>토익 2시간</Text>
                        </View>
                        <Icon3 name="timer" size={iconSize_timer} color={iconColor_inactive}/>
                    </View>
                    <View style={[styles.textIconView, styles.scheduleBoundary]}>
                        <View style={[styles.iconTextView]}>
                            <Icon2 name="check-square" size={iconSize_square} color={iconColor}/>
                            <Text style={styles.daysScheduleText}>뇌행 1시간 20분</Text>
                        </View>
                        <Icon3 name="timer" size={iconSize_timer} color={iconColor_inactive}/>
                    </View>
                    <View style={[styles.textIconView, styles.scheduleBoundary]}>
                        <View style={[styles.iconTextView]}>
                            <Icon2 name="square" size={iconSize_square} color={iconColor}/>
                            <Text style={styles.daysScheduleText}>컴특 1시간 20분</Text>
                        </View>
                        <Icon3 name="timer" size={iconSize_timer} color={iconColor}/>
                    </View>
                    <View style={[styles.textIconView, styles.scheduleBoundary]}>
                        <View style={[styles.iconTextView]}>
                            <Icon2 name="square" size={iconSize_square} color={iconColor}/>
                            <Text style={styles.daysScheduleText}>모소 기획서 3시간</Text>
                        </View>
                        <Icon name="timer-sand" size={iconSize_timer} color={iconColor}/>
                    </View>
                    <View style={[styles.textIconView, styles.scheduleBoundary]}>
                        <View style={[styles.iconTextView]}>
                            <Icon2 name="square" size={iconSize_square} color={iconColor}/>
                            <Text style={styles.daysScheduleText}>컴특 1시간 20분</Text>
                        </View>
                        <Icon3 name="timer" size={iconSize_timer} color={iconColor}/>
                    </View>
                    <View style={[styles.textIconView, styles.scheduleBoundary]}>
                        <View style={[styles.iconTextView]}>
                            <Icon2 name="square" size={iconSize_square} color={iconColor}/>
                            <Text style={styles.daysScheduleText}>컴특 1시간 20분</Text>
                        </View>
                        <Icon3 name="timer" size={iconSize_timer} color={iconColor}/>
                    </View>
                </ScrollView>
                <View style={[styles.timerView, styles.alignCenter, styles.topBoundary]}>
                    <View style={[styles.innerView]}>
                        <Text style={styles.timerMiniText}>남은 시간</Text>
                        <View style={[styles.timerInnerView, styles.alignCenter, styles.flexRowCenter]}>
                            <View style={styles.timeView}>
                                <Text style={styles.timerInfoText}>시간</Text>
                                <Text style={styles.timerText}>{timer[0]}</Text>
                            </View>
                            <View style={styles.timeView}>
                                <Text style={styles.timerInfoText}></Text>
                                <Text style={styles.timerText}>:</Text>
                            </View>
                            <View style={styles.timeView}>
                                <Text style={styles.timerInfoText}>분</Text>
                                <Text style={styles.timerText}>{timer[1]}</Text>
                            </View>
                            <View style={styles.timeView}>
                                <Text style={styles.timerInfoText}></Text>
                                <Text style={styles.timerText}>:</Text>
                            </View>
                            <View style={styles.timeView}>
                                <Text style={styles.timerInfoText}>초</Text>
                                <Text style={styles.timerText}>{timer[2]}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.statisticsView, styles.flexRowCenter, styles.topBoundary]}>
                <View style={[styles.statisticsInnerView, styles.statisticsLeftBoundary]}>
                    <View style={[styles.iconTextView]}>
                        <Icon name="calendar-clock" size={iconSize_mini} color={iconColor}/>
                        <Text style={[styles.homeStatisticsContentText, styles.alignCenter]}>{statisticesOfDays[0]}</Text>
                    </View>
                </View>
                <View style={[styles.statisticsInnerView, styles.flexRowCenter, styles.statisticsRightBoundary]}>
                    <View style={styles.iconTextView}>
                        <Icon name="gauge" size={iconSize_mini} color={iconColor}/>
                        <Text style={[styles.homeStatisticsContentText, styles.alignCenter]}>{statisticesOfDays[1]}% 달성</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}