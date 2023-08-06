import React, { useEffect, useState } from "react";
import { Dimensions, Image, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { dataProvider } from "../../api/dataProvider";
import { Response } from "../../type/Response";
import { BuddieLevel } from "../../type/BuddieLevel";

const BuddieCard = ({ item }) => {
    const [itemInfo, setItemInfo] = useState<BuddieLevel | null>(null);
    const itemId = item.Item.ItemID;
    const windowWidth = Dimensions.get("window").width;

    useEffect(() => {
        const getBuddie = async () => {
            const response: Response<BuddieLevel> | null = await dataProvider.getBuddie(itemId);
            if (response !== null) {
                setItemInfo(response.data);
            }
        };

        getBuddie();
    }, [itemId]);

    if (itemInfo === null) {
        return null;
    }

    return (
        <View style={[styles.container, { width: (windowWidth - 32) / 2 - 8 }]}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: itemInfo.displayIcon }}
                    resizeMode="contain"
                    style={styles.image}
                />
            </View>
            <View style={styles.textContainer}>
                <Text variant="titleLarge" style={styles.titleText}>
                    {itemInfo.displayName}
                </Text>
                <View style={styles.priceContainer}>
                    <Image
                        source={require("../../../assets/vp.png")}
                        resizeMode="contain"
                        style={styles.priceImage}
                    />
                    <Text variant="titleLarge" style={styles.priceText}>
                        {item.BasePrice}
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
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
        padding: 8,
        borderRadius: 16,
        backgroundColor: "#7e7e7e",
        marginBottom: 0,
    },
    image: {
        flex: 1,
        width: "100%",
        height: 175,
    },
    textContainer: {
        flexDirection: "column",
        padding: 8,
        justifyContent: "flex-start",
        gap: 8,
    },
    titleText: {
        color: "white",
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
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

export default BuddieCard;
