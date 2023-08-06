import { useCallback } from "react";
import Svg, { Text, TSpan } from "react-native-svg";

export const SvgComponent = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={515}
            height={130}
            viewBox="0 0 515 130"
            {...props}
        >
            <Text
                transform="translate(1 103)"
                fill="none"
                stroke="#707070"
                strokeWidth={1}
                fontSize={100}
                fontFamily="DrukWide"
                fontWeight={700}
            >
                <TSpan x={0} y={0}>
                    STORE
                </TSpan>
            </Text>
        </Svg>
    );
};

export default SvgComponent;
