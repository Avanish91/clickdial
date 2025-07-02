import React, { useEffect, useState } from 'react';
import { View, ImageBackground, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Images from '../assets/images/index';
import AppTexts from '../assets/text/index';
import styles from '../assets/css/index';
import axios from 'axios';

const Congratulations = ({ navigation, route }) => {
  // const getDetail = async () =>{
  //   let apiUrl=global.TelrCongratesUrl + "?" + route.params.urlrewrite;
  // await axios.post(apiUrl)
  function getDetail () { 
    // let apiUrl=global.TelrCongratesUrl + "?" + route.params.urlrewrite;
    // console.log("apiurl_3:  " + global.TelrCongratesUrl + "?" + route.params.urlrewrite)
   axios.post(global.TelrCongratesUrl + "?" + route.params.urlrewrite)
    .then(res => {
      // console.log('getDetail = ' + JSON.stringify(res.data))
      
    })
    .catch(error => {
      console.log(error);
    });
  }
  useEffect(() => {
    getDetail();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Images.backgroundScreen.backgroundFour} style={{}}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <StatusBar hidden={true} />
            <View style={styles.navBackContainer}>
              {/* <View style={styles.navBack}>
                    <TouchableOpacity  onPress={() => navigation.navigate('RegistrationPackage')} style={styles.navBackTouch}> 
                        <Image source={Images.icons.backIcon}  style={styles.navBackIcon} />
                        <Text style={styles.NavBackText}>{'Registeration'}</Text>
                    </TouchableOpacity>
                </View>  */}
              <View style={styles.Margin}></View>
              <View style={styles.Margin}></View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={Images.logo.whiteLogo180} />
              </View>
              <View style={styles.Margin}></View>
              <View style={styles.congMainContainer}>
                <View style={styles.congImgContainer}>
                  <Image source={Images.banner.congratulationsBanner} style={styles.congImg} />
                </View>
                <View style={[styles.congDetailContainer, { height: 310 }]}>
                  <ScrollView nestedScrollEnabled={true}>
                    <Text style={styles.congDetailTextOne}>Congratulations</Text>
                    <Text style={styles.congDetailTextTwo}> {global.FullNameCongratulation}</Text>
                    <Text style={styles.congDetailTextThree}>you have subscribed to ${global.ProductDummyAmount} {global.monthPlan} Plan</Text>
                    {/* <Text style={styles.congDetailTextFour}>{global.ProductDetails} </Text> */}
                    <Text style={styles.congDetailTextFive}>A Confirmation mail has been sent to your registered email. You can start accessing WealthBrain using your Login credentialsis.</Text>
                    <View style={styles.Margin}></View>
                    <Text style={styles.congDetailTextFive}>You have successfully registered to WealthBrain !</Text>
                  </ScrollView>
                </View>
                <View style={styles.loginBtnContainer}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#d5a433', '#fdd271']}
                    style={styles.linearGradient}
                  >
                    <Text style={styles.buttonText} onPress={() => navigation.navigate('Loading')}>
                      Home
                            </Text>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Congratulations;
