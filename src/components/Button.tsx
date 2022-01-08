import { Icon, View } from "native-base";
import React from "react"
import {
    Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity,
} from "react-native"
import { SECONDARY_COLOR } from '../consts/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

type IProps = {
    style?: any,
    textStyle?: any,
    children?: string,
    onPress?: () => void
}

const styles = StyleSheet.create({
    submit: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 30,
        borderWidth: 0,
        borderColor: '#fff',
        width: 130
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
    }
})

const CustomButton: React.FC<IProps> = ({ children, onPress, style, textStyle, ...rest }) => {
    return (
        <TouchableOpacity
            style={{ ...styles.submit, ...style }}
            onPress={onPress}
        >
            <Text style={{...styles.submitText, ...textStyle}}>{children}</Text>
        </TouchableOpacity >
    )
}

export default CustomButton