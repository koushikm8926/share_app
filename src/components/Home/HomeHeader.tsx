import { View,  TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native';
import { commonStyles } from '../../styles/commonStyles';
import { homeHeaderStyles } from '../../styles/homeHeaderStyles';
import Icon from '../Global/Icon';
import Svg,{Path, Defs,LinearGradient, Stop  } from 'react-native-svg';
import { screenHeight,  svgPath } from '../../utils/Constants';
import { Dimensions } from 'react-native';
import QRGenerateModal from '../modals/QRGenerateModal';

const HomeHeader = () => {

     const [isVisible , setVisible] = useState(false);
     const { width: screenWidth } = Dimensions.get('window');

  return (
    <SafeAreaView style={homeHeaderStyles.mainContainer}>
        {/* <SafeAreaView/> */}

        <View style={[commonStyles.flexRowBetween, homeHeaderStyles.container]}>
          
            <TouchableOpacity>
                <Icon iconFamily="Ionicons" name='menu' size={22} color='#fff'/>
            </TouchableOpacity>

    <View style={{ marginLeft:37,}}>
          <Image style={homeHeaderStyles.logo} source={require('../../assets/images/AppIcon.png')}/>
    </View>
          
                <TouchableOpacity onPress={()=>setVisible(true)} style={{  padding: 10 }} >
            <Image source={require('../../assets/images/profile.jpg')} style={homeHeaderStyles.profile}/>
            </TouchableOpacity>           
        </View>




      <Svg height={screenHeight*0.20} width={screenWidth + 2} viewBox='0 0 1440 20' style={[homeHeaderStyles.curve, ]} pointerEvents="none">
            <Defs>
                <LinearGradient id='grad' x1="0" y1="0" x2="0" y2='1' >
                    <Stop offset="0%" stopColor="#007AFF" stopOpacity="1" />
                    <Stop  offset="100%" stopColor="#80BFFF" stopOpacity="1"/> 
                </LinearGradient>
            </Defs>
            <Path fill="#80BFFF" d={svgPath}/>
            <Path fill="url(#grad)" d={svgPath}/>
      </Svg>
      {isVisible && <QRGenerateModal onClose={()=>setVisible(false)} visible={isVisible}/>  }
    </SafeAreaView>
  )
}

export default HomeHeader