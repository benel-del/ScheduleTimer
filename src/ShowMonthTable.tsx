import React, { useCallback } from "react"
import { View } from "react-native"
import { Calendar } from 'react-native-calendars'
import { useNavigation } from "@react-navigation/native"

import { styles } from './styles'
import { Text } from "./theme"
import { useScheduleContext, useDateContext } from "./provider"
import { getDateFormat, getDateFormatByString } from "./function"

const ShowMonthTable = () => {
    const navigation = useNavigation()
    const {today, theDate, theMonth, updateTheDate} = useDateContext()
    const {theMonthSchedules} = useScheduleContext()
    const theme = {
        textMonthFontSize: 0,
        textDayHeaderFontSize: 21,
        textDayHeaderFontFamily: 'BinggraeSamanco',
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

    const goDaily = useCallback(() => { // for sequential execution
        navigation.navigate("Daily")
    }, [theDate])

    const navigate = (date: Date) => {
        updateTheDate(date)
        goDaily()
    }

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
                    const calendarDate = getDateFormatByString(date.dateString)
                    const isToday = calendarDate.stringForm == getDateFormat(today).split(' ')[0]
                    const day = theMonthSchedules?.schedulesOfMonth.find(day => day.date.split(' ')[0] == calendarDate.stringForm)
                    const dots = day?.scheduleOfDate.map((sch, index) => {
                        if(index < 4)
                            return <View style={[styles.scheduleCircle, {backgroundColor: sch.isChecked ? 'black' : 'grey'}]} key={index}/>
                    })
                    return (
                      <View style={styles.calendarDateView}>
                        <Text style={[styles.calendarDateText, isToday? styles.todayColorText : styles.dateColorText]} onPress={() => navigate(calendarDate.dateFormat)}>
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
            <Text style={[styles.timerInfoText]}>?????? 4????????? ??????  |  ?????? ?????? ??? daily??? ??????</Text>
        </View>
    )
}

export default ShowMonthTable