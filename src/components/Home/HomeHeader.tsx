import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native';
import { commonStyles } from '../../styles/commonStyles';
import { homeHeaderStyles } from '../../styles/homeHeaderStyles';
import Icon from '../Global/Icon';


const HomeHeader = () => {
     const [isVisible , setVisible]= useState(false);
  return (
    <View style={homeHeaderStyles.mainContainer}>
        <SafeAreaView/>
        <View style={[commonStyles.flexRowBetween, homeHeaderStyles.container]}>
            <TouchableOpacity>
                <Icon iconFamaly='Ionicons' name='menu' size={22} color='#fff'/>
            </TouchableOpacity>
           
            <Image style={homeHeaderStyles.logo} source={require('../../assets/images/AppIcon.png')}
        />


            <TouchableOpacity>
            <Image source={require('../../assets/images/profile.jpg')} style={homeHeaderStyles.profile}/>
            </TouchableOpacity>

        </View>
      
    </View>
  )
}

export default HomeHeader