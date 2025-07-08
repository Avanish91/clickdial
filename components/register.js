import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import Images from '../assets/images/index';
import AppTexts from '../assets/text/index';
import styles from '../assets/css/index';
import '../services/global';

const register = ({ navigation }) => {
  const url = global.url + global.register;
  const [inputNumber, setNumber] = useState();
  const [inputPassword, setPassword] = useState();
  const [inputPin, setPin] = useState();
  const [mToken, setMToken] = useState('');

  const getFcmToken = () => {
    console.log('getFcmToken');
    // PushNotification.configure({
    //   onRegister: function (token) {
    //     console.log(token.token);
    //     setMToken(token.token);
    //   },
    //   onRegistrationError: function(err) {
    //     console.error(err.message, err);
    //   },
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },
    //   popInitialNotification: true,
    //   requestPermissions: true,
    // });
  };
  const requestPermissionAndToken = async () => {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log('result', result);
      console.log('result 2', PermissionsAndroid.RESULTS.GRANTED);
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        requestToken();
      } else {
        Alert.alert('Permision denied');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const requestToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      setMToken(token);
      console.log('Token*****', token);
    } catch (error) {
      console.log(error);
    }
  };

  const _storeData = async data => {
    try {
      await AsyncStorage.setItem('vId', data[0].id.toString());
      await AsyncStorage.setItem('vName', data[0].name.toString());
      await AsyncStorage.setItem('vMobile', data[0].mobile.toString());
      await AsyncStorage.setItem('vType', data[0].type.toString());
      await AsyncStorage.setItem('vLimit', data[0].limit.toString());
      await AsyncStorage.setItem('vStatus', data[0].status.toString());
      await AsyncStorage.setItem('vDeviceId', data[0].deviceId.toString());
      await AsyncStorage.setItem('vMsg', data[0].msg.toString());

      navigation.navigate('Loading');
    } catch (error) {}
  };

  const callRegisterApi = async () => {
    const deviceUniqueId = await DeviceInfo.getUniqueId();
    console.log('deviceUniqueId', deviceUniqueId);
    console.log('rrr', url, {
      mobile: inputNumber,
      password: inputPassword,
      mpin: inputPin,
      deviceId: deviceUniqueId,
      mToken: mToken,
    });
    await axios
      .post(url, {
        mobile: inputNumber,
        password: inputPassword,
        mpin: inputPin,
        deviceId: deviceUniqueId,
        mToken: mToken,
      })
      .then(function (response) {
        if (response.data.errorType == 0) {
          Alert.alert('! ' + response.data.message + ' !');
          _storeData(response.data.data);
        } else {
          Alert.alert('! ' + response.data.message + ' !');
        }
      })
      .catch(function (error) {
        Alert.alert('! ' + error.message + ' !');
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        throw error;
      });
  };
  useEffect(() => {
    requestPermissionAndToken();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={Images.backgroundScreen.backgroundMain}
        style={styles.newImageBg}
      >
        <StatusBar hidden={true} />
        <KeyboardAwareScrollView
          extraScrollHeight={100}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
        >
          <ScrollView>
            <View style={styles.newMainContainer}>
              <View style={[styles.logoContainer, { paddingTop: 20 }]}>
                <Image
                  source={Images.logo.whiteLogo}
                  style={[
                    styles.logo,
                    { width: '100%', resizeMode: 'contain' },
                  ]}
                />
              </View>
              <View style={[styles.mpinLabelContainer]}>
                <Text style={styles.titleText}>
                  {AppTexts.mpin.titleText}
                  {global.vName}
                </Text>
                <Text style={styles.mpinInputLabel}>
                  Enter Mobile No, Password and Set Mpin
                </Text>
              </View>
              <View style={[styles.inputContainer, { marginTop: 15 }]}>
                <TextInput
                  style={styles.InputText}
                  placeholder={AppTexts.login.inputNumber}
                  placeholderTextColor="#fff"
                  selectionColor={'#fff'}
                  onChangeText={number => setNumber(number)}
                />
                <View style={styles.Margin}></View>
                <TextInput
                  style={styles.InputText}
                  placeholder={AppTexts.login.inputPassword}
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                  selectionColor={'#fff'}
                  onChangeText={password => setPassword(password)}
                />
                <View style={styles.Margin}></View>
                <TextInput
                  style={styles.InputText}
                  placeholder={AppTexts.login.inputPin}
                  placeholderTextColor="#fff"
                  selectionColor={'#fff'}
                  secureTextEntry={true}
                  maxLength={4}
                  onChangeText={pin => setPin(pin)}
                />
              </View>
              <View style={[styles.loginBtnContainer, { marginTop: 0 }]}>
                <TouchableOpacity
                  onPress={() => {
                    callRegisterApi();
                  }}
                  style={styles.btnTouch}
                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#d5a433', '#fdd271']}
                    style={styles.linearGradient}
                  >
                    <Text style={styles.buttonText}>
                      {AppTexts.login.buttonText}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default register;
