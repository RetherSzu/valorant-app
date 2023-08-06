import React from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export const AuthContext = React.createContext(null);

const BASE_URL = "https://auth.riotgames.com/api/v1/authorization";
const CLIENT_ID = "play-valorant-web-prod";
const REDIRECT_URI = "https://playvalorant.com/opt_in";

const commonOptions = {
    url: BASE_URL,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
};

const commonData = {
    client_id: CLIENT_ID,
    nonce: "1",
    redirect_uri: REDIRECT_URI,
    response_type: "token id_token",
    scope: "account openid",
};

export const authProvider = {

    async authCookies() {
        const options = {
            ...commonOptions,
            method: "POST",
            data: commonData,
        };

        try {
            return await axios.request(options);
        } catch (error) {
            return error;
        }
    },

    async cookieReauth() {
        const ssid = await SecureStore.getItemAsync("ssid");

        const options = {
            method: "GET",
            url: "https://auth.riotgames.com/authorize",
            params: commonData,
            headers: {
                ...commonOptions.headers,
                cookie: ssid,
            },
        };

        try {
            return await axios.request(options);
        } catch (error) {
            return error;
        }
    },

    async getToken() {
        const [username, password, tdid, asid, clid] = await Promise.all([
            SecureStore.getItemAsync("username"),
            SecureStore.getItemAsync("password"),
            SecureStore.getItemAsync("tdid"),
            SecureStore.getItemAsync("asid"),
            SecureStore.getItemAsync("clid"),
        ]);

        const options = {
            ...commonOptions,
            method: "PUT",
            headers: {
                ...commonOptions.headers,
                cookie: `${tdid};${asid};${clid}`,
            },
            data: {
                ...commonData,
                type: "auth",
                username: username,
                password: password,
                remember: false,
                language: "en_US",
            },
        };

        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async multifactorAuth(code: string) {
        const [tdid, asid, clid] = await Promise.all([
            SecureStore.getItemAsync("tdid"),
            SecureStore.getItemAsync("asid"),
            SecureStore.getItemAsync("clid"),
        ]);

        const options = {
            ...commonOptions,
            method: "PUT",
            headers: {
                ...commonOptions.headers,
                cookie: `${tdid};${asid};${clid}`,
            },
            data: {
                type: "multifactor",
                code: code,
                rememberDevice: false
            }
        }

        try {
            const response = await axios.request(options);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    async getEntitlement() {
        const accessToken = await SecureStore.getItemAsync("access_token");

        const options = {
            method: "POST",
            url: "https://entitlements.auth.riotgames.com/api/token/v1",
            headers: {
                ...commonOptions.headers,
                Authorization: "Bearer " + accessToken,
            },
            data: {}
        };

        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async getUserCredentials() {
        const username = await SecureStore.getItemAsync("username");
        const password = await SecureStore.getItemAsync("password");

        return [username, password]
    },
}