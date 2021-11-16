import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { View, Text, Button, Modal, TextInput } from 'react-native'
import { newSchedule } from './function/schedule'
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
    const [timeSetting_minute, onChangeMiniute] = useState(0)

    const insert = () =>{
        setSchedules([...schedules, newSchedule(date, name, timeSetting_hour, timeSetting_minute)])
        setModalVisible(false)
    }

    return (
        <View>
            <Modal animationType="slide" transparent={false} visible={modalVisible} style={[{height: "50%", width: "50%"}]}>
                <View>
                    <Text>계획 추가하기</Text>
                </View>
                <View>
                    <View>
                        <TextInput placeholder="계획 이름" onChangeText={text => onChangeName(text)}/>
                    </View>
                    <View>
                        <TextInput placeholder="시" keyboardType="number-pad" onChangeText={(number) => onChangeHour(Number(number))}/>

                        <TextInput placeholder="분" keyboardType="number-pad" onChangeText={(number) => onChangeMiniute(Number(number))}/>
                        
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