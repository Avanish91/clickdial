import React, {useRef, useState} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OTPTextInput from 'react-native-otp-textinput';
// import '../../services/global.js'

import Toast from 'react-native-tiny-toast';
import Images from '../../assets/images/index';
import AppTexts from '../../assets/text/index';
import styles from '../../assets/css/index';
import axios from 'axios';
const ResetMpin = ({navigation}) => {
  const [newmpin, SetNewmpin] = useState('');
  const [cnfpin, SetCnfpin] = useState('');
  function ResetNewMPIN() {
    if (newmpin === cnfpin) {
      let req = '';
      axios
        .post(req)
        .then((res) => {
          if (res.data === 'SUCCESS') {
            Toast.show('Mpin Reset Done Successfully');
            navigation.navigate('Loading');
          } else {
            Toast.show('Something Went Wrong, Please try to reset MPIN Again');
          }
        })
        .catch((error) => {
          console.log(error);
          Toast.show('Error While generating Reset MPIN');
        });
    } else {
      Alert.alert('MPIN and Confirm MPIN should be match');
      return '';
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={Images.backgroundScreen.backgroundMain}
        style={styles.newImageBg}>
        <StatusBar hidden={true} />
        <ScrollView>
          <View style={styles.newMainContainer}>
            <View style={styles.backContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Verify MPIN OTP')}
                style={styles.btnTouch}>
                <Image source={Images.icons.backIcon} style={styles.backIcon} />
              </TouchableOpacity>
            </View>
            <View
              style={
                ([styles.logoContainer, styles.customBorder], {paddingTop: 20})
              }>
              <Image
                source={Images.logo.whiteLogo}
                style={[styles.logo, {width: '100%', resizeMode: 'contain'}]}
              />
            </View>
            <View style={styles.resetMpinLabelContainer}>
              <Text style={styles.titleText}>
                {AppTexts.resetMpin.titleText}
              </Text>
            </View>
            <View style={styles.resetMpinInputContainer}>
              <View style={styles.resetNewMpin}>
                <Text style={styles.resetMpinInputLabel}>
                  {AppTexts.resetMpin.inputLabel}
                </Text>
                <OTPTextInput
                  inputCount={4}
                  containerStyle={{}}
                  textInputStyle={styles.textInputStyle}
                  tintColor="#3266c1"
                  offTintColor="#3266c1"
                  autoFocusOnLoad={true}
                  secureTextEntry={true}
                  clearInputs={true}
                  handleTextChange={(code) => SetNewmpin(code)}
                />
              </View>
              <View style={styles.resetconfrimMpin}>
                <Text style={styles.resetMpinInputLabel}>
                  {AppTexts.resetMpin.inputLabelCnf}
                </Text>
                <OTPTextInput
                  inputCount={4}
                  containerStyle={{}}
                  textInputStyle={styles.textInputStyle}
                  tintColor="#3266c1"
                  offTintColor="#3266c1"
                  autoFocusOnLoad={true}
                  secureTextEntry={true}
                  clearInputs={true}
                  handleTextChange={(code) => SetCnfpin(code)}
                />
              </View>
            </View>
            <View style={styles.resetMpinBtnContainer}>
              <TouchableOpacity
                onPress={() => ResetNewMPIN()}
                style={styles.btnTouch}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#d5a433', '#fdd271']}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>
                    {AppTexts.resetMpin.buttonText}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ResetMpin;
