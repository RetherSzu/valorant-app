import React, { useState, useRef } from "react";
import { View, Animated } from "react-native";
import { Button } from "../Button/Button";
import { BundleInfos } from "../../type/type";
import BuddieCard from "../CardItem/BuddieCard";
import PlayerBannerCard from "../CardItem/PlayerBannerCard";
import BundleItem from "../Bundle/BundleItem";

const BundleTabs = ({ bundles, bundlesInfos }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 400],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const imageHeight = scrollY.interpolate({
        inputRange: [0, 400],
        outputRange: [175, 0],
        extrapolate: "clamp",
    });

    const scrollViewHeight = scrollY.interpolate({
        inputRange: [0, 400],
        outputRange: [235, 60],
        extrapolate: "clamp",
    });

    const renderThumbnail = () => {
        if (bundlesInfos.length > 0 && selectedTab < bundlesInfos.length) {
            return (
                <Animated.Image
                    source={{ uri: bundlesInfos[selectedTab].displayIcon }}
                    resizeMode="stretch"
                    style={{
                        width: "100%",
                        borderRadius: 16,
                        height: imageHeight,
                        opacity: headerOpacity
                    }}
                />
            )
        }
        return null;
    }

    const renderTabs = () => {
        return bundlesInfos.map((bundle: BundleInfos, index: number) => (
            <Button
                key={"bundle_tab_" + index}
                onPress={() => setSelectedTab(index)}
                text={bundle.displayName}
                backgroundColor={selectedTab === index ? "#FF4656" : "#FF465680"}
                style={{
                    flex: 1,
                    flexShrink: 1,
                    width: "100%",
                    height: "100%",
                    padding: 8,
                    borderRadius: 20,
                }}
            />
        ));
    };

    return (
        <View style={{ flex: 1, width: "100%", gap: 8 }}>
            <Animated.View style={{ position: "relative", height: scrollViewHeight }}>
                <Animated.View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        flexDirection: "column",
                        gap: 8
                    }}
                >
                    {renderThumbnail()}
                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            backgroundColor: "#1F2326",
                            borderRadius: 100,
                            gap: 8,
                            padding: 8,
                        }}
                    >
                        {renderTabs()}
                    </View>
                </Animated.View>
            </Animated.View>
            {
                bundles.length > 0 && selectedTab < bundles.length ?
                    <Animated.FlatList
                        numColumns={2}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                        columnWrapperStyle={{ gap: 8 }}
                        style={{ marginBottom: 8 }}
                        contentContainerStyle={{ gap: 8 }}
                        data={bundles[selectedTab].Items}
                        renderItem={({ item }) => {
                            if (item.Item.ItemTypeID === "dd3bf334-87f3-40bd-b043-682a57a8dc3a") {
                                return <BuddieCard item={item} />;
                            } else if (item.Item.ItemTypeID === "3f296c07-64c3-494c-923b-fe692a4fa1bd") {
                                return <PlayerBannerCard item={item} />;
                            }
                            return <BundleItem item={item} />;
                        }}
                        keyExtractor={(item) => item.Item.ItemID}
                        showsHorizontalScrollIndicator={false}
                        indicatorStyle="white"
                    /> : null
            }
        </View >
    );
};

export default BundleTabs;
