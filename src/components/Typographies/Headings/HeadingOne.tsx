import { Text, StyleProp, TextStyle } from "react-native";

export const HeadingOne = ({ text, textColor = "#23262F", bold = false, style = {} }) => (
    <Text
        style={[
            HeadingOneStyle,
            {
                color: textColor,
                fontWeight: bold ? "700" : "500"
            },
            style,
        ]}
    >
        {text}
    </Text>
)

export const HeadingOneStyle: StyleProp<TextStyle> = {
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "500",
}