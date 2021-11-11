import React, { Dispatch, FC, SetStateAction, useState, useCallback } from 'react'
import { View, ScrollView, Alert, Text } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from './styles'
import { iSchedule } from './typeDeclare'
import { setTimerIcon, setTimeRemaining, setTimeOver, newTempSchedule } from './function/schedule'
import { initTimer, newTimer } from './function/timer'
import ShowScheduleTimer from './ShowScheduleTimer'
import ShowTimer from './ShowTimer'

export type parentType = {
    tense: string,
    setIsTimerStop: Dispatch<SetStateAction<boolean>>,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    schedules: iSchedule[],
    setSchedules: Dispatch<SetStateAction<iSchedule[]>>
}

let tmStop = false
let exitTimer = true
const iconSize = 40

const ShowTimerMode: FC<parentType> = ({tense, setIsTimerStop, setIsEditMode, schedules, setSchedules}) => {
    let newSch = newTempSchedule()
    const [timer, setTimer] = useState(initTimer())

    const startTimer = useCallback((schedule:iSchedule) => {
        if(exitTimer){
            newSch = setTimerIcon(schedule, "timer-sand")
            setSchedules(
                schedules.map(sch => sch.index == schedule.index? newSch: sch)
            )
            tmStop = false
            exitTimer = false
            setIsTimerStop(exitTimer)
            setTimer(newTimer(newSch.timeRemaining))
            countDown()
        }
        else{
            Alert.alert("경고", "다른 타이머가 돌아가고 있습니다.")
        }
    }, [])

    const stopTimer = useCallback((schedule:iSchedule) => {
        tmStop = true
        newSch = schedule
        Alert.alert("타이머를 종료하겠습니까?", "", [
            {text: "종료", onPress: () => {exitTimer = true, setIsTimerStop(exitTimer)}},
            {text: "취소", onPress: () => {tmStop = false}}
        ])
    }, [])

    const countDown = () => {
        let time = newSch.timeRemaining
        const start = setInterval(() => {
            if(time < 1){
                exitTimer = true
                setIsTimerStop(exitTimer)
                stop(setTimeOver(newSch))
            }
            else if(exitTimer)
                stop(setTimeRemaining(setTimerIcon(newSch, "timer"), time))              
            else if(!tmStop){
                time -= 1
                setTimer(newTimer(time))
            }
             
        }, 1000)

        const stop = (schedule: iSchedule) => {
            clearInterval(start)
            setSchedules(
                schedules.map(sch => sch.index == schedule.index? schedule: sch)
            )
            setTimer(initTimer())
        }
    }

    let editIcon = <Icon name="calendar-edit" size={iconSize} color={Colors.black} onPress={() => {setIsEditMode(true)}}/>
    if(tense == "Past" || !exitTimer)
        editIcon = <Icon name="calendar-edit" size={iconSize} color={Colors.white}/>

    let scheduleList = schedules.map((schedule, index) => {
            return <ShowScheduleTimer schedule={schedule} startTimer={startTimer} stopTimer={stopTimer} key={index}/>
        })
    
    let timerView
    if(exitTimer)
        timerView = null
    else
        timerView = <ShowTimer timer={timer}></ShowTimer>

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
                {timerView}
            </View>
        </View>
    )
}

export default ShowTimerMode