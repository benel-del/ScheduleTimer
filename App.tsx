import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { styles } from './src/styles'
import Navigator from "./Navigator";

export default function App(){
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Navigator/>
    </SafeAreaView>
  )
}
