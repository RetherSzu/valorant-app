import { StyleSheet, View } from "react-native"
import { IconButton, Text } from "react-native-paper"

export const TitleHeader = ({ name = "" }: { name: string }) => {

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
            }}
        >
            <View style={styles.triangleLeft}></View>
            <Text
                variant="displaySmall"
                style={{
                    color: "#fff",
                    fontFamily: "DrukWide"
                }}
            >
                {name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    triangleLeft: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderTopWidth: 0,
        borderRightWidth: 8,
        borderBottomWidth: 14,
        borderLeftWidth: 8,
        borderTopColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "#fff",
        borderLeftColor: "transparent",
        transform: [{ rotate: "-90deg" }],
    },
});