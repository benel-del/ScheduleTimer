import React, { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { View, Text, Alert, ScrollView } from "react-native"
import { Colors } from "react-native-paper"
import { styles } from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import { getTense, getDayFormatting } from "./function/date"
import ShowSchedule from "./ShowSchedule"
import { initTimer } from "./function/timer"

const iconSize = 40
const iconSize_mini = 21

export default function Days() {
    
    const [timer, setTimer] = useState(initTimer())
    const [date, setDate] = useState(new Date())
    const tense = getTense(date)
    
    const beforePage = useCallback(() => {
        setDate((date: Date) => {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate()-1)
        })
    }, [])
    const nextPage = useCallback(() => {
        setDate((date: Date) => {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)
        })
    }, [])
    
    const statisticesOfDay = ["5시간 2분", "75"]
    

    const edit = () => {
        Alert.alert(tense);
    }

    let editIcon = <Icon name="calendar-edit" size={iconSize} color={Colors.black} onPress={edit}/>
    if(tense == "Past")
        editIcon = <Icon name="calendar-edit" size={iconSize} color={Colors.white}/>

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
            
            <View style={styles.daysContentView}>
                <ShowSchedule date={date} timer={timer} setTimer={setTimer}/>
                <View style={[styles.timerView, styles.alignCenter, styles.topBoundary]}>
                    <View style={[styles.innerView]}>
                        <Text style={styles.timerMiniText}>남은 시간</Text>
                        <View style={[styles.timerInnerView, styles.alignCenter, styles.flexRowCenter]}>
                            <View style={styles.timeView}>
                                <Text style={styles.timerInfoText}>시간</Text>
                                <Text style={styles.timerText}>{timer.hour}</Text>
                            </View>
                            <View style={styles.timeView}>
                                <Text style={styles.timerInfoText}></Text>
                                <Text style={styles.timerText}>:</Text>
                            </View>
                            <View style={styles.timeView}>
                                <Text style={styles.timerInfoText}>분</Text>
                                <Text style={styles.timerText}>{timer.minute}</Text>
                            </View>
                            <View style={styles.timeView}>
                                <Text style={styles.timerInfoText}></Text>
                                <Text style={styles.timerText}>:</Text>
                            </View>
                            <View style={styles.timeView}>
                                <Text style={styles.timerInfoText}>초</Text>
                                <Text style={styles.timerText}>{timer.second}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.statisticsView, styles.flexRowCenter, styles.topBoundary]}>
                <View style={[styles.statisticsInnerView, styles.statisticsLeftBoundary]}>
                    <View style={[styles.iconTextView]}>
                        <Icon name="calendar-clock" size={iconSize_mini} color={Colors.black}/>
                        <Text style={[styles.homeStatisticsContentText, styles.alignCenter]}>{statisticesOfDay[0]}</Text>
                    </View>
                </View>
                <View style={[styles.statisticsInnerView, styles.flexRowCenter, styles.statisticsRightBoundary]}>
                    <View style={styles.iconTextView}>
                        <Icon name="gauge" size={iconSize_mini} color={Colors.black}/>
                        <Text style={[styles.homeStatisticsContentText, styles.alignCenter]}>{statisticesOfDay[1]}% 달성</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}