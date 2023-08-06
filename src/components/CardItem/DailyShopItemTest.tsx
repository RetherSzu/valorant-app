import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ImageBackground, View, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-paper";

const DailyShopItemTest = ({ item }) => {
    const [name, setName] = useState<string>("");
    const itemId = item.Rewards[0].ItemID;

    useEffect(() => {
        getWeaponData();
    }, []);

    const getWeaponData = async () => {
        const options = {
            method: "GET",
            url: "https://valorant-api.com/v1/weapons/skinlevels/" + itemId,
        };

        try {
            const response = await axios.request(options);
            setName(response.data.data.displayName);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.titleText}>
                {name}
            </Text>
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={{ uri: `https://media.valorant-api.com/weaponskinlevels/${item.Rewards[0].ItemID}/displayicon.png` }}
                    resizeMode="contain"
                    style={styles.rotatedImage}
                />
            </View>
            <View style={styles.textContainer}>
                <View style={styles.priceContainer}>
                    <Image
                        source={require("../../../assets/vp.png")}
                        resizeMode="contain"
                        style={styles.priceImage}
                    />
                    <Text variant="titleLarge" style={styles.priceText}>
                        {item.Cost[Object.keys(item.Cost)[0]]}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1F2326",
        borderRadius: 20,
        overflow: "hidden",
        gap: 0,
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    rotatedImage: {
        width: "100%",
        height: "100%",
        aspectRatio: 1,
        transform: [{ rotate: "30deg" }],
    },
    textContainer: {
        flexDirection: "column",
        padding: 16,
        justifyContent: "flex-start",
        gap: 10,
    },
    titleText: {
        color: "white",
        fontSize: 20,
        padding: 16,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        justifyContent: "flex-start",
    },
    priceImage: {
        width: 24,
        height: 24,
    },
    priceText: {
        color: "white",
        fontSize: 16,
    },
});

export default DailyShopItemTest;
