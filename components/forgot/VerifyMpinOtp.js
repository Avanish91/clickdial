import React ,{useRef, useState}from 'react';
import { View,ImageBackground,Image,Text,TouchableOpacity,StatusBar, Alert,Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OTPTextInput from 'react-native-otp-textinput';
import axios from 'axios';
import Images from '../../assets/images/index';
import AppTexts from '../../assets/text/index'; 
import styles from '../../assets/css/index'; 
import Toast from 'react-native-tiny-toast';

const VerifyMpinOtp = ({navigation}) => {  
    const [otp,setOtp]=useState('');
    function VerifyMpinOTP(){            
        navigation.navigate('Reset Mpin')
       let req = '';
        axios.post(req)
        .then(res => {        
            if(res.data === 'VALID'){
                navigation.navigate('Reset Mpin')
            }else{
                Toast.show('Something Went Wrong, Please try to reset MPIN Again')
            }
        })
        .catch(error => {
          console.log(error);
          Toast.show("Error While generating Reset MPIN");
        }); 
      }
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <ImageBackground source={Images.backgroundScreen.backgroundMain}  style={styles.imageBg}>
            <View style={styles.mainContainer}>
            <View style={styles.backContainer}>
                        <TouchableOpacity  onPress={() => navigation.navigate('Forgot Mpin')} style={styles.btnTouch}> 
                            <Image source={Images.icons.backIcon}  style={styles.backIcon} />
                        </TouchableOpacity>
                </View>                 
                <View style={[styles.logoContainer,styles.customBorder],{paddingTop:20}}>
                    <Image
                    source={Images.logo.whiteLogo}
                    style={[styles.logo, {width: '100%', resizeMode: 'contain'}]}
                    />
                </View>
                <View style={styles.verifyLabelContainer}> 
                    <Text style={styles.titleText}>
                        {AppTexts.verifyMpinOtp.titleText}
                    </Text>
                    <Text  style={styles.verifyLabelDesc}>{AppTexts.verifyMpinOtp.bodyText}</Text>
                </View>
                <View style={styles.verifyInputContainer}>
                    <OTPTextInput 
                        inputCount={4}
                        containerStyle={styles.containerStyle}
                        textInputStyle={styles.textInputStyle}
                        tintColor="#3266c1"
                        offTintColor="#3266c1"
                        returnKeyLabel='Done' 
  returnKeyType='done' 
  onSubmitEditing={Keyboard.dismiss} 
                        handleTextChange={(code) => setOtp(code)} 
                        />
                </View>
                <View style={styles.verifyClickContainer}>
                 
                    <Text style={styles.verifyResendDesc}>
                            {AppTexts.verifyMpinOtp.msgTxt}
                    </Text>
                    <Text style={styles.verifyResendClick}>
                            &nbsp;{AppTexts.verifyMpinOtp.reSendTxt}
                    </Text>                 
                </View>             
                <View style={styles.verifyBtnContainer}>
                <TouchableOpacity  onPress={() =>VerifyMpinOTP()} style={styles.btnTouch}>
                 <LinearGradient 
                        start={{x: 0, y: 0}} 
                        end={{x: 1, y: 0}} 
                        colors={['#d5a433', '#fdd271']} 
                        style={styles.linearGradient}                  
                        >
                        <Text style={styles.buttonText}
                        >
                        {AppTexts.verifyMpinOtp.buttonText}
                        </Text>
                    </LinearGradient>
                    </TouchableOpacity>
            </View>    
            </View>
        </ImageBackground>        
      </View>
    );
}

export default VerifyMpinOtp;