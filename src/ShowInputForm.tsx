import React, { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from 'react'
import { View,  Modal, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Picker } from '@react-native-picker/picker'

import { styles } from './styles'
import { Text, TextBold } from "./theme"
import { useScheduleContext, useDateContext } from './provider'
import { getDateFormat, getLastScheduleIndex, newSchedule } from './function'
import { Colors } from 'react-native-paper'

export type parentType = {
    modalVisible: boolean,
    setModalVisible: Dispatch<SetStateAction<boolean>>
}

const ShowInputForm: FC<parentType> = ({modalVisible, setModalVisible}) => {
    const {theDate} = useDateContext()
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
            updateSchedules("insert", newSchedule(newScheduleIndex, name, timeSetting_hour * 3600 + timeSetting_minute * 60))
            setModalVisible(false)
            reset()
        }
    }, [name, timeSetting_hour, timeSetting_minute, newScheduleIndex])

    const HourSelect = useCallback(() => {
        const hourItem = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
            return <Picker.Item label={index + "시간"} value={index} key={index} style={{fontSize: 18}}/>
        }), [])

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
        const minuteItem = useMemo(() => [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((index) => {
            return <Picker.Item label={index + "분"} value={index} key={index} style={{fontSize: 18}}/>
        }), [])

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
                    <TextBold style={styles.todayText}>{getDateFormat(theDate)}</TextBold>
                </View>
                <View style={styles.daysTitleView}>
                    <View style={styles.iconTextView}>
                        <Icon name="calendar-plus" size={40} color='black'/>                                                                                
                        <TextBold style={styles.daysTitleText}>계획 추가하기</TextBold>
                    </View>
                </View>
                <View style={styles.inputFormView}>
                    <View style={styles.inputView}>
                        <TextInput style={styles.textInput} placeholder="계획 내용을 입력하세요" maxLength={11} onChangeText={text => onChangeName(text)}/>
                    </View>
                    <View>
                        <Text style={styles.inputInfoText}>계획 내용: 최대 11자</Text>
                    </View>
                    <View style={[styles.flexRowBetween, {marginTop: 10}]}>
                        <HourSelect />
                        <MinuteSelect />
                    </View>
                    <View>
                        <Text style={styles.inputInfoText}>시간 범위: 0분 ~ 11시 55분</Text>
                    </View>
                </View>
                <View style={styles.flexRowCenter}>
                    <TouchableOpacity style={styles.modalButton} onPress={() => {reset(), setModalVisible(false)}}>
                        <Text style={[styles.buttonText, {fontSize: 27}]}>취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={() => insert()}>
                        <Text style={[styles.buttonText, {fontSize: 27}]}>추가</Text>
                    </TouchableOpacity>
                </View> 
            </Modal>
        </View>
    )
}

export default ShowInputForm