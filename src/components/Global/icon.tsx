import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons '
import React, {FC} from 'react';
import {RFValue} from 'react-native-responsive-fontsize'


interface IconProps{
    color ?: string;
    size:number;
    name:string;
    iconFamaly:'Ionicons' | 'MaterialCommunityIcons' |'MaterialIcons'
}

const icon:FC<IconProps> = ({color,size,name,iconFamaly}) => {
  return (
   <>
   {iconFamaly==="Ionicons" && (
    <Ionicons name={name} color={color} size={RFValue(size)}  />
   )}
   {
    iconFamaly==="MaterialCommunityIcons" && (
        <Ionicons name={name} color={color} size={RFValue(size)}  />
    )}
       {
    iconFamaly==="MaterialIcons" && (
        <Ionicons name={name} color={color} size={RFValue(size)}  />
    )}

   </>
  )
}

export default icon