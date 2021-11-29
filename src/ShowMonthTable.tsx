import React, { FC, useCallback, useState } from "react"
import { Text, View } from "react-native"
import { Calendar } from 'react-native-calendars'
import { styles } from './styles'
import { newSchedule } from "./function"

export type parentType = {
    month: Date
}

const ShowMonthTable: FC<parentType> = ({month}) => {
    const date = new Date()

    const [schedules, setSchedules] = useState([
        newSchedule(date, "뇌행", 0, 1),
        newSchedule(date, "컴특", 0, 1),
        newSchedule(date, "테테", 0, 1),
        newSchedule(date, "테테", 0, 1),
        newSchedule(date, "모소 기획서", 0, 1),
        newSchedule(new Date(date.getFullYear(), date.getMonth(), date.getDate()+1), "테스트", 0, 2),
        
    ])

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
                current = {month}
                onDayPress={(day) => {console.log(day)}}
                monthFormat={'yyyy MM'}
                disableMonthChange={true}
                hideArrows={true}
                hideExtraDays={true}
                disableArrowLeft={true}
                disableArrowRight={true}
                theme={theme}
                dayComponent={({date, state}) => {
                    let count = 0
                    const dots = schedules.map((sch, index) => {
                        const dd = sch.date.split(' ')[0].split('.').join('-')
                        if(count != 4 && dd == date.dateString){
                            count++
                            let color = 'grey'
                            if(sch.isChecked)
                                color = 'black'
                            return <View style={[styles.scheduleCircle, {backgroundColor:color}]} key={index}></View>
                        }
                    })
                    return (
                      <View style={styles.calendarDateView}>
                        <Text style={styles.calendarDateText}>
                          {date.day}
                        </Text>
                        <View style={[styles.flexRowBetween, styles.calendarCircleView]}>
                            {dots}
                        </View>
                      </View>
                    );
                  }}
            />
            </View>
            
        )
    }, [month])

    return (
        <View style={styles.contentView}>
            <ShowCalendar/>
            <Text style={{paddingLeft: 10}}>계획 4개까지 표현</Text>
        </View>
    )
}

export default ShowMonthTable