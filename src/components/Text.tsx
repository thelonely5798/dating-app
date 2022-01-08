import React from "react"
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native"

type IProps = {
    style? : object,
    children: any,
}
const styles = StyleSheet.create({
    text : {
        color: "#71717a",
        fontFamily: "nunito"
    }
})
const CustomText: React.FC<IProps> = ({children, style, ...rest}) => {
    return <Text {...rest} style={{...styles.text, ...style}}>{children}</Text>
}

export default CustomText