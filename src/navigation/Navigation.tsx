
 import React, { FC } from 'react'
 import{createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '../utils/NavigationUtil';
import HomeScreen from '../screens/HomeScreen';
import SendScreen from '../screens/SendScreen';
import SplashScreen from '../screens/SplashScreen';
import ConnectionScreen from '../screens/ConnectionScreen';
import ReceiveScreen from '../screens/ReceiveScreen';
import ReceivedFileScreen from '../screens/ReceivedFileScreen';




const Stack=createNativeStackNavigator(); 

 const Navigation:FC = () => { 
   return (
    <NavigationContainer ref={navigationRef}>
       <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
        <Stack.Screen name='SendScreen' component={SendScreen}/>
        <Stack.Screen name='SplashScreen' component={SplashScreen}/>
        <Stack.Screen name='ConnectionScreen' component={ConnectionScreen}/>
        <Stack.Screen name='ReceiveScreen' component={ReceiveScreen}/>
        <Stack.Screen name='ReceivedFileScreen' component={ReceivedFileScreen}/>
       </Stack.Navigator>
    </NavigationContainer>
   )
 }
 
 export default Navigation