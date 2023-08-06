import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import NumericKeyboard from "../../components/Keyboard/NumericKeyboard";
import { authLogic } from "../../api/authLogic";
import { Button } from "../../components/Button/Button";
import { HeadingOne } from "../../components/Typographies/Headings/HeadingOne";
import { AuthContext } from "../../api/authProvider";

const NumberInputScreen = ({ navigation }) => {
    const [inputs, setInputs] = useState<string[]>(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState<boolean>(false)
    const { signIn } = React.useContext(AuthContext);

    const handleNumberPress = (number) => {
        if (number === "clear") {
            setInputs(["", "", "", "", "", ""]);
        } else {
            const nextInputIndex = inputs.indexOf("") !== -1 ? inputs.indexOf("") : inputs.length - 1;
            if (nextInputIndex >= 0) {
                const updatedInputs = [...inputs];
                updatedInputs[nextInputIndex] = number.toString();
                setInputs(updatedInputs);
            }
        }
    };

    const login = async () => {
        if (loading) return;
        setLoading(true);
        if (await authLogic.multifactor(inputs.join(""))) {
            const entitlement = await authLogic.getEntitlement();
            if (!entitlement) {
                setLoading(false);
                return;
            }

            await signIn();
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <HeadingOne
                text="Multifactor"
                textColor="#fff"
                style={{
                    fontFamily: "Inter",
                    fontSize: 24,
                    fontStyle: "normal",
                    fontWeight: "500",
                }}
            />
            <Text
                style={{
                    fontFamily: "Inter",
                    fontSize: 16,
                    fontStyle: "normal",
                    fontWeight: "400",
                    color: "#fff",
                }}
            >You will receive a email from RIOT with a code, you need to put i below</Text>
            <View style={styles.inputsContainer}>
                {inputs.map((input, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={input}
                    />
                ))}
            </View>
            <NumericKeyboard onNumberPress={handleNumberPress} />
            <Button text="Valid" onPress={() => login()} loading={loading} style={{ width: "100%" }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f1923",
        gap: 16,
        padding: 16,
    },
    inputsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 8,
        alignItems: "center",
        marginBottom: 20,
    },
    input: {
        width: 50,
        height: 50,
        fontSize: 24,
        borderWidth: 1,
        borderColor: "#FF4656",
        textAlign: "center",
        color: "#fff"
    }
});

export default NumberInputScreen;