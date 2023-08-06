import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Text,
    DeviceEventEmitter,
    TouchableOpacity,
    Platform,
    ToastAndroid,
    View,
} from "react-native";
import { SHOW_TOAST_MESSAGE } from "../../constants/toast";

import Animated, {
    withTiming,
    useSharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";

const colors = {
    error: "#E53535",
    success: "#05A660",
    info: "#3772FF",
    warning: "#FF8800"
};

const Toast = () => {
    const [messageType, setMessageType] = useState(null);
    const [message, setMessage] = useState(null);
    const [description, setDescription] = useState(null);
    const timeOutRef = useRef(null);
    const [timeOutDuration, setTimeOutDuration] = useState(5000);
    const animatedOpacity = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: animatedOpacity.value,
        };
    }, []);

    const onNewToast = data => {
        if (Platform.OS === "android" && data.useNativeToast) {
            return ToastAndroid.show(data.message, ToastAndroid.LONG);
        }
        if (data.duration) {
            setTimeOutDuration(data.duration);
        }
        setMessage(data.message);
        setMessageType(data.type);
        setDescription(data.description)
    };

    const closeToast = useCallback(() => {
        setMessage(null);
        setTimeOutDuration(5000);
        animatedOpacity.value = withTiming(0);
        clearInterval(timeOutRef.current);
    }, [animatedOpacity]);

    useEffect(() => {
        if (message) {
            timeOutRef.current = setInterval(() => {
                if (timeOutDuration === 0) {
                    closeToast();
                } else {
                    setTimeOutDuration(prev => prev - 1000);
                }
            }, 1000);
        }

        return () => {
            clearInterval(timeOutRef.current);
        };
    }, [closeToast, message, timeOutDuration]);

    useEffect(() => {
        if (message) {
            animatedOpacity.value = withTiming(1, { duration: 1000 });
        }
    }, [message, animatedOpacity]);

    useEffect(() => {
        DeviceEventEmitter.addListener(SHOW_TOAST_MESSAGE, onNewToast);

        return () => {
            DeviceEventEmitter.removeAllListeners();
        };
    }, []);

    if (!message) {
        return null;
    }

    return (
        <Animated.View
            style={[
                {
                    position: "absolute",
                    bottom: 160,
                    left: 16,
                    right: 16,
                    padding: 16,
                    backgroundColor: "#FCFCFD",
                    zIndex: 1,
                    borderRadius: 12,
                },
                animatedStyle,
            ]}>
            <TouchableOpacity
                onPress={closeToast}
                style={{
                    flexDirection: "row", alignItems: "center",
                    gap: 16,
                }}>
                <View style={{ gap: 2, justifyContent: "center" }}>
                    <Text
                        style={{
                            color: colors[messageType],
                            fontSize: 16,
                        }}>
                        {message}
                    </Text>
                    {description ? <Text
                        style={{
                            color: "#484C56",
                            fontSize: 14,
                            fontWeight: "400"
                        }}>
                        {description}
                    </Text> : null}
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default Toast;