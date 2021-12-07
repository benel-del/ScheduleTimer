import React, { Dispatch, FC, SetStateAction, useState, useCallback, useEffect } from 'react'
import { View, ScrollView, Alert, ToastAndroid } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles } from './styles'
import { Text, TextBold } from "./theme/Text"
import { iSchedule } from './typeDeclare'
import ShowTimer from './ShowTimer'
import ShowScheduleTimer from './ShowScheduleTimer'
import { useScheduleContext } from './provider'
import { setTimerIcon, setTimeRemaining, setTimeOver, initTimer, newTimer } from './function'

export type parentType = {
    tense: string,
    setIsTimerStop: Dispatch<SetStateAction<boolean>>,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}

let tmStop = false
let exitTimer = true
const iconSize = 40

const ShowTimerMode: FC<parentType> = ({tense, setIsTimerStop, setIsEditMode}) => {
    const {updateSchedules, theDateSchedules} = useScheduleContext()
    const [timer, setTimer] = useState(initTimer())
    const focused = useIsFocused()
    
    useEffect(() => {
        if(!focused){
            exitTimer = true, setIsTimerStop(exitTimer)
        }
    }, [focused])

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
                updateSchedules("modify", newSch)
                setTimer(initTimer())
                clearInterval(start)
            }
        }

        if(exitTimer){
            updateSchedules("modify", setTimerIcon(schedule, "timer-sand"))
            tmStop = false
            exitTimer = false
            setIsTimerStop(exitTimer)
            countDown()
        }
        else
            ToastAndroid.show("다른 타이머가 돌아가고 있습니다.", ToastAndroid.SHORT)
    }, [theDateSchedules])

    const stopTimer = useCallback((schedule:iSchedule) => {
        tmStop = true
        Alert.alert("타이머를 종료하겠습니까?", "", [
            {text: "종료", onPress: () => {exitTimer = true, setIsTimerStop(exitTimer)}},
            {text: "취소", onPress: () => {tmStop = false}}
        ])
    }, [])

    const scheduleList = theDateSchedules?.scheduleOfDate.map((schedule, index) => {
        return <ShowScheduleTimer tense={tense} schedule={schedule} startTimer={startTimer} stopTimer={stopTimer} key={index}/>
    })

    return (
        <View style={styles.contentView}>
            <View style={[styles.daysTitleView, styles.textIconView]}>
                <View style={styles.iconTextView}>
                    <Icon name="calendar-today" size={iconSize} color='black'/>                                                                                
                    <TextBold style={styles.daysTitleText}>계획</TextBold>
                </View>
                {(tense == "Past" || !exitTimer) && <Icon name="calendar-edit" size={iconSize} color='white'/>}
                {(tense != "Past" && exitTimer) && <Icon name="calendar-edit" size={iconSize} color='black' onPress={() => {setIsEditMode(true)}}/>} 
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