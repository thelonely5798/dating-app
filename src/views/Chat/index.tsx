import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Center, Button, Icon, Flex, Box, Avatar, ScrollView, StatusBar } from 'native-base';
import CustomButton from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SECONDARY_COLOR } from '../../consts/color';
import CustomText from '../../components/Text';
import { useNavigation } from '@react-navigation/native';
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
    },
    status: {
        marginRight: 10, height: 10, width: 10, borderRadius: 10, backgroundColor: "#22c55e"
    },
    chatListItem: { display: "flex", flexDirection: "row", backgroundColor: "#fff", height: 70, alignItems: "center" }
})

const ChatListItem = ({ }) => {
    const navigation = useNavigation()

    const navigateChatScreen = (props: any) => {
        navigation.navigate({name: "ChatBox", params : { targetName: "123"}})
    }
    return (
        <View style={{ flex: 1 }} >
            <TouchableOpacity style={styles.chatListItem} onPress={navigateChatScreen}>
                <View style={{ flex: 1 }}>
                    <Box style={{ padding: 5 }}>
                        <Avatar source={{ uri: "https://i0.wp.com/danongonline.com.vn/wp-content/uploads/2019/12/gai-tay-xinh-4-e1575601138915.jpg?resize=624%2C624&ssl=1" }} />
                    </Box>
                </View>
                <View style={{ flex: 4 }}>
                    <CustomText style={{ fontSize: 18, fontWeight: "700" }}>Alessandra</CustomText>
                    <CustomText style={{ fontSize: 14 }}>NY, California</CustomText>
                </View>
                <View style={styles.status}></View>
            </TouchableOpacity>
        </View>
    )
};

function ChatBoxScreen() {
    const { t, i18n } = useTranslation();
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor="#fff" />
            <View style={{ padding: 15 }}>
                <View style={styles.timeLine}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        <Box style={{ padding: 5 }}>
                            <Avatar source={{ uri: "https://i0.wp.com/danongonline.com.vn/wp-content/uploads/2019/12/gai-tay-xinh-4-e1575601138915.jpg?resize=624%2C624&ssl=1" }} />
                        </Box>
                        <Box style={{ padding: 5 }}>
                            <Avatar source={{ uri: "https://i0.wp.com/danongonline.com.vn/wp-content/uploads/2019/12/gai-tay-xinh-13-e1575601291865.jpg?resize=624%2C738&ssl=1" }} />
                        </Box>
                        <Box style={{ padding: 5 }}>
                            <Avatar source={{ uri: "https://media.tadicdn.com/media/image/s/tdtp/id/61137f5f0df938013d8bd87f.jpeg_640x" }} />
                        </Box>
                        <Box style={{ padding: 5 }}>
                            <Avatar source={{ uri: "https://i0.wp.com/danongonline.com.vn/wp-content/uploads/2019/12/gai-tay-xinh-4-e1575601138915.jpg?resize=624%2C624&ssl=1" }} />
                        </Box>
                        <Box style={{ padding: 5 }}>
                            <Avatar source={{ uri: "https://media-cdn.laodong.vn/storage/newsportal/2020/8/21/829850/Bat-Cuoi-Truoc-Nhung-09.jpg?w=720&crop=auto&scale=both" }} />
                        </Box>
                        <Box style={{ padding: 5 }}>
                            <Avatar source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMYZs0S9LijUFhuJxe72HYXcTIUsObXACf2w&usqp=CAU" }} />
                        </Box>
                    </ScrollView>
                </View>
            </View>
            <ChatListItem />
        </View>
    );
}


export default ChatBoxScreen