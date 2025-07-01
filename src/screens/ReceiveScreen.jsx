import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {FC, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {sendStyles} from '../styles/sendStyles';
//import Icon from '../components/Global/Icon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../components/Global/CustomText';
import TextBreaker from '../components/Ui/TextBreaker';
import {Colors} from '../utils/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import QRGenerateModal from '../components/modals/QRGenerateModal';
import DeviceInfo from 'react-native-device-info';
import {goBack} from '../utils/NavigationUtil';

const ReceiveScreen: FC = () => {
  const [qrValue, setQrValue] = useState('');
  const [isScannerVisible, setIsScannerVisible] = useState(false);

  return (
    <LinearGradient
      colors={['#FFFFFF', '#4DA0DE', '#3387C5']}
      style={sendStyles.container}
      start={{x: 0, y: 1}}
      end={{x: 0, y: 0}}>
      <SafeAreaView />
      <View style={sendStyles.mainContainer}>
        <View style={sendStyles.infoContainer}>
          <Icon
            name="blur-on"
            iconFamily="MaterialIcons"
            color="#fff"
            size={40}
          />

          <CustomText
            color="#fff"
            fontFamily="Okra-Bold"
            fontSize={16}
            style={{marginTop: 20}}>
            Receiving from nearby device
          </CustomText>

          <CustomText
            color="#fff"
            fontFamily="Okra-Bold"
            fontSize={12}
            style={{textAlign: 'center'}}>
            Ensure your device is connected to the sender's hotspot network.
          </CustomText>

          <TextBreaker />

          <TouchableOpacity
            style={sendStyles.qrButton}
            onPress={() => setIsScannerVisible(true)}>
            <MaterialCommunityIcons
              name="qrcode"
              size={16}
              color={Colors.primary}
            />
            <CustomText fontFamily="Okra-Bold" color={Colors.primary}>
              Show QR
            </CustomText>
          </TouchableOpacity>
        </View>

        <View style={sendStyles.animationContainer}>
          <View style={sendStyles.lottieContainer}>
            <LottieView
              style={sendStyles.lottie}
              autoPlay
              loop={true}
              hardwareAccelerationAndroid
              source={require('../assets/animations/scan2.json')}
            />
          </View>
          <Image
            source={require('../assets/images/profile.jpg')}
            style={sendStyles.profileImage}
          />
        </View>

        <TouchableOpacity onPress={goBack} style={sendStyles.backButton}>
          <Icon
            name="arrow-back"
            iconFamily="Ionicons"
            size={16}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      {isScannerVisible && (
        <QRGenerateModal
          visible={isScannerVisible}
          onClose={() => setIsScannerVisible(false)}
        />
      )}
    </LinearGradient>
  );
};

export default ReceiveScreen;
