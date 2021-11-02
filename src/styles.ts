import { StyleSheet } from "react-native";
import { Colors } from 'react-native-paper';

export const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: 5,
    },
    topView: {
        height: 40,
        backgroundColor: Colors.deepPurpleA400
    },
    dayView: {
        margin: 15,
        marginTop: 30,
        width: "50%",
        alignSelf: "center"
    },
    homeTodayView: {
        padding: 5,
        margin: 10,
        marginBottom: 0,
        height: "60%"
    },
    homeInnerView: {
        padding: 5,
        margin: 5,
    },
    iconTextView: {
        flexDirection: 'row',
        margin: 3,
    },
    scrollView: {
        marginTop: 10,
        paddingLeft: 20,
        height: "40%"
    },
    scrollInnerView:{
        margin: 5,
    },
    homeStatisticsView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 15,
        marginTop: 0
    },
    homeStatisticsInnerView: {
        width: "50%",
        height: "100%",
        padding: 5,
        paddingLeft: 20
    },


    bottomBoundary: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.deepPurple900
    },
    statisticsLeftBoundary: {
        borderRightWidth: 1,
        borderColor: Colors.deepPurple400,
    },
    statisticsRightBoundary: {
        borderWidth: 1,
        borderColor: Colors.white,
        borderStyle: "dashed"
    },
    

    topText: {
        fontSize: 25,
        marginTop: 2,
        color: Colors.white
    },
    dayText: {
        fontSize: 23,
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


    textCenter: {
        alignSelf: "center",
    }
});