import { View } from "react-native"
import { ActivityIndicator, Text } from "react-native-paper";

export const Loading = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <ActivityIndicator color="#FFF" size="large" />
        </View>
    )
}