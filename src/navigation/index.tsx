import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../views/Home';
import LoginScreen from '../views/Login';
import ChatBoxScreen from '../views/ChatBox';
import CustomText from '../components/Text';
const Stack = createNativeStackNavigator()

const Navigation = () => {
    return (
       <NavigationContainer>
           <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Home" options={{headerShown:false}}  component={HomeScreen} />
                <Stack.Screen name="Login" options={{headerShown:false}} component={LoginScreen} />
                <Stack.Screen name="ChatBox" options={({route}) => ({headerShown:true,headerTitle: () => <CustomText style={{fontSize: 20, fontWeight: "700"}}>{route.params.targetName}</CustomText>})} component={ChatBoxScreen} />
           </Stack.Navigator>
       </NavigationContainer>
    )
}

export default Navigation;