import Color from "color";
import { StyleSheet } from "react-native";
import { Colors } from 'react-native-paper';

const baseBoundaryColor = Colors.deepPurple900//Colors.blueGrey700
const lightBoundaryColor = Colors.deepPurple400//Colors.blueGrey400
const topColor = Colors.deepPurple400//Colors.deepPurpleA400
const buttonColor = Colors.purple900 //Colors.blueGrey500

export const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: 5,
    },
    topView: {
        height: 50,
        padding: 5,
        backgroundColor: topColor
    },
    homeDateView: {
        margin: 15,
        marginTop: 30,
        padding: 5
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
        height: "60%"
    },
    homeScrollView: {
        marginTop: 10,
        paddingLeft: 20,
        height: "45%"
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
        paddingLeft: 20
    },
    daysTitleView: {
        marginTop: 20,
        marginHorizontal: 10,
        padding: 5
    },
    daysContentView: {
        padding: 5,
        height: 485
    },
    daysScrollView: {
        paddingHorizontal: 10,
        width: "90%"
    },
    timerView: {
        marginHorizontal: 10,
        width: "90%",
        height: "30%"
    },
    timerInnerView: {
        width: "70%",
        height: "80%",
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
        borderColor: baseBoundaryColor
    },
    inputScrollView: {
        height: 40,
        width: 40,
        borderWidth: 1
    },
    inputTextView: {
        height: 60,
        padding: 10,
        marginTop: 10,
        borderWidth:1,
        borderColor: lightBoundaryColor
    },
    inputTimeView: {
        height: 60,
        padding: 10,
        marginTop: 10,
        borderWidth:1,
        borderColor: lightBoundaryColor
    },


    topBoundary: {
        borderTopWidth: 2,
        borderTopColor: baseBoundaryColor
    },
    bottomBoundary: {
        borderBottomWidth: 2,
        borderBottomColor: baseBoundaryColor
    },
    statisticsLeftBoundary: {
        borderRightWidth: 1,
        borderColor: lightBoundaryColor,
    },
    statisticsRightBoundary: {
        borderWidth: 1,
        borderColor: Colors.white,
        borderStyle: "dashed"
    },
    scheduleBoundary: {
        borderBottomWidth: 1,
        borderColor: lightBoundaryColor,
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
        fontSize: 25,
        marginTop: 2,
        color: Colors.white
    },
    todayText: {
        fontSize: 25,
        fontWeight: "bold",
        color: Colors.black
    },
    homeTitleText: {
        margin: 7,
        padding: 3,
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.black,
        borderRadius: 10,
        backgroundColor: Colors.deepPurple50
    },
    daysTitleText: {
        marginLeft: 7,
        fontSize: 23,
        color: Colors.black,
    },
    daysDateText: {
        width: "50%",
        fontSize: 25,
        fontWeight: "bold",
        color: Colors.black,
        paddingLeft: 5
    },
    homeTodayContentText: {
        marginLeft: 5,
        fontSize: 20,
        color: Colors.black
    },
    homeStatisticsContentText: {
        marginLeft: 5,
        fontSize: 18,
        color: Colors.black
    },
    scrollViewText: {
        fontSize: 15,
        marginLeft: 10,
    },
    daysScheduleText: {
        fontSize: 18,
        marginLeft: 10,
        color: Colors.black
    },
    timerMiniText:{
        fontSize: 12,
        color: Colors.deepPurple700
    },
    timerInfoText: {
        fontSize: 12,
        paddingTop: 5,
        color: Colors.grey500,
        textAlign: "center"
    },
    timerText: {
        fontSize: 30,
        color: Colors.black,
        textAlign: "center"
    },
    buttonText: {
        color: Colors.white,
        alignSelf: "center"
    },

    textInput: {
        padding: 5,
        fontSize: 20,
    },

    timeSettingButton: {
        width: 90,
        height: 40,
        padding: 10,
        borderRadius: 5,
        backgroundColor: buttonColor
    },
    modalButton: {
        width: 100,
        height: 45,
        margin: 10,
        padding: 8,
        borderRadius: 5,
        backgroundColor: buttonColor
    },


    alignCenter: {
        alignSelf: "center"
    }
});