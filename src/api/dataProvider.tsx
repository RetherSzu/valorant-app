import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const requestWithHeaders = async (options) => {
    try {
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.error(`Error in ${options.url}:`, error);
        return null;
    }
};

export const dataProvider = {

    async getUserInfo() {
        const accessToken = await SecureStore.getItemAsync("access_token");
        const options = {
            method: "GET",
            url: "https://auth.riotgames.com/userinfo",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        };

        const response = await requestWithHeaders(options);
        if (response && response.data && response.data.sub) {
            await SecureStore.setItemAsync("sub", response.data.sub);
        }
    },

    async getDailyShop() {
        let sub = await SecureStore.getItemAsync("sub");
        if (!sub) {
            await this.getUserInfo();
            sub = await SecureStore.getItemAsync("sub");
        }

        const accessToken = await SecureStore.getItemAsync("access_token");
        const entitlementsToken = await SecureStore.getItemAsync("entitlements_token");
        const options = {
            method: "GET",
            url: "https://pd.eu.a.pvp.net/store/v2/storefront/" + sub,
            headers: {
                Authorization: "Bearer " + accessToken,
                "X-Riot-Entitlements-JWT": " " + entitlementsToken,
            },
        };

        const response = await requestWithHeaders(options);
        if (response && response.data && response.data.SkinsPanelLayout.SingleItemStoreOffers) {
            await AsyncStorage.setItem("bundles", JSON.stringify(response.data.FeaturedBundle.Bundles));
            await AsyncStorage.setItem("offers", JSON.stringify(response.data.SkinsPanelLayout.SingleItemStoreOffers));
        } else {
            await SecureStore.deleteItemAsync("access_token");
            await SecureStore.deleteItemAsync("entitlements_token");
            await AsyncStorage.removeItem("bundles");
            await AsyncStorage.removeItem("offers");
        }
    },

    async getBundle(bundleId: string) {
        const options = {
            method: "GET",
            url: `https://valorant-api.com/v1/bundles/${bundleId}`,
        };

        const response = await requestWithHeaders(options);
        return response ? response.data.data : null;
    },

    async getBuddie(buddieId: string) {
        const options = {
            method: "GET",
            url: `https://valorant-api.com/v1/buddies/levels/${buddieId}`,
        };

        const response = await requestWithHeaders(options);
        return response ? response.data : null;
    },

    async getPlayerCard(itemId: string) {
        const options = {
            method: "GET",
            url: "https://valorant-api.com/v1/playercards/" + itemId,
        };

        try {
            const response = await axios.request(options);
            return response.data;
        } catch (_) {
            // Nothing to do
        }
    },
};
