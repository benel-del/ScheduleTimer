import React, { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { View, Text, Button, Modal, TextInput, Alert } from 'react-native'
import { getDayFormatting, newSchedule } from './function'
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

    const onChangeText = useCallback((type: string, text: string) => {
        const check = /[~!@\#$%^&*\()\-=+_'\;<>\/.\`:\"\\,\[\]?|{}]/gi
        if(text.match(check))
            Alert.alert("경고", "불필요한 문자 포함")
        else{
            if(type == "hour"){
                const num = Number(text)
                if(num < 0 || num > 11)   // timeSetting_hour's maximun: 11
                    Alert.alert("경고", "시간 설정 범위: 0 ~ 11")
                else
                    onChangeHour(num)
            }
            else if(type == "minute"){
                const num = Number(text)
                if(num < 0 || num > 59)   // timeSetting_hour's maximun: 11
                    Alert.alert("경고", "분 설정 범위: 0 ~ 59")
                else
                    onChangeMinute(num)
            }
        }
    }, [])

    const insert = () =>{
        setSchedules([...schedules, newSchedule(date, name, timeSetting_hour, timeSetting_minute)])
        setModalVisible(false)
    }

    return (
        <View>
            <Modal animationType="slide" transparent={false} visible={modalVisible} style={[{height: "50%", width: "50%"}]}>
                <View>
                    <Text>{getDayFormatting(date)}</Text>
                    <Text>계획 추가하기</Text>
                </View>
                <View>
                    <View>
                        <TextInput placeholder="계획 이름" onChangeText={text => onChangeName(text)}/>
                    </View>
                    <View>
                        <TextInput placeholder="시" keyboardType="number-pad" onChangeText={(number) => onChangeText("hour", number)}/>

                        <TextInput placeholder="분" keyboardType="number-pad" onChangeText={(number) => onChangeText("minute", number)}/>
                        
                    </View>
                </View>
                <View>
                    <Button title="추가" onPress={insert}/>
                    <Button title="취소" onPress={() => {setModalVisible(false)}}/>
                </View> 
            </Modal>
        </View>
    )
}

export default ShowInputForm