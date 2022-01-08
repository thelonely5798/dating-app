import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, GestureResponderEvent } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Center, Button, Icon, Flex, Box, Avatar, ScrollView, StatusBar, Input } from 'native-base';
import CustomButton from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SECONDARY_COLOR } from '../../consts/color';
import CustomText from '../../components/Text';
import { useRoute } from '@react-navigation/native';
import { contractAddress, getMessagesByTarget, myContract, web3 } from '../../web3';
import { useAppSelector } from '../../redux/store';
import { selectPrivateKey, selectAddress, isLogined } from '../../redux/slices/userSlice';
import { sendMessageByContract, getMessagesBySender } from '../../web3/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextDecoder } from 'util';



const LineChatForTarget = (props: any) => {
    const { content, timeStamp } = props
    return (
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 5 }}>
            <View>
                <Box style={{ padding: 5 }}>
                    <Avatar size={"md"} source={{ uri: "https://i0.wp.com/danongonline.com.vn/wp-content/uploads/2019/12/gai-tay-xinh-4-e1575601138915.jpg?resize=624%2C624&ssl=1" }} />
                </Box>
            </View>
            <View>
                <View style={{ padding: 6, borderRadius: 10, backgroundColor: "#fb7185" }}><CustomText style={{ fontSize: 14, color: "#fff", fontWeight: "700" }}>{content}</CustomText></View>
            </View>
        </View>
    );
}
const LineChatForSelf = (props: any) => {
    const { content, timeStamp } = props
    return (
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", marginTop: 5 }}>
            <View>
                <View style={{ padding: 6, borderRadius: 10, backgroundColor: "#fb7185" }}><CustomText style={{ fontSize: 14, color: "#fff", fontWeight: "700" }}>{content}</CustomText></View>
            </View>
        </View>
    );
}
const ChatBox = (props: any) => {
    const address = useAppSelector(selectAddress)
    const [messagesBySender, setMessagesBySender] = React.useState<Array<any>>([])
    const [messagesByTarget, setMessagesByTarget] = React.useState<Array<any>>([])
    const [allMessages, setAllMessages] = React.useState<Array<any>>([])
    const [input, setInput] = React.useState("")
    const scrollViewRef = React.useRef()

    const fetchMessagesBySender = async () => {
        const messages = await getMessagesBySender({ from: address, to: "0x6481f0608a71F4dF7c3Bd43247d6FaFe8d716207" })
        setMessagesBySender(messages);
    };

    const fetchMessagesByTarget = async () => {
        const messages = await getMessagesByTarget({ from: address, to: "0x6481f0608a71F4dF7c3Bd43247d6FaFe8d716207" })
        setMessagesByTarget(messages);
    };

    const sendMessage = async () => {
        let _input = input
        setInput("")
        setMessagesBySender((messages) => [...messages, { content: _input, from: address, timeStamp: Date.now() }])
        await sendMessageByContract({ from: address, to: "0x6481f0608a71F4dF7c3Bd43247d6FaFe8d716207", content: _input })
        fetchMessagesBySender()
    }

    React.useEffect(() => {
        const p1 = fetchMessagesByTarget()
        const p2 = fetchMessagesBySender()

        Promise.all([p1,p2]).then(()=>{
            scrollViewRef.current?.scrollToEnd({anime: true})
        })
        const refresheMessage = setInterval(()=>{
            fetchMessagesByTarget()
        }, 2000)
        return (()=> {
            clearInterval(refresheMessage)
        })
    }, [])
 
    React.useEffect(() => {
        let allMessages = [...messagesBySender, ...messagesByTarget].sort((a, b) => Number(a.timeStamp) - Number(b.timeStamp))
        setAllMessages(allMessages)
    }, [messagesByTarget, messagesBySender])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor="#fff" />
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ScrollView ref={scrollViewRef}  style={{ flexGrow: 1, padding: 10}} contentContainerStyle={{paddingBottom: 30}}>
                        {allMessages && (
                            allMessages.map((message) => {
                                const { from, timeStamp } = message
                                const render = () => {
                                    if (from === address) {
                                        return <View key={timeStamp}><LineChatForSelf  {...message} /></View>
                                    }
                                    return <View key={timeStamp}><LineChatForTarget {...message} /></View>
                                }
                                return render();
                            })
                        )}
                    </ScrollView>
                </TouchableWithoutFeedback>
                <View >
                    <Input InputRightElement={
                        <Button backgroundColor={SECONDARY_COLOR} onPress={sendMessage} size="xs" rounded="none" w="1/6" h="full">
                            Gửi
                        </Button>
                    } height={50} onChangeText={setInput} value={input} placeholder='Nhập tin nhắn tại đây' />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ChatBox;