import { Platform, StyleSheet } from "react-native";
import { Colors, screenHeight, screenWidth } from "../utils/Constants";


export const homeHeaderStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.primary,
        marginTop: Platform.OS === 'ios' ? 55 : 0 ,
    },
    container: {
        padding: 10,
        marginTop: Platform.OS === 'ios' ? 0 : 40 
       // position: 'absolute',
        //zIndex: 4,
    },
    curve: {
        position: 'absolute',
        bottom: -screenHeight * 0.09,
        zIndex: 3,
        width: '100%',
    },
    logo: {
        width: screenWidth * 0.4,
        height: screenHeight * 0.048,
        resizeMode: 'contain',
    },
    profile: {
        width: 45,
        height: 45,
        borderRadius: 140,
        resizeMode: 'cover',
    },
});