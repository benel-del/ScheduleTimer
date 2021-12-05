import React, { FC } from 'react'
import { View, Text } from 'react-native'

import { styles } from './styles'
import { iTimer } from './typeDeclare'

export type parentType = {
    timer: iTimer
}

const ShowTimer: FC<parentType> = ({timer}) => {

    return (
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
                <Text style={styles.timerInfoText}>화면 이동 시 타이머가 중단됩니다.</Text>
            </View>
        </View>
    )
}

export default ShowTimer