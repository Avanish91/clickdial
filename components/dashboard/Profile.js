import React,{useState} from 'react';
import { View, ImageBackground, Image, Text, TextInput, StatusBar, SafeAreaView, ScrollView,TouchableOpacity,Platform  } from 'react-native';

import Images from '../../assets/images/index';
import styles from '../../assets/css/index';
import '../../services/global';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import getPath from '@flyerhq/react-native-android-uri-path';

var RNFS = require('react-native-fs');
const Profile = ({ navigation }) => { 
   return (
        <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        <StatusBar hidden={true} />
                        <View style={[styles.PagesMainContainer,{paddingTop:10}]}>
                            <View style={[styles.ProfileBoxContainerOne,{justifyContent:'center',alignItems:'center'}]}>
                                <View style={[styles.ProfileBoxContainerTwo]}>
                                    <Image source={Images.profileImg.profile} style={[styles.ProfileBoxContainerTwoImage]} />
                                </View>
                                <View style={styles.ProfileBoxContainerThree}>
                                    <View style={styles.ProfileBoxContainerThreeContentOne}>
                                        <Text style={styles.ProfileBoxContainerThreeContentOneLabel}>
                                           {global.vName}
                                        </Text>
                                    </View>
                                    <View style={styles.ProfileBoxContainerThreeContentTwo}>
                                        <Text style={styles.ProfileBoxContainerThreeContentTwoLabel}>
                                            {global.vMobile}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.ProfileBoxContainerFour}>
                                    <View style={styles.ProfileBoxContainerFourConentOne}>
                                        <Text style={styles.ProfileBoxContainerFourLabel}>
                                            Name
                                        </Text>
                                        <Text style={styles.ProfileBoxContainerFourDesc}>
                                            {global.vName}
                                        </Text>
                                    </View>
                                    <View style={styles.ProfileBoxContainerFourConentTwo}>
                                        <Text style={styles.ProfileBoxContainerFourLabel}>
                                            Contact Number
                                        </Text>
                                        <Text style={styles.ProfileBoxContainerFourDesc}>
                                            {global.vMobile}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
        </SafeAreaView>
    );
}

export default Profile;