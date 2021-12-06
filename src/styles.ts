import { StyleSheet } from "react-native";
import { Colors } from 'react-native-paper';

const baseColor = Colors.blue900
const lightColor = Colors.blue800

export const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    container: {
        padding: 5
    },
    contentView: {
        height: "87%"
    },
    topView: {
        height: 55,
        paddingHorizontal: 5,
        paddingVertical: 7,
        backgroundColor: baseColor
    },
    homeDateView: {
        margin: 15,
        marginTop: 30,
        padding: 5
    },
    homeTitleView: {
        marginBottom: 5,
        borderRadius: 5,
        width: "30%"
    },
    innerView: {
        padding: 5,
        margin: 5,
    },
    iconTextView: {
        flexDirection: 'row'
    },
    textIconView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        margin: 3,
    },
    homeContentView: {
        padding: 5,
        margin: 10,
        marginBottom: 0,
        height: "58%"
    },
    homeScrollView: {
        marginTop: 15,
        paddingVertical: 5,
        paddingHorizontal: 20,
        height: "43%",
        borderWidth: 1,
        borderColor: baseColor,
        borderStyle: 'dashed'
    },
    scrollInnerView:{
        height: 25
    },
    statisticsView: {
        padding: 10,
        marginTop: 0,
    },
    statisticsInnerView: {
        width: "50%",
        height: "100%",
        padding: 5,
        paddingTop: 0,
        paddingLeft: 20
    },
    daysTitleView: {
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 10,
        padding: 5
    },
    daysContentView: {
        height: "83%",
        padding: 5
    },
    daysScrollView: {
        paddingHorizontal: 10,
        width: "90%"
    },
    timerView: {
        marginHorizontal: 10,
        width: "90%",
        height: "27%"
    },
    timerInnerView: {
        width: "70%",
        height: "70%",
        padding: 10
    },
    timeView: {
        width: "20%",
        height: "100%"
    },
    inputFormView: {
        padding: 20,
        margin: 20,
        borderWidth: 1,
        borderColor: baseColor
    },
    inputScrollView: {
        height: 40,
        width: 40,
        borderWidth: 1
    },
    inputView: {
        height: 60,
        padding: 10,
        marginTop: 10,
        borderWidth:1,
        borderColor: baseColor,
        borderRadius: 12,
    },
    calendarView: {
        height: "95%"
    },
    scheduleCircle: {
        width: 6,
        height: 6,
        borderRadius: 50,
        margin: 2
    },
    calendarDateView: {
        height: 55,
        margin: 4,
        width: 50,
        paddingHorizontal: 5
    },
    calendarCircleView: {
        width:"100%",
        overflow: 'hidden'
    },


    topBoundary: {
        borderTopWidth: 2,
        borderTopColor: baseColor
    },
    bottomBoundary: {
        borderBottomWidth: 2,
        borderBottomColor: baseColor
    },
    statisticsLeftBoundary: {
        borderRightWidth: 1,
        borderColor: baseColor,
    },
    statisticsRightBoundary: {
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: "dashed"
    },
    scheduleBoundary: {
        borderBottomWidth: 1,
        borderColor: lightColor,
        paddingVertical: 10
    },

    flexRowBetween: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    flexRowCenter: {
        flexDirection: "row",
        justifyContent: "center"
    },
    

    topText: {
        fontSize: 23,
        marginTop: 2,
        color: 'white',
        fontWeight: "500"
    },
    todayText: {
        fontSize: 25,
        fontWeight: "bold",
        color: 'black'
    },
    homeTitleText: {
        margin: 5,
        fontSize: 23,
        fontWeight: "bold",
        color: baseColor,
        alignSelf: "center"
    },
    daysTitleText: {
        marginLeft: 7,
        fontSize: 25,
        color: 'black'
    },
    daysDateText: {
        width: "50%",
        fontSize: 25,
        fontWeight: "bold",
        color: 'black',
        paddingLeft: 5
    },
    homeContentText: {
        marginHorizontal: 5,
        fontSize: 18,
        color: 'black'
    },
    statisticsContentText: {
        marginLeft: 10,
        fontSize: 18,
        color: 'black'
    },
    scrollViewText: {
        fontSize: 16,
        marginLeft: 10,
        color: 'black'
    },
    daysScheduleText: {
        fontSize: 18,
        marginLeft: 10,
        color: 'black'
    },
    timerMiniText:{
        fontSize: 12,
        color: Colors.blue700
    },
    timerInfoText: {
        fontSize: 12,
        paddingTop: 5,
        color: Colors.grey500,
        textAlign: "center"
    },
    timerText: {
        fontSize: 30,
        color: 'black',
        textAlign: "center"
    },
    buttonText: {
        color: 'white',
        alignSelf: "center"
    },
    textInput: {
        padding: 5,
        fontSize: 20
    },
    calendarDateText: {
        width: 40,
        height: 40,
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        paddingTop: 7,
        marginVertical: 3,
        borderRadius: 20,
        borderWidth: 0.1,
        borderColor: lightColor
    },
    todayColorText:{
        color: 'white',
        backgroundColor: baseColor
    },


    timeSettingButton: {
        width: 90,
        height: 40,
        padding: 10,
        borderRadius: 5,
        backgroundColor: baseColor
    },
    modalButton: {
        width: 100,
        height: 45,
        margin: 10,
        padding: 8,
        borderRadius: 5,
        backgroundColor: baseColor
    },

    alignCenter: {
        alignSelf: "center"
    }
});