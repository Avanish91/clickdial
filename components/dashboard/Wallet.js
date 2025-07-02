import React, {useEffect, useState} from 'react';
import {View,ImageBackground,SafeAreaView,Text,Image,ScrollView,StatusBar,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Loader from "../loader/loader";

import '../../services/global';
import Images from '../../assets/images/index';
import AppTexts from '../../assets/text/index';
import styles from '../../assets/css/index';

const Wallet = ({navigation}) => {
    const [checkloader, setcheckloader] = useState(true);
    const url=global.url+global.wallet;
    const [credit,setCredit]=useState('');
    const getWalletDetail = () =>{
      axios.post(url, {'vId': global.vId,'vDeviceId': global.deviceId})
      .then(res => {
          console.log(res.data);
          setCredit(res.data.vAmount);
          setcheckloader(false);
      })
      .catch(error => {
          setCredit('0');
          Toast.show("! Ooops,Please Check Newtwok !");
      });
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getWalletDetail();
          });
      
          // Return the function to unsubscribe from the event so it gets removed on unmount
          return unsubscribe;
        }, [navigation]);

return (
    <SafeAreaView style={styles.container}>
        <Loader load={checkloader} />
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <View style={styles.editPagesMainContainer}>
                    <View style={styles.Margin}></View>
                    <View style={{borderRadius:10,backgroundColor:'#fff',height:350,elevation:2,justifyContent:'center',alignItems:'center'}}>
                        <Image source={Images.icons.wallet} style={{width:120,height:120,resizeMode:'contain'}} />
                        <Text style={[styles.walletText,{fontSize:35}]}>Avialable Credit</Text>
                        <Text style={[styles.walletText,{fontSize:50}]}>Rs {credit} /-</Text>
                    </View>
                    <View style={styles.Margin}></View>
                    <View style={styles.mpinUnlockBtnContainer}>
                        <TouchableOpacity onPress={() => {navigation.navigate('PaymentHistory')}} style={styles.btnTouch}>
                            <View style={styles.mpinUnlockBtnContainer}>
                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                colors={['#d5a433', '#fdd271']}
                                style={styles.linearGradient}
                            >
                                <View style={styles.mpinUnlockBtn}>
                                <Text style={styles.mpinUnlockText}>
                                    View REcharge History
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
export default Wallet;