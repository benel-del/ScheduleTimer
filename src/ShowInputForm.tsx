import React, { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { View, Text, Modal, TextInput, Alert, TouchableOpacity } from 'react-native'
import DateTimePicker from "@react-native-community/datetimepicker"
import { getDayFormatting, newSchedule } from './function'
import { styles } from './styles'
import { iSchedule } from './typeDeclare'

export type parentType = {
    modalVisible: boolean,
    setModalVisible: Dispatch<SetStateAction<boolean>>,
    schedules: iSchedule[],
    setSchedules: Dispatch<SetStateAction<iSchedule[]>>,
    date: Date
}

const ShowInputForm: FC<parentType> = ({modalVisible, setModalVisible, schedules, setSchedules, date}) => {
    const [name, onChangeName] = useState("")
    const [timeSetting_hour, onChangeHour] = useState(0)
    const [timeSetting_minute, onChangeMinute] = useState(0)
    const [timeSetting, setTimeSetting] = useState(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0));
    const [show, setShow] = useState(false)

    const reset = useCallback(() => {
        onChangeName("")
        onChangeHour(0)
        onChangeMinute(0)
    }, [])

    const insert = useCallback(() =>{
        if(name == "")
            Alert.alert("경고", "계획 내용을 입력하세요")
        else if(timeSetting_hour + timeSetting_minute == 0)
            Alert.alert("경고", "시간을 설정하세요")
        else{
            setSchedules([...schedules, newSchedule(date, name, timeSetting_hour, timeSetting_minute)])
            setModalVisible(false)
            reset()
        }
    }, [timeSetting_hour, timeSetting_minute])

    const onChange = useCallback((event: Event, date: Date) => {
        setShow(false)
        if(date != undefined){
            const hour = date.getHours()
            const minute = date.getMinutes()
            if(hour > 11)
                Alert.alert("경고", "시간 설정 범위: 0 ~ 11")
            else{
                onChangeHour(hour)
                onChangeMinute(minute)
                setTimeSetting(date)
            }
        }
    }, [])

    return (
        <View>
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <View style={[styles.daysTitleView, styles.bottomBoundary, styles.alignCenter, {width: "50%"}]}>
                    <Text style={[styles.todayText, styles.alignCenter]}>{getDayFormatting(date)}</Text>
                </View>
                <View style={styles.inputFormView}>
                    <View style={styles.inputTextView}>
                        <TextInput style={styles.textInput} placeholder="계획 내용을 입력하세요" maxLength={10} onChangeText={text => onChangeName(text)}/>
                    </View>
                    <View>
                        <Text style={{padding:10}}>계획 내용: 최대 10자</Text>
                    </View>
                    <View style={[styles.flexRowBetween, styles.inputTimeView]}>
                        <Text style={[styles.homeTodayContentText, styles.alignCenter]}>{timeSetting_hour}시간 {timeSetting_minute}분</Text>
                        <TouchableOpacity style={styles.timeSettingButton} onPress={() => setShow(true)}>
                            <Text style={[styles.buttonText, {fontSize: 15}]}>시간 설정</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{padding:10}}>시간 설정 범위: 00시 1분 ~ 11시 59분</Text>
                    </View>
                    
                    {show && <DateTimePicker value={timeSetting} mode="time" display="spinner" is24Hour={true} onChange={onChange}/>}
                </View>
                <View style={styles.flexRowCenter}>
                    <TouchableOpacity style={styles.modalButton} onPress={insert}>
                        <Text style={[styles.buttonText, {fontSize: 20}]}>추가</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={() => {reset(), setModalVisible(false)}}>
                        <Text style={[styles.buttonText, {fontSize: 20}]}>취소</Text>
                    </TouchableOpacity>
                </View> 
            </Modal>
        </View>
    )
}

export default ShowInputForm