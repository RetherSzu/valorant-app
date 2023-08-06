import React from "react";
import { ActivityIndicator, StyleProp, Text, TouchableHighlight, ViewStyle } from "react-native";

interface ButtonProps {
    text: string,
    onPress?: any,
    onLongPress?: any,
    style?: StyleProp<ViewStyle>,
    icon?: any,
    backgroundColor?: string,
    underlayColor?: string,
    textStyle?: StyleProp<ViewStyle>,
    loading?: boolean
}

export const Button = ({
    text,
    onPress,
    onLongPress,
    style,
    icon,
    backgroundColor = "#FF4656",
    textStyle,
    underlayColor = "#FF465680",
    loading = false,
}: ButtonProps) => {
    return (
        <TouchableHighlight
            style={[{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: 56,
                borderRadius: 16,
                backgroundColor: backgroundColor,
                padding: 16,
                gap: 16,
            }, style]}
            underlayColor={underlayColor}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0}
        >
            <>
                {icon ? icon : null}
                {
                    loading ? <ActivityIndicator color="#fff" /> :
                        <Text
                            style={[{
                                color: "#FCFCFD",
                                fontSize: 16,
                                fontWeight: "600",
                                textAlign: "center",
                                flex: 1,
                            }, textStyle]}
                            allowFontScaling
                        >
                            {text}
                        </Text>
                }
            </>
        </TouchableHighlight>
    );
};