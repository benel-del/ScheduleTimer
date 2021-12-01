import React, { FC, useCallback } from "react"
import { Text, View } from "react-native"
import { Calendar } from 'react-native-calendars'

import { styles } from './styles'
import { useScheduleContext, useTodayDateContext } from "./provider"

const ShowMonthTable = () => {
    const {theMonth} = useTodayDateContext()
    const {theMonthSchedules} = useScheduleContext()
    const theme = {
        textMonthFontSize: 0,
        textDayFontSize: 24,
        textDayHeaderFontSize: 15,
        'stylesheet.calendar.header': {
            dayText: {color: 'black'},
            dayTextAtIndex0: {color: 'red'},
            dayTextAtIndex1: {color: 'black'},
            dayTextAtIndex2: {color: 'black'},
            dayTextAtIndex3: {color: 'black'},
            dayTextAtIndex4: {color: 'black'},
            dayTextAtIndex5: {color: 'black'},
            dayTextAtIndex6: {color: 'blue'}
        }
    }
    
    const ShowCalendar = useCallback(() => {
        return (
            <View style={styles.calendarView}>
                <Calendar
                current = {theMonth}
                onDayPress={(day) => {console.log(day)}}
                monthFormat={'yyyy MM'}
                disableMonthChange={true}
                hideArrows={true}
                hideExtraDays={true}
                disableArrowLeft={true}
                disableArrowRight={true}
                theme={theme}
                dayComponent={({date, state}) => {
                    const dotsOfTheDay = theMonthSchedules?.schedulesOfMonth.map((day, index) => {
                        const dd = day.date.split(' ')[0].split('.').join('-')
                        if(dd == date.dateString){
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
                    return (
                      <View style={styles.calendarDateView}>
                        <Text style={styles.calendarDateText}>
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
    }, [theMonth, theMonthSchedules])

    return (
        <View style={styles.contentView}>
            <ShowCalendar/>
            <Text style={{paddingLeft: 10}}>계획 4개까지 표현</Text>
        </View>
    )
}

export default ShowMonthTable