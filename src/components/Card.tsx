import { Icon, Image, View } from "native-base";
import React, { forwardRef, useEffect } from "react"
import {
    Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity,  PanResponder,
    Animated
} from "react-native"
import { SECONDARY_COLOR } from '../consts/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from "./Text";
import withDraggable from '../HOC/withDraggable';

type IProps = {
    style?: any,
    textStyle?: any,
    children?: string,
    urlImage: string,
    ref: any,
    like?: boolean,
    notLike?: boolean,
    onPanResponderRelease: (x: Number, y: Number) => void
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
        borderWidth: 1,
        borderColor: '#fff',
        width: 130
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
    },
    avatarCard: {
        flex: 4,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    userInfo: {
        padding: 10,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    }
})

let CustomCard: React.FC<IProps> = ({ children, ref, notLike, like, urlImage, style, textStyle, ...rest }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.avatarCard}>
                <Image
                    source={{
                        uri: urlImage
                    }}
                    alt="Alternate Text"
                    size="xl"
                    width="full"
                    style={{flex: 1}}
                />
            </View>
            {like && (
                <View style={{ position: "absolute", left: 20, top: 50, borderRadius: 10, padding: 10, transform: [{ rotate: "-45deg" }], borderWidth: 5, borderColor: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CustomText style={{ fontSize: 40, fontWeight: "700", color: "#22c55e" }}>Like</CustomText>
                </View>
            )}
            {notLike && (
                <View style={{ position: "absolute", right: 20, top: 50, borderRadius: 10, padding: 10, transform: [{ rotate: "45deg" }], borderWidth: 5, borderColor: "#fb7185", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CustomText style={{ fontSize: 40, fontWeight: "700", color: "#fb7185" }}>Nope</CustomText>
                </View>
            )}
            <View style={styles.userInfo}>
                <CustomText style={{ fontSize: 26, fontWeight: "700" }}>Alessandra</CustomText>
                <CustomText style={{ fontSize: 20 }}>NY, California</CustomText>
            </View>
        </View>
    )
}

export default withDraggable(CustomCard)