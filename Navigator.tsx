import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "./src/Home";
import Months from "./src/Months";
import Days from "./src/Days";


export default function Navigator(){
    const [index, setIndex] = useState<number>(1);
    const [routes] = useState([
        {key: 'scene1', title: 'Months', icon: 'calendar-month'},
        {key: 'scene2', title: 'Home', icon: 'home'},
        {key: 'scene3', title: 'Days', icon: 'calendar-today'},
    ]);
    const renderScene = BottomNavigation.SceneMap({
        scene1: Months,
        scene2: Home,
        scene3: Days,
    });

    return <BottomNavigation navigationState={{index, routes}} onIndexChange={setIndex} renderScene={renderScene}/>
}