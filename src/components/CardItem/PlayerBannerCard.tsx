import axios from "axios";
import { useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import { Text } from "react-native-paper";
import { PlayerCard } from "../../type/type";
import { dataProvider } from "../../api/dataProvider";

export const PlayerBannerCard = ({ item: { Item: { ItemID }, BasePrice } }) => {
    const [itemInfo, setItemInfo] = useState<PlayerCard | null>(null);
    const windowWidth = Dimensions.get("window").width;
    const cardWidth = (windowWidth - 32) / 2 - 8;
    const imageWidth = (windowWidth - 32) / 2 - 24;

    useEffect(() => {
        const getWeapon = async () => {
            try {
                const response: any = await dataProvider.getPlayerCard(ItemID);
                setItemInfo(response.data);
            } catch (error) {
                // Handle error if needed
            }
        };

        getWeapon();
    }, [ItemID]);

    if (!itemInfo) {
        return null;
    }

    return (
        <View
            style={{
                backgroundColor: "#1F2326",
                borderRadius: 20,
                width: cardWidth,
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 8,
                    borderRadius: 16,
                    backgroundColor: "#7e7e7e",
                    marginBottom: 0,
                    overflow: "hidden",
                    width: imageWidth,
                    height: 192,
                    position: "relative",
                }}
            >
                <Image
                    source={{ uri: itemInfo?.largeArt }}
                    resizeMode="center"
                    style={{
                        width: "100%",
                        height: "100%",
                        top: "50%",
                        transform: [{ scale: 2 }],
                    }}
                />
            </View>
            <View
                style={{
                    flexDirection: "column",
                    padding: 8,
                    justifyContent: "flex-start",
                    gap: 8,
                }}
            >
                <Text variant="titleLarge" style={{ color: "white" }}>
                    {itemInfo.displayName}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                        justifyContent: "flex-start",
                    }}
                >
                    <Image
                        source={require("../../../assets/vp.png")}
                        resizeMode="contain"
                        style={{ width: 32, height: 32 }}
                    />
                    <Text variant="titleLarge" style={{ color: "white", fontSize: 16 }}>
                        {BasePrice}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default PlayerBannerCard;
