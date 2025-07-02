import React from 'react';
import {View,SafeAreaView,Text,Image,ScrollView,StatusBar,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


import '../../services/global';
import Images from '../../assets/images/index';
import AppTexts from '../../assets/text/index';
import styles from '../../assets/css/index';

const notfound = ({navigation}) => {
return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <View style={styles.editPagesMainContainer}>
                    <View style={styles.Margin}></View>
                    <View style={{borderRadius:10,backgroundColor:'#fff',height:350,elevation:2,justifyContent:'center',alignItems:'center'}}>
                        <Image source={Images.icons.notfound} style={{width:120,height:120,resizeMode:'contain'}} />
                        <Text style={[styles.walletText,{fontSize:35}]}>!! Opss !!</Text>
                        <Text style={[styles.walletText,{fontSize:35}]}>Data Not Found</Text>
                    </View>
                    <View style={styles.Margin}></View>
                    <View style={styles.mpinUnlockBtnContainer}>
                        <TouchableOpacity onPress={() => {navigation.navigate('Dashboard')}} style={styles.btnTouch}>
                            <View style={styles.mpinUnlockBtnContainer}>
                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                colors={['#d5a433', '#fdd271']}
                                style={styles.linearGradient}
                            >
                                <View style={styles.mpinUnlockBtn}>
                                <Text style={styles.mpinUnlockText}>
                                   Go Back Dashboard
                                </Text>
                                </View>
                            </LinearGradient>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
);
};
export default notfound;