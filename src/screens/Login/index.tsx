import { useEffect, useState, useContext } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { Button } from "../../components/Button/Button";
import { TextInput } from "../../components/Input/TextInput";
import SvgAvatar from "../../components/Icons/Avatar";
import { EyePasswordButton } from "../../components/Button/EyePasswordButton";
import { AuthContext } from "../../api/authProvider";
import toast from "../../helpers/toast";
import * as SecureStore from "expo-secure-store";
import { authLogic } from "../../api/authLogic";
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";
import { textStyle } from "../../styles/typography/textStyle";

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [show, setShow] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const { signIn } = useContext(AuthContext);
    const navigation = useNavigation();
    const [staySignIn, setStaySignIn] = useState(false);

    useEffect(() => {
        const relogin = async () => {
            const usernameSauv = await SecureStore.getItemAsync("username");
            const passwordSauv = await SecureStore.getItemAsync("password");

            if (usernameSauv !== null && passwordSauv !== null) {
                setUsername(usernameSauv);
                setPassword(passwordSauv);
                setStaySignIn(true);
                await login();
            }
        }
        relogin();
    }, []);

    const validateInputs = () => {
        if (username === "") {
            toast.info({ message: "Give your username" });
            return false;
        }

        if (password === "") {
            toast.info({ message: "Give your password" });
            return false;
        }

        return true;
    };

    const login = async () => {
        if (loading) return;
        setLoading(true);
        if (!validateInputs()) {
            setLoading(false);
            return;
        }

        try {

            if (staySignIn) {
                await SecureStore.setItemAsync("username", username);
                await SecureStore.setItemAsync("password", password);
            }

            const authCookie = await authLogic.checkAuthCookie();
            if (authCookie === "cookieReauth") {
                await signIn({ username, password });
                return;
            } else if (!authCookie) {
                setLoading(false);
                return;
            }

            const multifactor = await authLogic.getToken();
            if (!multifactor) {
                setLoading(false);
                return;
            } else if (multifactor === "multifactor") {
                // @ts-ignore
                navigation.navigate("Multifactor");
                return;
            }

            const entitlement = await authLogic.getEntitlement();
            if (!entitlement) {
                setLoading(false);
                return;
            }

            await signIn();
        } catch (error) {
            console.error("Login error:", error);
            setLoading(false);
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#1B1D21",
                justifyContent: "space-between",
                padding: 16,
                gap: 16,
            }}
        >
            <View style={{ gap: 16 }}>
                <StatusBar barStyle="light-content" backgroundColor="#0f1923" />
                <Text style={[textStyle.h3, { color: "#fff" }]}>Sign in</Text>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    icon={<SvgAvatar color="#fff" />}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={show}
                    icon={<EyePasswordButton show={show} onPress={() => setShow(!show)} />}
                    style={{ flexDirection: "row-reverse" }}
                />
                <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                    <Checkbox
                        status={staySignIn ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setStaySignIn(!staySignIn);
                        }}
                        uncheckedColor="#222429"
                        color="#FF4656"
                    />
                    <Text style={[textStyle.bodyMedium, { color: "#fff" }]}>Stay sign in ?</Text>
                </View>
            </View>
            <Button
                text="Login in"
                onPress={login}
                backgroundColor="#FF4656"
                underlayColor="#222429"
                loading={loading}
            />
        </SafeAreaView>
    );
}

export default Login;