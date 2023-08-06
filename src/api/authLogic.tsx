import toast from "../helpers/toast";
import { authProvider } from "./authProvider";
import * as SecureStore from "expo-secure-store";

export const authLogic = {
    async checkAuthCookie(): Promise<string | boolean> {
        try {
            const response = await authProvider.authCookies();
            if (!response.headers["set-cookie"]) return false;

            const cookieMappings = {
                tdid: "tdid",
                asid: "asid",
                clid: "clid",
                ssid: "ssid"
            };

            let reauthPerformed = false;

            for (const rawCookie of response.headers["set-cookie"]) {
                const cookies = rawCookie.split(/[,;]/).map(c => c.trim());

                for (const cookie of cookies) {
                    const cookieName = Object.keys(cookieMappings).find(name => cookie.includes(name));
                    if (cookieName) {
                        await SecureStore.setItemAsync(cookieMappings[cookieName], cookie);
                        if (cookieName === "ssid" && !reauthPerformed) {
                            await this.cookieReauth();
                            reauthPerformed = true;
                        }
                    }
                }
            }

            return reauthPerformed ? "cookieReauth" : true;
        } catch (error) {
            toast.error({ message: "Error when retrieving authentication cookie: " + error.message });
            return false;
        }
    },

    async getToken(): Promise<string | boolean> {
        const response = await authProvider.getToken();

        if (response.type === "multifactor") return "multifactor";

        const responseURL = response.response.request["responseURL"];
        const tokenMatch = responseURL.match(/access_token=([^&]*)/);

        if (tokenMatch) {
            await SecureStore.setItemAsync("access_token", tokenMatch[1]);
            return true;
        }

        return false;
    },

    async multifactor(code: string): Promise<boolean> {
        try {
            const response = await authProvider.multifactorAuth(code);
            const responseURL = response.data.response.parameters.uri;
            const tokenMatch = responseURL.match(/access_token=([^&]*)/);

            if (tokenMatch) {
                await SecureStore.setItemAsync("access_token", tokenMatch[1]);
                return true;
            }

            return false;
        } catch (error) {
            toast.error({ message: "Multifactor: Token recovery error" + error.message });
            console.error(error);
            return false;
        }
    },

    async cookieReauth(): Promise<void> {
        try {
            const response = await authProvider.cookieReauth();
            const tokenMatch = response.response.request["responseURL"].match(/access_token=([^&]*)/);
            if (tokenMatch) {
                await SecureStore.setItemAsync("access_token", tokenMatch[1]);
                await this.getEntitlement();
            } else {
                throw new Error("Access token not found");
            }
        } catch (error) {
            toast.error({ message: "Cookie reauth: " + error.message });
        }
    },

    async getEntitlement(): Promise<boolean> {
        try {
            const response = await authProvider.getEntitlement();
            const entitlementsToken = response.entitlements_token;

            if (entitlementsToken) {
                await SecureStore.setItemAsync("entitlements_token", entitlementsToken);
                return true;
            }

            throw new Error("Entitlements token not found");
        } catch (error) {
            toast.error({ message: error.message });
            return false;
        }
    }
}
