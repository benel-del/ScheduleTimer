import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { styles } from './styles'
import  getMonthFormatting  from "./function/getMonthFormatting"

export default function Months() {
    const month = getMonthFormatting(new Date().toString().substring(0, 15));

    return
}