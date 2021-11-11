import React, { Dispatch, FC, SetStateAction, useState, useCallback, useRef } from 'react'
import { View, ScrollView, Alert, Text } from 'react-native'
import { styles } from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { iSchedule } from './typeDeclare'
import { setTimerIcon, setTimeRemaining, setTimeOver, newTempSchedule, newSchedule, getTimeSetting } from './function/schedule'
import { initTimer, newTimer } from './function/timer'
import ShowScheduleTimer from './ShowScheduleTimer'
import ShowScheduleEdit from './ShowScheduleEdit'
import ShowTimer from './ShowTimer'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export type parentType = {
    tense: string,
    setIsTimerStop: Dispatch<SetStateAction<boolean>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    schedules: iSchedule[],
    setSchedules: Dispatch<SetStateAction<iSchedule[]>>
}

let tmStop = false
let exitTimer = true
const iconSize = 40

const ShowSchedule: FC<parentType> = ({tense, setIsTimerStop, isEditMode, setIsEditMode, schedules, setSchedules}) => {
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

    const insertSchedule = (schedule: iSchedule) => {
        Alert.alert("계획을 추가하겠습니까?", "")
        let newSch = newSchedule(new Date(), "추가", 0, 3)
        setSchedules([...schedules, newSch])
    }

    const removeSchedule = (schedule: iSchedule) => {
        const info = "[" + schedule.name + " " + getTimeSetting(schedule) + "]"
        Alert.alert(info + " 계획을 삭제하겠습니까?", "", [
            {text: "삭제", onPress: () => {remove()}},
            {text: "취소", onPress: () => {}}
        ])
        const remove = () => {
            setSchedules(
                schedules.filter(sch => sch.index !== schedule.index)
            )
        }
    }

    console.log("schedules: " + isEditMode);
    let editIcon = <Icon name="calendar-edit" size={iconSize} color={Colors.black} onPress={() => {setIsEditMode(true)}}/>
    if(tense == "Past" || !exitTimer)
        editIcon = <Icon name="calendar-edit" size={iconSize} color={Colors.white}/>
    else if(exitTimer && isEditMode)
        editIcon = <Icon name="calendar-check" size={iconSize} color={Colors.black} onPress={() => {setIsEditMode(false)}}/>
    
    let title = "계획"
    let scheduleList
    if(!isEditMode){
        scheduleList = schedules.map((schedule, index) => {
            return <ShowScheduleTimer schedule={schedule} startTimer={startTimer} stopTimer={stopTimer} key={index}/>
        })
    }
    else{
        title += "편집"
        scheduleList = schedules.map((schedule, index) => {
            return <ShowScheduleEdit schedule={schedule} updateSchedule={removeSchedule} key={index}/>
        })
        scheduleList.push(<ShowScheduleEdit schedule={newTempSchedule()} updateSchedule={insertSchedule} key={scheduleList.length}/>)
    }
    
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
                    <Text style={styles.daysTitleText}>{title}</Text>
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

export default ShowSchedule