import React from 'react';
import { TouchableOpacity } from 'react-native';
import SvgEyeSlash from "../Icons/EyeSlash";
import SvgEye from "../Icons/Eye";

export const EyePasswordButton = (props: { show: boolean, onPress: any }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: 50,
            }}
            onPress={props.onPress}
        >
            {props.show ? <SvgEyeSlash color="#fff" /> : <SvgEye color="#fff" />}
        </TouchableOpacity>
    );
};