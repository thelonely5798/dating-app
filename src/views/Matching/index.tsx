import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Center, Button, Icon, Flex } from 'native-base';
import CustomButton from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SECONDARY_COLOR } from '../../consts/color';


function MatchingScreen() {
    const { t, i18n } = useTranslation();
    return (
        <View style={{ flex: 1 }}>
            <Text>MatchingScreen</Text>
        </View>
    );
}


export default MatchingScreen