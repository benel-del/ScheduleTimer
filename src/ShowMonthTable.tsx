import React, { useCallback } from "react"
import { Text, View } from "react-native"
import { Calendar } from 'react-native-calendars'
import { useNavigation } from "@react-navigation/native"

import { styles } from './styles'
import { useScheduleContext, useTodayDateContext } from "./provider"
import { getDateFormByString } from "./function"

const ShowMonthTable = () => {
    const navigation = useNavigation()
    const {theMonth, updateTheDate} = useTodayDateContext()
    const {theMonthSchedules} = useScheduleContext()
    const theme = {
        textMonthFontSize: 0,
        textDayFontSize: 24,
        textDayHeaderFontSize: 15,
        'stylesheet.calendar.header': {
            dayTextAtIndex0: {color: 'red'},
            dayTextAtIndex1: {color: 'black'},
            dayTextAtIndex2: {color: 'black'},
            dayTextAtIndex3: {color: 'black'},
            dayTextAtIndex4: {color: 'black'},
            dayTextAtIndex5: {color: 'black'},
            dayTextAtIndex6: {color: 'blue'}
        }
    }

    const navigate = useCallback((date: Date) => {
        updateTheDate(date)
        navigation.navigate("Daily")
    }, [])

    const ShowCalendar = useCallback(() => {
        return (
            <View style={styles.calendarView}>
            <Calendar
                current = {theMonth}
                monthFormat={'yyyy MM'}
                disableMonthChange={false}
                hideArrows={true}
                hideExtraDays={true}
                disableArrowLeft={true}
                disableArrowRight={true}
                theme={theme}
                dayComponent={({date, state}) => {
                    const calendarDate = getDateFormByString(date.dateString)
                    const day = theMonthSchedules?.schedulesOfMonth.find(day => day.date.split(' ')[0] == calendarDate.stringForm)
                    const dots = day?.scheduleOfDate.map((sch, index) => {
                        if(index < 4){
                            let color = 'grey'
                            if(sch.isChecked)
                                color = 'black'
                            return <View style={[styles.scheduleCircle, {backgroundColor:color}]} key={index}></View>
                        }
                    })
                    
                    return (
                      <View style={styles.calendarDateView}>
                        <Text style={styles.calendarDateText} onPress={() => navigate(calendarDate.dateForm)}>
                          {date.day}
                        </Text>
                        <View style={[styles.flexRowCenter, styles.calendarCircleView]}>
                            {dots}
                        </View>
                      </View>
                    );
                  }}
            />
            </View>
        )
    }, [theMonth, theMonthSchedules])

    return (
        <View style={styles.contentView}>
            <ShowCalendar/>
            <Text style={{paddingLeft: 10}}>계획 4개까지 표현</Text>
        </View>
    )
}

export default ShowMonthTable