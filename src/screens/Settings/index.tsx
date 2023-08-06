import { useContext } from "react";
import { View, StyleSheet, ToastAndroid, ScrollView, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../api/authProvider";
import axios from "axios";
import { TitleHeader } from "../../components/Typographies/Headings/TitleHeader";

const SettingButton = ({ icon, pressed, label, loading }) => {
    return (
        <Button
            icon={icon}
            mode="contained"
            onPress={() => {
                pressed();
            }}
            accessibilityRole="button"
            contentStyle={{
                padding: 10,
            }}
            buttonColor="#FF465680"
            textColor="#fff"
            rippleColor="#FF4656"
            style={{
                borderRadius: 16,
            }}
            loading={loading}
        >
            {label}
        </Button>
    );
};

export default function Settings() {
    const [loading, setLoading] = useState(false);
    const { signOut } = useContext(AuthContext)

    const clearAsyncStorage = async () => {
        await setLoading(true);
        await SecureStore.deleteItemAsync("username");
        await SecureStore.deleteItemAsync("password");
        await SecureStore.deleteItemAsync("sub");
        await SecureStore.deleteItemAsync("tdid");
        await SecureStore.deleteItemAsync("asid");
        await SecureStore.deleteItemAsync("clid");
        await SecureStore.deleteItemAsync("ssid");
        await SecureStore.deleteItemAsync("access_token");
        await SecureStore.deleteItemAsync("entitlements_token");
        await AsyncStorage.clear().then(() =>
            ToastAndroid.showWithGravity(
                "All stored data deleted",
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            )
        );
        signOut();
        await setLoading(false);
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <TitleHeader name="SETTINGS" />
            </View>
            <ScrollView
                style={{
                    backgroundColor: "#1F2326",
                    padding: 16,
                    borderRadius: 20,
                    height: "100%",
                }}
                contentContainerStyle={{
                    gap: 16,
                    justifyContent: "space-between",
                }}
                showsVerticalScrollIndicator={false}
            >
                <SettingButton
                    icon="cog-refresh"
                    pressed={clearAsyncStorage}
                    label="Delete all stored data"
                    loading={loading}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF4656",
        justifyContent: "center",
        gap: 16,
        padding: 16,
    },
});
