import React, { useState } from 'react';
import { View, ImageBackground, Image, Text, TextInput, StatusBar, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Images from '../../assets/images/index';
import AppTexts from '../../assets/text/index';
import styles from '../../assets/css/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const ForgotMpin = ({ navigation }) => {

    const [validateData, setValidateData] = useState({
        emailError: '',
        emailErrorBool: false,
    });
    const emptyFieldCheck = (val) => {
        if (val === '') { return true; }
        else { return false; }

    }
    const validateEmail = (value) => {
        let emptyCheck = emptyFieldCheck(value);
        if (emptyCheck) {
            setValidateData({
                ...validateData,
                emailError: 'Field cannot be empty',
                emailErrorBool: false
            })
        }
        else if (!/[0-9\s]{10,10}/.test(value)) {
            setValidateData({
                ...validateData,
                emailError: 'Please enter a valid mobile no.',
                emailErrorBool: false
            })
        } else {
            setValidateData({
                ...validateData,
                emailError: '',
                emailErrorBool: true
            })
        }
    }

    function sendOTPMailforMpinReset() {
        let userEmailError = null;
        if (!validateData.emailErrorBool) {
            userEmailError = 'Field cannot be empty';
        }
        setValidateData({
            ...validateData,
            emailError: userEmailError,
        })

        if (validateData.emailErrorBool) {
            navigation.navigate('Verify MPIN OTP')
            let req = '';
            axios.post(req)
                .then(res => {
                    if (res.data === 'NA') {
                        Alert.alert("Email id not exist in the system");
                    } else if (res.data === 'SUCCESS') {
                        navigation.navigate('Verify MPIN OTP')
                    }
                })
                .catch(error => {
                    console.log(error);
                    Alert.alert("Error While generating Reset MPIN");
                });
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <ImageBackground source={Images.backgroundScreen.backgroundMain} style={styles.imageBg}>
                <KeyboardAwareScrollView
                    extraScrollHeight={100}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled">
                    <ScrollView style={styles.scrollView}>
                        <KeyboardAvoidingView enabled >
                            <View style={styles.newMainContainer}>
                                <View style={styles.backContainer}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Login With Mpin')} style={styles.btnTouch}>
                                        <Image source={Images.icons.backIcon} style={styles.backIcon} />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.logoContainer,styles.customBorder,{paddingTop:20}]}>
                                    <Image
                                    source={Images.logo.whiteLogo}
                                    style={[styles.logo, {width: '100%', resizeMode: 'contain'}]}
                                    />
                                </View>
                                <View style={styles.forgetLabelContainer}>
                                    <Text style={styles.titleText}>
                                        {AppTexts.forgotMpin.titleText}
                                    </Text>
                                    <Text style={styles.forgetLabelDesc}>{AppTexts.forgotMpin.bodyText}</Text>
                                </View>
                                <View style={styles.forgetInputContainer}>
                                    <TextInput
                                        style={styles.InputText}
                                        placeholder={AppTexts.forgotMpin.inputTxt}
                                        placeholderTextColor="white"
                                        maxLength={10}
                                        onChangeText={emailId => { validateEmail(emailId) }}
                                    />
                                    {validateData.emailError === '' ? <Text></Text> : <Text style={styles.errorMsg}>{validateData.emailError}</Text>}
                                </View>
                                <View style={styles.forgetBtnContainer}>
                                    <TouchableOpacity onPress={() => sendOTPMailforMpinReset()} style={styles.btnTouch}>
                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={['#d5a433', '#fdd271']}
                                            style={styles.linearGradient}>
                                            <Text style={styles.buttonText}>
                                                {AppTexts.forgotMpin.buttonText}
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </View>
    );
}

export default ForgotMpin;