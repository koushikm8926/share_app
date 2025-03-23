import { View, Text, Modal, } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { modalStyles } from '../../styles/modalStyles';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg'; 
import { multiColor } from '../../utils/Constants';

 
interface ModalProps {
  visible:boolean;
  onClose:()=>void;
}


const QRGenerateModal:FC <ModalProps> = ({visible , onClose}) => {
  const [loading, setLoading ]= useState(false);
  const [qrvalue, setQRValue] = useState('')
  const shimmerTranslateX= useSharedValue(-300)

  const shimmerStyle = useAnimatedStyle(()=>({
    transform:[{translateX:shimmerTranslateX.value}]
  }))

  useEffect(()=>{
    shimmerTranslateX.value= withRepeat(
      withTiming(300,{duration:1500,easing:Easing.linear}),
      -1, false,
    )
  },[visible])




  return (
    <Modal animationType='slide' visible={visible} presentationStyle='formSheet' onRequestClose={onClose} onDismiss={onClose}  >
     <View style={modalStyles.modalContainer}>
      <View style={modalStyles.qrContainer}>
          {
             loading || qrvalue ===null || qrvalue == '' ? (
              <View style={modalStyles.skeleton}>
                <Animated.View style={[modalStyles.shimmerOverlay,shimmerStyle]}>
                  <LinearGradient
                  colors={['#f3f3f3','#fff','#f3f3f3']}
                  start={{x:0, y:0}}
                  end={{x:1, y:0}}
                  style={modalStyles.shimmerGradient}
                  />
                </Animated.View>
              </View>
             ):(
              <QRCode 
              value={qrvalue} 
              size={250}
              logoSize={60}
              logoBackgroundColor='#fff'
              logoMargin={2}
              logoBorderRadius={10}
              logo={require('../../assets/images/AppIcon.png')}
              linearGradient={multiColor}
              enableLinearGradient 
              />
             )
          }
      </View>
      </View>
     
    </Modal>
  )
}

export default QRGenerateModal;