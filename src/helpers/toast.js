import { DeviceEventEmitter } from "react-native";
import { SHOW_TOAST_MESSAGE } from "../constants/toast";

const toast = {
    error: options => {
        DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, { ...options, type: "error" });
    },
    success: options => {
        DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, { ...options, type: "success" });
    },
    info: options => {
        DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, { ...options, type: "info" });
    },
    warning: options => {
        DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, { ...options, type: "warning" });
    },
};

export default toast;