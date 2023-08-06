import * as React from "react";
import { Pressable, TouchableHighlight, TouchableOpacity, View } from "react-native";
import SvgBundle from "../Icons/Bundle";
import SvgSetting from "../Icons/Setting";
import SvgShop from "../Icons/Shop";

const IconTabBar = ({ iconName, color, onPress, onLongPress }) => {
    let icon: JSX.Element = <h1>not found</h1>;

    switch (iconName) {
        case "Shop":
            icon = <SvgShop color={color} />;
            break;
        case "Bundle":
            icon = <SvgBundle color={color} />;
            break;
        case "Setting":
            icon = <SvgSetting color={color} />;
            break;
    }

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            android_ripple={{ color: "#FF4656", borderless: true }}
            style={{ padding: 4}}
        >
            {icon}
        </Pressable>
    );
}

export function CustomTabBar({ state, descriptors, navigation }) {
    const iconTabBarName: string[] = [
        "Shop",
        "Bundle",
        "Setting"
    ];

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                gap: 16,
                padding: 16,
                marginTop: 0,
                backgroundColor: "#1B1D21",
            }}
        >
            {
                state.routes.map((route, index) => {
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => navigation.emit({ type: "tabLongPress", target: route.key });

                    return (
                        <IconTabBar
                            key={index}
                            iconName={iconTabBarName[index]}
                            color={isFocused ? "#FF4656" : "#7A7B7E"}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        />
                    );
                })
            }
        </View>
    );
}
