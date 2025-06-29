import { SafeAreaView, ScrollView, View, } from 'react-native'
import React, { FC,  } from 'react'
import { commonStyles } from '../styles/commonStyles';
import HomeHeader from '../components/Home/HomeHeader';
import Misc from '../components/Home/Misc';
import Options from '../components/Home/Options';
import SendReceiveButton from '../components/Home/SendReceiveButton';
import AbsoluteQRBottom from '../components/Home/AbsoluteQRBottom';

const  HomeScreen:FC = () => {
 
  return (
    <SafeAreaView style={commonStyles.baseContainer}>
    <HomeHeader/>
    <ScrollView contentContainerStyle={{paddingBottom:100,padding:15,marginTop:15,}} showsVerticalScrollIndicator={false}>
    <SendReceiveButton/> 
    <Options isHome/>
    <Misc/>
    </ScrollView>
    <AbsoluteQRBottom/>
    </SafeAreaView>
  )
}

export default  HomeScreen;