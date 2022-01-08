import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Center, Button, Icon, Flex, Box, Avatar, ScrollView } from 'native-base';
import CustomButton from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SECONDARY_COLOR } from '../../consts/color';
import { HomeProvider, HomeContext } from './Context';
import MatchingScreen from '../Matching';
import ChatBoxScreen from '../Chat';
import SettingScreen from '../Setting';
import CustomCard from '../../components/Card';
import { SafeAreaView } from 'react-native-safe-area-context';


const styles = StyleSheet.create({
    bottomNavbar: {
        height: 50,
        padding: 10,
        backgroundColor: "#fff",
        flexDirection: "row",
    },
    alertNotification: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    timeLine: {
        padding: 15,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        borderRadius: 10
    },
    actionButtonArea: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        justifyContent: "center"
    },
    actionButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: 60,
        width: 60,
        padding: 15,
        borderRadius: 60,
        backgroundColor: "#fff"
    },
    cardArea: {
        paddingLeft: 15,
        paddingRight: 15,
        flexGrow: 1
    }
})

function BottomNavbar() {
    const { setIndexScreen, indexScreen } = React.useContext(HomeContext)

    const handleTabClick = (index: number) => {
        setIndexScreen(index)
    }
    
    return (
        <View style={styles.bottomNavbar}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => handleTabClick(0)}
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Icon as={Ionicons} color={SECONDARY_COLOR} name={indexScreen === 0 ? "home" : "home-outline"} size="md" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => handleTabClick(1)}
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Icon as={Ionicons} color={SECONDARY_COLOR} name={indexScreen === 1 ? "heart" : "heart-outline"} size="md" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => handleTabClick(2)}
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Icon as={Ionicons} color={SECONDARY_COLOR} name={indexScreen === 2 ? "chatbox" : "chatbox-outline"} size="md" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <TouchableOpacity
                    onPress={() => handleTabClick(3)}
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Icon as={Ionicons} color={SECONDARY_COLOR} name={indexScreen === 3 ? "settings" : "settings-outline"} size="md" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

function HomeScreen() {
    const { t, i18n } = useTranslation();
    const initialState = { like: false, notLike: false }
    const cardActionType = {
        LIKE: "LIKE",
        NOT_LIKE: "NOT_LIKE",
        RESET: "RESET"
    }
    
    const cardReducer = (state: any, action: any) => {
        switch (action.type) {
            case cardActionType.LIKE:
                return { ...initialState, like: true }
            case cardActionType.NOT_LIKE:
                return { ...initialState, notLike: true }
            case cardActionType.RESET:
                return { ...initialState }
            default:
                return state
        }
    }
    const [cardState, cardDispatch] = React.useReducer(cardReducer, initialState)
    const cardRef = React.useRef(cardState)
    const onPanResponderRelease = (panX: Number, panY: Number) => {
        cardDispatch({ type: cardActionType.RESET })
    }
    const onPanResponderMove = React.useCallback((panX: any, panY: Number) => {
        const limtiLeft = -30
        const limtiRight = 30
        if (panX < limtiLeft && !cardRef.current.notLike) {
            cardDispatch({ type: cardActionType.NOT_LIKE })
        }
        if (panX > limtiRight && !cardRef.current.like) {
            cardDispatch({ type: cardActionType.LIKE })
        }
    }, [cardRef])

    React.useEffect(()=> {
        cardRef.current = cardState
    })

    return (
        <View style={{ flex: 4, flexDirection: "column" }}>
            <View style={styles.alertNotification}>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 30,
                        height: 30,
                    }}
                >
                    <Icon as={Ionicons} color={SECONDARY_COLOR} name="notifications" size="sm" />
                </TouchableOpacity>
            </View>
            <View style={styles.cardArea} >
                <CustomCard {...cardState} onPanResponderMove={onPanResponderMove} onPanResponderRelease={onPanResponderRelease} urlImage={"https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg"} />
            </View>
            <View style={styles.actionButtonArea} >
                <TouchableOpacity style={{ ...styles.actionButton, marginRight: 10 }}>
                    <Icon as={Ionicons} color={SECONDARY_COLOR} name="close-outline" size="35px" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Icon as={Ionicons} color={"#16a34a"} name="star" size="30px" />
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.actionButton, marginLeft: 10 }}>
                    <Icon as={Ionicons} color={"#0ea5e9"} name="heart" size="30px" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default (props: any) => {
    const [indexScreen, setIndexScreen] = React.useState(0)
    const renderScreen = (): Element => {
        const mapIndexToScreen: any = {
            0: <HomeScreen />,
            1: <MatchingScreen />,
            2: <ChatBoxScreen {...props} />,
            3: <SettingScreen />,
        }
        return mapIndexToScreen[indexScreen]
    }
    return (
        <HomeProvider value={{
            indexScreen,
            setIndexScreen
        }}>
            <SafeAreaView style={{ flex: 1 }}>
                {renderScreen()}
                <BottomNavbar />
            </SafeAreaView>
        </HomeProvider>
    )
};
