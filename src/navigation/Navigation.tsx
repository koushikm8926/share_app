
 import React, { FC } from 'react'
 import{createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '../utils/NavigationUtil';
import HomeScreen from '../screens/HomeScreen';
import SendScreen from '../screens/SendScreen';
import SplashScreen from '../screens/SplashScreen';




const Stack=createNativeStackNavigator(); 

 const Navigation:FC = () => { 
   return (
    <NavigationContainer ref={navigationRef}>
       <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
        <Stack.Screen name='SendScreen' component={SendScreen}/>
        <Stack.Screen name='SplashScreen' component={SplashScreen}/>
       </Stack.Navigator>
    </NavigationContainer>
   )
 }
 
 export default Navigation