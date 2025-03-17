import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native';
import { commonStyles } from '../../styles/commonStyles';
import { homeHeaderStyles } from '../../styles/homeHeaderStyles';

const HomeHeader = () => {
     const [isVisible , setVisible]= useState(false);
  return (
    <View>
        <SafeAreaView/>
        <View style={[commonStyles.flexRowBetween, homeHeaderStyles.container]}>
            <TouchableOpacity>

            </TouchableOpacity>
        </View>
      
    </View>
  )
}

export default HomeHeader