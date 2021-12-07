import React from "react";
import type { FC, ComponentProps } from "react";
import { Text as RNText } from "react-native";

export type TextProps = ComponentProps<typeof RNText>

const color = 'black'
export const Text:FC<TextProps> = ({style, ...props}) => {
    const fontFamily = 'BinggraeSamanco'

    return <RNText style={[{fontFamily: fontFamily, color: color}, style]} {...props} />
}

export const TextBold:FC<TextProps> = ({style, ...props}) => {
    const fontFamily = 'BinggraeSamanco-Bold'

    return <RNText style={[{fontFamily: fontFamily, color: color}, style]} {...props} />
}
