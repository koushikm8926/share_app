import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { optionStyles } from '../../styles/optionsStyles';
import Icon from '../Global/Icon';
import CustomText from '../Global/CustomText';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Options:FC<{
  isHome?:boolean,
  onMediaPickUp?:(media:any)=>void;
  onFilePickUp?:(file:any)=>void
}>= ({isHome, onMediaPickUp, onFilePickUp}) => {
  return (
    <View style={optionStyles.container}>
    
     <TouchableOpacity style={optionStyles.subContainer} onPress={()=>{}}>
      <Icon name="images" iconFamily='Ionicons' color={Colors.primary} size={20}/>
      <CustomText fontFamily='Okra-Medium' style={{marginTop:4,textAlign:'center',}}>
        Photo
      </CustomText>
      </TouchableOpacity>

      <TouchableOpacity style={optionStyles.subContainer} onPress={()=>{}}>
      <Icon name="musical-notes-sharp" iconFamily='Ionicons' color={Colors.primary} size={20}/>
      <CustomText fontFamily='Okra-Medium' style={{marginTop:4,textAlign:'center',}}>
        Audio
      </CustomText>
      </TouchableOpacity>

      <TouchableOpacity style={optionStyles.subContainer} onPress={()=>{}}>
      <Icon name="folder-open" iconFamily='Ionicons' color={Colors.primary} size={20}/>
      <CustomText fontFamily='Okra-Medium' style={{marginTop:4,textAlign:'center',}}>
        Files
      </CustomText>
      </TouchableOpacity>

      <TouchableOpacity style={optionStyles.subContainer} onPress={()=>{}}>
      <MaterialCommunityIcons name="contacts" size={20} color={Colors.primary} />
      <CustomText fontFamily='Okra-Medium' style={{marginTop:4,textAlign:'center',}}>
        Contacts
      </CustomText>
      </TouchableOpacity>

    </View>
  )
}

export default Options