import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ImageBackground, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const DailyShopItem = ({ item }) => {
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
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={{ uri: `https://media.valorant-api.com/weaponskinlevels/${item.Rewards[0].ItemID}/displayicon.png` }}
                    resizeMode="contain"
                    style={styles.rotatedImage}
                />
            </View>
            <View style={styles.textContainer}>
                <Text variant="titleLarge" style={styles.titleText}>
                    {name}
                </Text>
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
        backgroundColor: "#1F2326",
        borderRadius: 20,
        flex: 1,
        width: 300,
    },
    imageContainer: {
        flex: 1,
        margin: 16,
        borderRadius: 16,
        backgroundColor: "#7e7e7e",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    rotatedImage: {
        width: "100%",
        height: "100%",
        transform: [{ rotate: "45deg" }],
    },
    textContainer: {
        flexDirection: "column",
        padding: 10,
        justifyContent: "flex-start",
        gap: 10,
    },
    titleText: {
        color: "white",
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        justifyContent: "flex-start",
    },
    priceImage: {
        width: 32,
        height: 32,
    },
    priceText: {
        color: "white",
        fontSize: 16,
    },
});

export default DailyShopItem;
