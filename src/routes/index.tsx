import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    Login,
    Home,
    Bundles,
    Settings,
} from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CustomTabBar } from "../components/Navigation/CustomTabBar";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { AuthContext } from "../api/authProvider";
import toast from "../helpers/toast";
import { authLogic } from "../api/authLogic";
import NumberInputScreen from "../screens/Multifactor";

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
    return (
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} >
            <Tab.Screen options={{ headerShown: false }} name="Store" component={HomeStackScreen} />
            <Tab.Screen options={{ headerShown: false }} name="Bundles" component={Bundles} />
            <Tab.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen
                name="HomeStack"
                component={Home}
            />
        </HomeStack.Navigator>
    );
}

const Routers = () => {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "RESTORE_TOKEN":
                    return {
                        ...prevState,
                        accessToken: action.accessToken,
                        entitlementToken: action.entitlementToken,
                        isLoading: false,
                    };
                case "SIGN_IN":
                    return {
                        ...prevState,
                        isSignout: false,
                        accessToken: action.accessToken,
                        entitlementToken: action.entitlementToken,
                    };
                case "SIGN_OUT":
                    return {
                        ...prevState,
                        isSignout: true,
                        accessToken: null,
                        entitlementToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            accessToken: null,
            entitlementToken: null,
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            const accessToken = await SecureStore.getItemAsync("access_token");
            const entitlementToken = await SecureStore.getItemAsync("entitlements_token");
            dispatch({ type: "RESTORE_TOKEN", accessToken: accessToken, entitlementToken: entitlementToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async () => {
                const accessToken = await SecureStore.getItemAsync("access_token");
                const entitlementToken = await SecureStore.getItemAsync("entitlements_token");
                dispatch({ type: "SIGN_IN", accessToken: accessToken, entitlementToken: entitlementToken });
            },
            signOut: async () => {
                await SecureStore.deleteItemAsync("access_token");
                await SecureStore.deleteItemAsync("entitlements_token");
                dispatch({ type: "SIGN_OUT" })
            },
        }),
        []
    );

    const onLayoutRootView = async () => await SplashScreen.preventAutoHideAsync();

    useEffect(() => {
        onLayoutRootView();
    }, []);

    const [fontsLoaded] = useFonts({
        Tungsten: require("../../assets/fonts/Tungsten-Bold.ttf"),
        DrukWide: require("../../assets/fonts/Druk-Wide-Bold.ttf"),
        Inter: require("../../assets/fonts/Inter.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    } else {
        SplashScreen.hideAsync();
    }

    return (
        <AuthContext.Provider value={authContext}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {state.accessToken == null || state.entitlementToken == null ? (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Multifactor" component={NumberInputScreen} />
                    </>
                ) : (
                    <Stack.Screen name="Home" component={HomeTabs} />
                )}
            </Stack.Navigator>
        </AuthContext.Provider>
    );
};
export default Routers;
