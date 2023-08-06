import axios from "axios";
import { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const WeaponCard = ({ item }) => {
    const [name, setName] = useState<string>("");
    const itemId = item.Rewards[0].ItemID;
    const windowWidth = Dimensions.get("window").width;

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
        <View style={[styles.card, { width: windowWidth / 2 - 8 }]}>
            <View style={styles.textContainer}>
                <Text variant="titleLarge" style={styles.titleText}>
                    {name}
                </Text>
            </View>
            <ImageBackground
                source={{
                    uri:
                        "https://media.valorant-api.com/weaponskinlevels/" +
                        item.Rewards[0].ItemID +
                        "/displayicon.png",
                }}
                resizeMode="contain"
                style={styles.imageBackground}
            />
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
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#1F2326",
        borderRadius: 20,
        overflow: "hidden",
        padding: 8,
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
    imageBackground: {
        width: 200,
        height: 100,
        transform: [{ rotate: "45deg" }],
        aspectRatio: 2,
        top: 40,
        right: -40
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

export default WeaponCard;
