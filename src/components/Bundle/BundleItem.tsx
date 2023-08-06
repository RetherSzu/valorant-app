import axios from "axios";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { SkinLevels } from "../../type/type";
import { Dimensions } from 'react-native';

export const BundleItem = ({ item }) => {
    const [itemInfo, setItemInfo] = useState<SkinLevels>(null);
    const itemId = item.Item.ItemID;
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        const getWeapon = async () => {

            let url = "https://valorant-api.com/v1/weapons/skinlevels/";
            if (item.Item.ItemTypeID === "d5f120f8-ff8c-4aac-92ea-f2b5acbe9475") {
                url = "https://valorant-api.com/v1/sprays/";
            }

            const options = {
                method: "GET",
                url: url + itemId,
            };

            try {
                const response = await axios.request(options);
                setItemInfo(response.data.data);
            } catch (_) {
                // Nothing to do
            }
        };

        getWeapon();
    }, [])

    if (itemInfo === null) {
        return null;
    }


    return (
        <View
            style={{
                backgroundColor: "#1F2326",
                borderRadius: 20,
                width: windowWidth - 32,
            }}
        >
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 8,
                    padding: 8,
                    borderRadius: 16,
                    backgroundColor: "#7e7e7e",
                    marginBottom: 0,
                }}
            >
                <Image
                    source={{ uri: itemInfo.fullTransparentIcon ?? itemInfo.displayIcon }}
                    resizeMode="contain"
                    style={{
                        flex: 1,
                        width: "100%",
                        height: 175,
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
                    {itemInfo ? itemInfo.displayName : null}
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
                    <Text
                        variant="titleLarge"
                        style={{ color: "white", fontSize: 16 }}
                    >
                        {item.BasePrice}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default BundleItem;