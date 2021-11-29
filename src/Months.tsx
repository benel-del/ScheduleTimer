import React, { useCallback, useState } from "react"
import { Text, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import { styles } from './styles'
import { getMonthFormatting } from "./function"
import ShowMonthTable from "./ShowMonthTable"

const iconSize = 40
const iconSize_mini = 25

export default function Months() {
    const [month, setMonth] = useState(new Date())
    const beforePage = useCallback(() => {
        setMonth((date: Date) => {
            return new Date(date.getFullYear(), date.getMonth() - 1)
        })
    }, [])

    const nextPage = useCallback(() => {
        setMonth((date: Date) => {
            return new Date(date.getFullYear(), date.getMonth() + 1)
        })
    }, [])

    return(
        <View style={styles.container}>
            <View style={[styles.topView, styles.flexRowBetween]}>
                <Icon3 name="navigate-before" size={iconSize} color='white' onPress={beforePage}/>
                <Text style={[styles.topText, styles.alignCenter]}>{getMonthFormatting(month)}</Text>
                <Icon3 name="navigate-next" size={iconSize} color='white' onPress={nextPage}/>
            </View>

            <ShowMonthTable month={month}/>

            <View style={[styles.statisticsView, styles.flexRowCenter, styles.topBoundary]}>
                <View style={[styles.statisticsInnerView, styles.statisticsLeftBoundary]}>
                    <View style={[styles.iconTextView]}>
                        <Icon name="calendar-clock" size={iconSize_mini} color='black'/>
                        <Text style={[styles.homeStatisticsContentText, styles.alignCenter]}>0시간 0분</Text>
                    </View>
                </View>
                <View style={[styles.statisticsInnerView, styles.flexRowCenter, styles.statisticsRightBoundary]}>
                    <View style={styles.iconTextView}>
                        <Icon name="gauge" size={iconSize_mini} color='black'/>
                        <Text style={[styles.homeStatisticsContentText, styles.alignCenter]}>0% 달성</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}