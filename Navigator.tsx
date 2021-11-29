import React, { useCallback } from "react";
import { Colors } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import type { RouteProp, ParamListBase } from "@react-navigation/native"

import Home from "./src/Home";
import Months from "./src/Months";
import Days from "./src/Days";
import { getDayFormatting, getMonthFormatting } from "./src/function";

const Tab = createBottomTabNavigator()
type TabBarIconProps = {
    focused: boolean,
    color: string,
    size: number
}

const icons: Record<string, string[]> = {
    Home: ["home", "home-outline"],
    Days: ["calendar", "calendar-outline"],
    Months: ["calendar-month", "calendar-month-outline"]
}
export default function Navigator(){
    const screenOptions = useCallback(({route}: {route: RouteProp<ParamListBase, string>}) => {
        return {
            headerStyle: {
                backgroundColor: Colors.deepPurple400
            },
            headerTitleStyle: {
                color: 'white',
                fontSize: 22,
            },
            headerShown: false,
            tabBarIcon: ({focused, color, size}: TabBarIconProps) => {
                const {name} = route
                const focusedSize = focused ? size + 6 : size
                const focusedColor = focused ? Colors.purple900 : color
                const [icon, iconOutline] = icons[name]
                const iconName = focused ? icon : iconOutline

                return <Icon name={iconName} size={focusedSize} color={focusedColor} />
            }
        }
    }, [])

    let date = getDayFormatting(new Date())
    let month = getMonthFormatting(new Date())

    return (
        <Tab.Navigator screenOptions = {screenOptions}>
            <Tab.Screen name = "Home" component = {Home} options={() => ({
                title: "Study Timer"
            })}/>
            <Tab.Screen name = "Days" component = {Days} options={() => ({
                title: "date"//date
            })}/>
            <Tab.Screen name = "Months" component = {Months} options={() => ({
                title: "month"//month
            })}/>
        </Tab.Navigator>
    )
}