import React, { useCallback } from "react";
import { Colors } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import type { RouteProp, ParamListBase } from "@react-navigation/native"

import Home from "./src/Home";
import Monthly from "./src/Monthly";
import Daily from "./src/Daily";

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

export default function Navigator(){
    const screenOptions = useCallback(({route}: {route: RouteProp<ParamListBase, string>}) => {
        return {
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

    return (
        <Tab.Navigator screenOptions = {screenOptions}>
            <Tab.Screen name = "Home" component = {Home} options={() => ({
                tabBarLabel: "home",
                tabBarLabelStyle: {fontSize: 21, fontFamily: 'BinggraeSamanco'},
                tabBarLabelPosition: "beside-icon"
            })}/>
            <Tab.Screen name = "Daily" component = {Daily} options={() => ({
                tabBarLabel: "daily",
                tabBarLabelStyle: {fontSize: 21, fontFamily: 'BinggraeSamanco'},
                tabBarLabelPosition: "beside-icon"
            })}/>
            <Tab.Screen name = "Monthly" component = {Monthly} options={() => ({
                tabBarLabel: "monthly",
                tabBarLabelStyle: {fontSize: 21, fontFamily: 'BinggraeSamanco'},
                tabBarLabelPosition: "beside-icon"
            })}/>
        </Tab.Navigator>
    )
}