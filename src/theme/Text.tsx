import React from "react";
import type { FC, ComponentProps } from "react";
import { Text as RNText } from "react-native";

export type TextProps = ComponentProps<typeof RNText>

const color = 'black'
export const Text:FC<TextProps> = ({style, ...props}) => {
    return <RNText style={[{fontFamily: 'BinggraeSamanco', color: color}, style]} {...props} />
}

export const TextBold:FC<TextProps> = ({style, ...props}) => {
    return <RNText style={[{fontFamily: 'BinggraeSamanco-Bold', color: color}, style]} {...props} />
}
