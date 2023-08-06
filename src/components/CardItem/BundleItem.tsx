import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import { useState } from "react";
import axios from "axios";

export const BundleItem = ({ item }) => {
    const [name, setName] = useState("");
    const itemId = item.Item.ItemID;
    const getWeapon = async () => {
        const options = {
            method: "GET",
            url: "https://valorant-api.com/v1/weapons/skinlevels/" + itemId,
        };

        await axios
            .request(options)
            .then(async (response) => {
                await setName(response.data.data.displayName);
            })
            .catch(async (error) => {
                await getBuddie();
            });
    };
    const getBuddie = async () => {
        const options = {
            method: "GET",
            url: "https://valorant-api.com/v1/buddies/levels/" + itemId,
        };

        await axios
            .request(options)
            .then(async (response) => {
                await setName(response.data.data.displayName);
            })
            .catch((error) => {
            });
    }

    getWeapon();



    return (
        <View
            style={{
                backgroundColor: "#1F2326",
                marginBottom: 16,
                borderRadius: 20,
                flex: 1,
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 16,
                    borderRadius: 16,
                    backgroundColor: "#7e7e7e",
                }}
            >
                <Image
                    source={{
                        uri:
                            "https://media.valorant-api.com/weaponskinlevels/" +
                            itemId +
                            "/displayicon.png",
                    }}
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
                    padding: 10,
                    justifyContent: "flex-start",
                    gap: 10,
                }}
            >
                <Text variant="titleLarge" style={{ color: "white" }}>
                    {name}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
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