import { View, StyleSheet } from "react-native";
import { dataProvider } from "../../api/dataProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Bundle, BundleInfos } from "../../type/type";
import BundleTabs from "../../components/Tabs/BundleTabs";
import { TitleHeader } from "../../components/Typographies/Headings/TitleHeader";

export default function Bundles() {
    const [bundles, setBundles] = useState<Bundle[]>([]);
    const [bundlesInfos, setBundlesInfos] = useState<BundleInfos[]>([]);
    const isDataLoaded = bundles.length > 0 && bundlesInfos.length > 0;

    useEffect(() => {
        const getBundles = async () => {
            const bundlesData: Bundle[] = JSON.parse(await AsyncStorage.getItem("bundles"));
            const bundlePromises: Promise<BundleInfos>[] = bundlesData.map((bundle: Bundle) =>
                dataProvider.getBundle(bundle.DataAssetID)
            );

            Promise.all(bundlePromises)
                .then((bundleInfosList) => {
                    setBundlesInfos(bundleInfosList);
                    setBundles(bundlesData);
                })
                .catch((error) => {
                    console.error("Error fetching bundle data:", error);
                });
        };

        getBundles();
    }, []);


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <TitleHeader name="BUNDLES" />
            </View>
            {isDataLoaded && <BundleTabs bundles={bundles} bundlesInfos={bundlesInfos} />}
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
        paddingTop: 20,
        paddingHorizontal: 16,
    },
});
