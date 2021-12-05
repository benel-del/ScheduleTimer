import React, { Dispatch, FC, SetStateAction, useCallback, useRef, useState } from 'react'
import { View, Text, Modal, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import { styles } from './styles'
import { useScheduleContext, useTodayDateContext } from './provider'
import { getDateForm, getLastScheduleIndex, newSchedule } from './function'
import { Colors } from 'react-native-paper'

export type parentType = {
    modalVisible: boolean,
    setModalVisible: Dispatch<SetStateAction<boolean>>
}

const ShowInputForm: FC<parentType> = ({modalVisible, setModalVisible}) => {
    const {theDate} = useTodayDateContext()
    const {theDateSchedules, updateSchedules} = useScheduleContext()
    const [name, onChangeName] = useState("")
    const [timeSetting_hour, onChangeHour] = useState(0)
    const [timeSetting_minute, onChangeMinute] = useState(0)
    const newScheduleIndex = getLastScheduleIndex(theDateSchedules) + 1

    const reset = useCallback(() => {
        onChangeName("")
        onChangeHour(0)
        onChangeMinute(0)
    }, [])

    const insert = useCallback(() =>{
        if(name == "")
            ToastAndroid.show("계획 내용을 입력하세요", ToastAndroid.LONG)
        else if(timeSetting_hour + timeSetting_minute == 0)
            ToastAndroid.show("시간을 설정하세요", ToastAndroid.LONG)
        else{
            updateSchedules("insert", newSchedule(newScheduleIndex, name, timeSetting_hour, timeSetting_minute))
            setModalVisible(false)
            reset()
            console.log(newScheduleIndex)
        }
    }, [name, timeSetting_hour, timeSetting_minute, newScheduleIndex])

    const HourSelect = useCallback(() => {
        const hourItem = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
            const time = index + "시간"
            return <Picker.Item label={time} value={index} key={index} style={{fontSize: 18}}/>
        })

        return (
            <View style={[styles.flexRowBetween]}>
                <View style={{width: 150, height: 60, borderWidth: 1, borderColor: Colors.blue900, borderRadius: 12}}>
                    <Picker
                        mode="dialog"
                        selectedValue={timeSetting_hour}
                        onValueChange={(itemValue) => {onChangeHour(itemValue)}}
                        style={{maxWidth: 200, height: 50, maxHeight: 100}}
                        dropdownIconColor={Colors.blue900}
                    >
                        {hourItem}
                    </Picker>
                </View>
            </View>
        )
    }, [timeSetting_hour])
    
    const MinuteSelect = useCallback(() => {
        const minuteItem = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((index) => {
            const time = index + "분"
            return <Picker.Item label={time} value={index} key={index} style={{fontSize: 18}}/>
        })

        return (
            <View style={[styles.flexRowBetween]}>
                <View style={{width: 150, height: 60, borderWidth: 1, borderColor: Colors.blue900, borderRadius: 12}}>
                    <Picker
                        mode="dialog"
                        selectedValue={timeSetting_minute}
                        onValueChange={(itemValue) => {onChangeMinute(itemValue)}}
                        style={{maxWidth: 200, height: 50, maxHeight: 100}}
                        dropdownIconColor={Colors.blue900}
                    >
                        {minuteItem}
                    </Picker>
                </View>
            </View>
        )
    }, [timeSetting_minute])

    return (
        <View>
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <View style={[styles.daysTitleView, styles.bottomBoundary, styles.alignCenter, {width: "50%"}]}>
                    <Text style={[styles.todayText, styles.alignCenter]}>{getDateForm(theDate)}</Text>
                </View>
                <View style={styles.inputFormView}>
                    <View style={styles.inputView}>
                        <TextInput style={styles.textInput} placeholder="계획 내용을 입력하세요" maxLength={10} onChangeText={text => onChangeName(text)}/>
                    </View>
                    <View>
                        <Text style={{padding:10}}>계획 내용: 최대 10자</Text>
                    </View>
                    <View style={[styles.flexRowBetween, {marginVertical: 10}]}>
                        <HourSelect />
                        <MinuteSelect />
                    </View>
                </View>
                <View style={styles.flexRowCenter}>
                    <TouchableOpacity style={styles.modalButton} onPress={() => {reset(), setModalVisible(false)}}>
                        <Text style={[styles.buttonText, {fontSize: 20}]}>취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={() => insert()}>
                        <Text style={[styles.buttonText, {fontSize: 20}]}>추가</Text>
                    </TouchableOpacity>
                </View> 
            </Modal>
        </View>
    )
}

export default ShowInputForm