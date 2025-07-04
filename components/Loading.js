import React from "react";
import { ImageBackground, Image, StyleSheet, View, StatusBar, Alert, TouchableOpacity } from "react-native";
import Images from '../assets/images/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

import '../services/global';

const Loading = ({ navigation }) => {
  const _retrieveData = async () => {
    try {
      const vId       = await AsyncStorage.getItem('vId');
      const vName     = await AsyncStorage.getItem('vName');
      const vMobile   = await AsyncStorage.getItem('vMobile');
      const vType     = await AsyncStorage.getItem('vType');
      const vLimit    = await AsyncStorage.getItem('vLimit');
      const vStatus   = await AsyncStorage.getItem('vStatus');
      const vDeviceId = await AsyncStorage.getItem('vDeviceId');
      const vMsg      = await AsyncStorage.getItem('vMsg');
      const vExpire   = await AsyncStorage.getItem('vExpire');
      const vToken    = await AsyncStorage.getItem('vToken');
      if (vDeviceId!==null) {
        global.vId=vId;
        global.vName=vName;
        global.vMobile=vMobile;
        global.vType=vType;
        global.vLimit=vLimit;
        global.vStatus=vStatus;
        global.deviceId=vDeviceId;
        global.vMsg=vMsg;
        // if(vExpire!==null && vToken!==null){
        //   var dt = new Date();
        //   if(vExpire>dt.getTime().toString()){
        //     navigation.navigate('BodyStackScreen');
        //   }else{
        //     navigation.navigate('Login With Mpin');
        //   }
        // }else{
        //   navigation.navigate('Login With Mpin');
        // }
        navigation.navigate('Login With Mpin');
      } else {
        navigation.navigate('register');
      }
    } catch (error) {
      console.log("Error while reading data from storage" + error);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(function () {
        _retrieveData()
      }, 3000);
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground source={Images.backgroundScreen.backgroundMain} style={[styles.image]} >
        <Image source={Images.logo.cLogo} style={{width:250,height:250,resizeMode:'contain'}}/>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center',
  },

});

export default Loading;
