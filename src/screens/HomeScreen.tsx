import { View, Text } from 'react-native'
import React, { FC, useState } from 'react'
import { commonStyles } from '../styles/commonStyles';
import HomeHeader from '../components/Home/HomeHeader';

const  HomeScreen:FC = () => {
 
  return (
    <View style={commonStyles.baseContainer}>
      <HomeHeader/>
    </View>
  )
}

export default  HomeScreen;