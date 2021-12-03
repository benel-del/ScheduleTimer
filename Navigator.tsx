import React, { useCallback } from "react";
import { Colors } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IconArrow from 'react-native-vector-icons/MaterialIcons'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import type { RouteProp, ParamListBase } from "@react-navigation/native"

import Home from "./src/Home";
import Monthly from "./src/Monthly";
import Daily from "./src/Daily";
import { getDateForm, getMonthForm } from "./src/function";
import { useTodayDateContext } from "./src/provider";

const Tab = createBottomTabNavigator()
type TabBarIconProps = {
    focused: boolean,
    color: string,
    size: number
}

const icons: Record<string, string[]> = {
    Home: ["home", "home-outline"],
    Daily: ["calendar", "calendar-outline"],
    Monthly: ["calendar-month", "calendar-month-outline"]
}

const arrowSize = 35
export default function Navigator(){
    const screenOptions = useCallback(({route}: {route: RouteProp<ParamListBase, string>}) => {
        return {
            headerStyle: {
                backgroundColor: Colors.blue900//Colors.deepPurple400
            },
            headerTitleStyle: {
                color: 'white',
                fontSize: 22
            },
            headerShown: false,
            tabBarIcon: ({focused, color, size}: TabBarIconProps) => {
                const {name} = route
                const focusedSize = focused ? size + 3 : size
                const focusedColor = focused ? Colors.blue900 : color
                const [icon, iconOutline] = icons[name]
                const iconName = focused ? icon : iconOutline

                return <Icon name={iconName} size={focusedSize} color={focusedColor} />
            }
        }
    }, [])

    let date = getDateForm(new Date())
    let month = getMonthForm(new Date())

    return (
        <Tab.Navigator screenOptions = {screenOptions}>
            <Tab.Screen name = "Home" component = {Home} options={() => ({
                title: "Study Timer",
                tabBarLabel: "home",
                tabBarLabelStyle: {fontSize: 15},
                tabBarLabelPosition: "beside-icon",
                headerTitleAlign: "center"
            })}/>
            <Tab.Screen name = "Daily" component = {Daily} options={() => ({
                title: date,
                tabBarLabel: "daily",
                tabBarLabelStyle: {fontSize: 15},
                tabBarLabelPosition: "beside-icon",
                headerTitleAlign: "center",
                headerLeft: () => <IconArrow name="navigate-before" size={arrowSize} color='white' onPress={() => console.log("left")}/>,
                headerLeftContainerStyle :{paddingLeft: 5},
                headerRight: () => <IconArrow name="navigate-next" size={arrowSize} color='white' onPress={() => console.log("right")}/>,
                headerRightContainerStyle: {paddingRight: 5}
            })}/>
            <Tab.Screen name = "Monthly" component = {Monthly} options={() => ({
                title: month,
                tabBarLabel: "monthly",
                tabBarLabelStyle: {fontSize: 15},
                tabBarLabelPosition: "beside-icon",
                headerTitleAlign: "center",
                headerLeft: () => <IconArrow name="navigate-before" size={arrowSize} color='white' onPress={() => console.log("left")}/>,
                headerLeftContainerStyle :{paddingLeft: 5},
                headerRight: () => <IconArrow name="navigate-next" size={arrowSize} color='white' onPress={() => console.log("right")}/>,
                headerRightContainerStyle: {paddingRight: 5}
            })}/>
        </Tab.Navigator>
    )
}