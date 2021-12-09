import React, { FC } from 'react'
import { View } from 'react-native'

import { styles } from './styles'
import { Text } from "./theme"
import { iTimer } from './typeDeclare'

export type parentType = {
    timer: iTimer,
    showRemainTime: number
}

const ShowTimer: FC<parentType> = ({timer, showRemainTime}) => {

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
                {showRemainTime == -1 && <Text style={[styles.timerInfoText, {textAlign: 'right'}]}>화면 이동 시 타이머가 중단됩니다.</Text>}
            </View>
        </View>
    )
}

export default ShowTimer