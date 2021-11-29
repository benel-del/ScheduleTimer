import React, { Dispatch, FC, SetStateAction, useState, useCallback } from 'react'
import { View, ScrollView, Alert, Text } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from './styles'
import { iSchedule } from './typeDeclare'
import { setTimerIcon, setTimeRemaining, setTimeOver, initTimer, newTimer, getDayFormatting } from './function'
import ShowScheduleTimer from './ShowScheduleTimer'
import ShowTimer from './ShowTimer'

export type parentType = {
    tense: string,
    setIsTimerStop: Dispatch<SetStateAction<boolean>>,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    schedules: iSchedule[],
    setSchedules: Dispatch<SetStateAction<iSchedule[]>>,
    date: Date
}

let tmStop = false
let exitTimer = true
const iconSize = 40

const ShowTimerMode: FC<parentType> = ({tense, setIsTimerStop, setIsEditMode, schedules, setSchedules, date}) => {
    let todaySchedules = schedules.filter(sch => sch.date == getDayFormatting(date))
    const [timer, setTimer] = useState(initTimer())

    const startTimer = useCallback((schedule:iSchedule) => {
        const countDown = () => {
            let time = schedule.timeRemaining
            setTimer(newTimer(time))
            const start = setInterval(() => {
                if(time < 1){
                    exitTimer = true
                    setIsTimerStop(exitTimer)
                    stopCountDown(setTimeOver(schedule))
                }
                else if(exitTimer)
                    stopCountDown(setTimeRemaining(setTimerIcon(schedule, "timer"), time))              
                else if(!tmStop){
                    time -= 1
                    setTimer(newTimer(time))
                }
                 
            }, 1000)
    
            const stopCountDown = (newSch: iSchedule) => {
                setSchedules(
                    schedules.map(sch => sch.index == newSch.index? newSch: sch)
                )
                setTimer(initTimer())
                clearInterval(start)
            }
        }

        if(exitTimer){
            setSchedules(
                schedules.map(sch => sch.index == schedule.index? setTimerIcon(schedule, "timer-sand"): sch)
            )
            tmStop = false
            exitTimer = false
            setIsTimerStop(exitTimer)
            countDown()
        }
        else{
            Alert.alert("경고", "다른 타이머가 돌아가고 있습니다.")
        }
    }, [todaySchedules])

    const stopTimer = useCallback((schedule:iSchedule) => {
        tmStop = true
        Alert.alert("타이머를 종료하겠습니까?", "", [
            {text: "종료", onPress: () => {exitTimer = true, setIsTimerStop(exitTimer)}},
            {text: "취소", onPress: () => {tmStop = false}}
        ])
    }, [])

    let editIcon = <Icon name="calendar-edit" size={iconSize} color={Colors.black} onPress={() => {setIsEditMode(true)}}/>
    if(tense == "Past" || !exitTimer)
        editIcon = <Icon name="calendar-edit" size={iconSize} color={Colors.white}/>

    let scheduleList = todaySchedules.map((schedule, index) => {
        return <ShowScheduleTimer schedule={schedule} startTimer={startTimer} stopTimer={stopTimer} key={index}/>
    })

    return (
        <View>
            <View style={[styles.daysTitleView, styles.textIconView]}>
                <View style={styles.iconTextView}>
                    <Icon name="calendar-today" size={iconSize} color={Colors.black}/>                                                                                
                    <Text style={styles.daysTitleText}>계획</Text>
                </View>
                {editIcon}
            </View>
            <View style={styles.daysContentView}>
                <ScrollView style={[styles.daysScrollView, styles.alignCenter, styles.topBoundary]} horizontal={false}>
                    {scheduleList}
                </ScrollView>
                {!exitTimer && <ShowTimer timer={timer}></ShowTimer>}
            </View>
        </View>
    )
}

export default ShowTimerMode