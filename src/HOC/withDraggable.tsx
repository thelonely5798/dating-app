import { Icon, Image, View } from "native-base";
import React, { useEffect } from "react"
import {
    Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, PanResponder,
    Animated
} from "react-native"
import { SECONDARY_COLOR } from '../consts/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const withDraggable = (WrappedComponent: any) => ({ ...props }) => {
    const pan = React.useRef(new Animated.ValueXY()).current;

    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
            },
            onPanResponderMove: (e, gesture) => {
                props.onPanResponderMove(pan.x._value, pan.y._value)
                Animated.event(
                    [
                        null,
                        { dx: pan.x, dy: pan.y }
                    ],
                    { useNativeDriver: false }
                )(e, gesture)
            },
            onPanResponderRelease: () => {
                props.onPanResponderRelease(pan.x._value, pan.y._value)
                pan.setValue({ x: 0, y: 0 })
            }
        })
    ).current;
    return (
        <Animated.View
            style={{
                flex: 1,
                transform: [{ translateX: pan.x }, { translateY: pan.y }]
            }}
            {...panResponder.panHandlers}>
            <WrappedComponent {...props} />
        </Animated.View>
    );
}
export default withDraggable;
