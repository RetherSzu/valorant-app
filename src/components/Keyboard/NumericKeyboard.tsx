import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button } from "../Button/Button";

const NumericKeyboard = ({ onNumberPress }) => {
    const handleNumberPress = (number) => {
        onNumberPress(number);
    };

    return (
        <View style={styles.numericKeyboard}>
            <View style={styles.row}>
                <Button text="1" style={styles.button} onPress={() => handleNumberPress(1)} />
                <Button text="2" style={styles.button} onPress={() => handleNumberPress(2)} />
                <Button text="3" style={styles.button} onPress={() => handleNumberPress(3)} />
            </View>
            <View style={styles.row}>
                <Button text="4" style={styles.button} onPress={() => handleNumberPress(4)} />
                <Button text="5" style={styles.button} onPress={() => handleNumberPress(5)} />
                <Button text="6" style={styles.button} onPress={() => handleNumberPress(6)} />
            </View>
            <View style={styles.row}>
                <Button text="7" style={styles.button} onPress={() => handleNumberPress(7)} />
                <Button text="8" style={styles.button} onPress={() => handleNumberPress(8)} />
                <Button text="9" style={styles.button} onPress={() => handleNumberPress(9)} />
            </View>
            <View style={styles.row}>
                <Button text="0" style={styles.button} onPress={() => handleNumberPress(0)} />
                <Button text="clear" style={styles.button} onPress={() => handleNumberPress("clear")} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    numericKeyboard: {
        flexDirection: "column",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 80,
        margin: 5,
        backgroundColor: "#383e3a",
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 24,
    },
});

export default NumericKeyboard;