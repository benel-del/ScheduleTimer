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
    const {schedules} = useScheduleContext()
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

    const goDays = useCallback(() => {
        navigation.navigate("Daily")
    }, [])

    const navigate = (date: Date) => {
        updateTheDate(date)
        goDays()
    }

    const ShowCalendar = useCallback(() => {
        return (
            <View style={styles.calendarView}>
                <Calendar
                current = {theMonth}
                monthFormat={'yyyy MM'}
                onDayPress={(day) => {console.log('selected day', day)}}
                disableMonthChange={false}
                hideArrows={true}
                hideExtraDays={true}
                disableArrowLeft={true}
                disableArrowRight={true}
                theme={theme}
                dayComponent={({date, state}) => {
                    const calendarDate = getDateFormByString(date.dateString)
                    const dotsOfTheDay = schedules?.map((month, index) => {
                        month.schedulesOfMonth.map((day, index) => {
                            const scheduleDate = day.date.split(' ')[0]
                            if(scheduleDate == calendarDate.stringForm){
                                const dots = day.scheduleOfDate.map((sch, index) => {
                                    if(index < 4){
                                        let color = 'grey'
                                        if(sch.isChecked)
                                            color = 'black'
                                        return <View style={[styles.scheduleCircle, {backgroundColor:color}]} key={index}></View>
                                    }
                                })
                                return dots
                            }
                        })
                    })
                    return (
                      <View style={styles.calendarDateView}>
                        <Text style={styles.calendarDateText} onPress={() => navigate(calendarDate.dateForm)}>
                          {date.day}
                        </Text>
                        <View style={[styles.flexRowCenter, styles.calendarCircleView]}>
                            {dotsOfTheDay}
                        </View>
                      </View>
                    );
                  }}
            />
            </View>
            
        )
    }, [theMonth, schedules])

    return (
        <View style={styles.contentView}>
            <ShowCalendar/>
            <Text style={{paddingLeft: 10}}>계획 4개까지 표현</Text>
        </View>
    )
}

export default ShowMonthTable