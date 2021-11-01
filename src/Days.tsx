import React, { useEffect, useState } from "react"
import { View, Text, Alert } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from "react-native-paper";
import { styles } from './styles'
import  getDayFormatting  from "./function/getDayFormatting"

export default function Days() {
    const today = getDayFormatting(new Date().toString().substring(0, 15));

    return 
}