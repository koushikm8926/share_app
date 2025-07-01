import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';



const TextBreaker: FC = () => {
  return (
    <View style={styles.breakerContainer}>
        <View style={styles.horizontalLine}>
        </View>
    </View>
  );
};

export default TextBreaker;

const styles = StyleSheet.create({

  breakerContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:20,
    width:'80%',
  },
  horizontalLine:{
    flex:1,
    height:1,
    backgroundColor:'#ccc',
  },
  breakerText:{
    textAlign:'center',
    color:'#fff',
    opacity:0.8,
    marginHorizontal:10,
  }

});
