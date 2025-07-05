import React, { useRef, useState, useEffect } from 'react';
import { View, ImageBackground, Image, Text, TouchableOpacity, StatusBar, Alert, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OTPTextInput from 'react-native-otp-textinput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import '../services/global.js';
import Images from '../assets/images/index';
import AppTexts from '../assets/text/index';
import styles from '../assets/css/index';



import { AuthContext } from '../components/context/Context'

const LoginWithMpin = ({ navigation }) => {
  const url=global.url+global.login;
  const { signIn } = React.useContext(AuthContext);
  const [code, setCode] = useState('')
  const [biometryType, setBiometryType] = useState('');

  const rand = () => {
      return Math.random().toString(36).substr(2); 
  };
  const getToken = () => {
      return rand() + rand(); 
  };
  const  _storeData = async () => {
    var loginTime = new Date();
    const expireTime = loginTime.setHours( loginTime.getHours() + 2 );
    const token = getToken();
      try {
        await AsyncStorage.setItem('vExpire',expireTime.toString());
        await AsyncStorage.setItem('vToken',token);
      } catch (error) {
        console.log(error)
      }
    };
  const callLoginApi = () => {
    axios.post(url,{mobile: global.vMobile,mpin:code,deviceId:global.deviceId})
      .then(function (response) {
        if(response.data.errorType==0){      
          _storeData();
          signIn(response.data);
        }else{
          Alert.alert("! "+response.data.message+" !");
        }
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        throw error;
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Images.backgroundScreen.backgroundMain} style={styles.newImageBg}>
        <StatusBar hidden={true} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.newMainContainer}>
            <View style={[styles.logoContainer,{paddingTop:20}]}>
                <Image
                  source={Images.logo.whiteLogo}
                  style={[styles.logo, {width: '100%', resizeMode: 'contain'}]}
                />
              </View>
            <View style={[styles.mpinLabelContainer]}>
              <Text style={styles.titleText}>
                {AppTexts.mpin.titleText}{global.vName}
              </Text>
              <Text style={styles.mpinInputLabel}>{AppTexts.mpin.inputLabel}</Text>
            </View>
            <View style={[styles.mpinInputContainer]}>

              <OTPTextInput
                inputCount={4}
                containerStyle={styles.containerStyle}
                textInputStyle={styles.textInputStyle}
                tintColor="#3266c1"
                offTintColor="#3266c1"
                autoFocusOnLoad={true}
                secureTextEntry={true}
                clearInputs={true}
                handleTextChange={(code) => setCode(code)}
              />
            </View>
            <View style={styles.mpinForgetMpinContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Forgot Mpin')} style={styles.btnTouch}>
                <Text style={styles.mpinForgetLabel}>
                  {AppTexts.mpin.forgotClick}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mpinBtnContainer}>
              <TouchableOpacity onPress={() => callLoginApi()} style={styles.btnTouch}>

                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#d5a433', '#fdd271']}
                  style={styles.linearGradient}
                >
                  <Text style={styles.buttonText}
                  >
                    {AppTexts.mpin.buttonText}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.mpinOrContainer}>
              <Text style={styles.mpinOrLabel}>
                OR
              </Text>
            </View>
            <View style={styles.mpinUnlockBtnContainer}>
              <TouchableOpacity onPress={() => {}} style={styles.btnTouch}>
                <View style={styles.mpinUnlockBtnContainer}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#3c80f7', '#1058d1']}
                    style={styles.linearGradient}
                  >
                    <View style={styles.mpinUnlockBtn}>
                      <Image source={Images.loginWithMpin.faceIcon} style={styles.mpinUnlockImage} />
                      <Text style={styles.mpinUnlockText}>
                        {AppTexts.mpin.faceButtonText} {biometryType}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );

}

export default LoginWithMpin;
