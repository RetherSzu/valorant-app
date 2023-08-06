import { StyleSheet, View, FlatList, StatusBar } from "react-native";
import { dataProvider } from "../../api/dataProvider";
import { IconButton } from "react-native-paper";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loading } from "../../components/Utils/Loading";
import { TitleHeader } from "../../components/Typographies/Headings/TitleHeader";
import { AuthContext } from "../../api/authProvider";
import DailyShopItemTest from "../../components/CardItem/DailyShopItemTest";

export default function Home() {
    const [imageList, setImageList] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    const { signOut } = useContext(AuthContext)
    useEffect(() => {
        const getDailyShop = async () => {
            setLoading(true);
            await dataProvider.getDailyShop();
            const offers = await AsyncStorage.getItem("offers");
            if (offers === null) {
                signOut();
            }
            let jsonOffers = JSON.parse(offers);
            await setImageList(jsonOffers === null ? [] : jsonOffers);
            setLoading(false);
        };
        getDailyShop();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar animated={true} backgroundColor="#FF4656" />
            <View style={{ flex: 1, width: "100%", height: "100%" }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 16,
                        justifyContent: "space-between",
                    }}
                >
                    <TitleHeader name="STORE" />
                    <IconButton
                        icon="replay"
                        iconColor="#FF4656"
                        size={28}
                        style={{ backgroundColor: "#0f1923" }}
                        onPress={() => console.log("Pressed")}
                    />
                </View>
                {loading ? <Loading /> : imageList.length === 0 ? null :
                    <View style={{ flex: 1, marginBottom: 16 }}>
                        <View style={styles.row}>
                            <DailyShopItemTest key={0} item={imageList[0]} />
                            <DailyShopItemTest key={1} item={imageList[1]} />
                        </View>
                        <View style={styles.row}>
                            <DailyShopItemTest key={2} item={imageList[2]} />
                            <DailyShopItemTest key={3} item={imageList[3]} />
                        </View>
                    </View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF4656",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 16,
    },
    row: {
        height: "50%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 16
    },
});
