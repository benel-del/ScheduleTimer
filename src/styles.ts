import { Dimensions, StyleSheet } from "react-native";
import { Colors } from 'react-native-paper';

const {width, height} = Dimensions.get("window")
const baseColor = Colors.blue900
const lightColor = Colors.blue800

export const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        padding: 5
    },
    contentView: {
        height: height * 0.75
    },
    topView: {
        height: height * 0.07,
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
        marginVertical: 5,
        width: width * 0.28
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
        height: height * 0.46
    },
    homeScrollView: {
        marginVertical: 8,
        paddingVertical: 5,
        height: height * 0.15,
        borderWidth: 1,
        borderColor: baseColor,
        borderStyle: 'dashed',
        borderRadius: 8
    },
    scrollInnerView:{
        height: 25,
        marginVertical: 5
    },
    statisticsView: {
        padding: 10,
        marginTop: 0,
    },
    statisticsInnerView: {
        flex: 1,
        padding: 5
    },
    daysTitleView: {
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 10,
        padding: 5
    },
    daysContentView: {
        height: height * 0.615,
        padding: 5
    },
    daysScrollView: {
        paddingHorizontal: 10,
        width: width * 0.88
    },
    timerView: {
        marginHorizontal: 10,
        width: width * 0.88,
        height: height * 0.18
    },
    timerInnerView: {
        width: width * 0.55,
        height: height * 0.11,
        padding: 10
    },
    timeView: {
        width: "20%",
        height: "100%"
    },
    inputFormView: {
        padding: 20,
        marginBottom: 20,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: baseColor,
        borderRadius: 10
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
        height: height * 0.07,
        width: width * 0.13,
        marginVertical: 5
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
        fontSize: 32,
        marginTop: 2,
        color: 'white'
    },
    todayText: {
        fontSize: 33,
        alignSelf: "center"
    },
    homeTitleText: {
        margin: 5,
        fontSize: 30,
        color: baseColor,
        alignSelf: "center"
    },
    daysTitleText: {
        marginTop: 3,
        marginLeft: 7,
        fontSize: 30
    },
    daysDateText: {
        width: "50%",
        fontSize: 25,
        paddingLeft: 5
    },
    homeContentText: {
        marginVertical: 3,
        marginHorizontal: 5,
        fontSize: 22
    },
    statisticsContentText: {
        marginLeft: 5,
        fontSize: 23
    },
    scrollViewText: {
        fontSize: 20,
        marginLeft: 10
    },
    daysScheduleText: {
        fontSize: 22,
        marginTop: 3,
        marginLeft: 10
    },
    timerMiniText:{
        fontSize: 18,
        color: Colors.blue700
    },
    timerInfoText: {
        fontSize: 18,
        paddingTop: 3,
        color: Colors.grey700,
        textAlign: "center"
    },
    timerText: {
        fontSize: 35,
        textAlign: "center"
    },
    buttonText: {
        color: 'white',
        alignSelf: "center"
    },
    textInput: {
        padding: 5,
        fontSize: 25,
        fontFamily: 'BinggraeSamanco'
    },
    inputInfoText: {
        fontSize: 20,
        padding: 10,
        marginVertical: 5,
        color: Colors.grey700
    },
    calendarDateText: {
        width: 45,
        height: 45,
        fontSize: 23,
        textAlign: 'center',
        alignSelf: 'center',
        padding: 10,
        marginBottom: 5,
        borderRadius: 25
    },
    todayColorText:{
        color: 'white',
        backgroundColor: baseColor
    },
    dateColorText: {
        backgroundColor: Colors.grey100
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