import React, {useEffect, useState} from 'react';
import {View,ScrollView,SafeAreaView,Text,StatusBar,TouchableOpacity,Image} from 'react-native';
// import Dash from 'react-native-dash';
import axios from 'axios';
import Loader from "../loader/loader";
import Notfound from './notfound';

import '../../services/global';
import Images from '../../assets/images/index';
import AppTexts from '../../assets/text/index';
import styles from '../../assets/css/index';

const Payment_History = ({navigation}) => {
  const [list,setList] = useState([]);
  const [checkloader, setcheckloader] = useState(true);
  const url=global.url+global.walletHistory;

  const getWalletDetail = () =>{
    axios.post(url, {'vId': global.vId,'deviceId': global.deviceId})
    .then(res => {
          if(res.data.error){
            console.log("hello 1")
          }else{
              setList(res.data.data);
          }
          setcheckloader(false);
    })
    .catch(error => {
        Alert.alert("! Ooops,Please Check Newtwok !");
    });
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getWalletDetail();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Loader load={checkloader} />        
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <View style={styles.editPagesMainContainer}>
                    {list.length>0?<View>
                        {list.map((list,index) => (
                          <View style={[styles.dashboardDetailBoxMainContainer,{height:110}]} key={index}>
                              <View style={styles.dashboardDetailBoxContainerOne}>
                                  <View style={[styles.dashboardDetailBoxTwo]}>
                                      <View style={[styles.dashboardDetailBoxColumnTwo,{width:'70%'}]}>
                                          <Text style={styles.dashboardDetailBoxColumnLabel}>Date</Text>
                                          <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.pDate}</Text>
                                      </View>
                                      <View style={[styles.dashboardDetailBoxColumnTwo,{width:'30%'}]}>
                                          <Text style={styles.dashboardDetailBoxColumnLabel}>Paid Amount</Text>
                                          <Text style={styles.dashboardDetailBoxColumnDescOne}>Rs {list.pAmount} /-</Text>
                                      </View>
                                  </View>
                                  <View style={[styles.dashboardDetailBoxContainerTwo]}>
                                      <View style={[styles.dashboardDetailBoxTwo,{height:55,borderBottomWidth:0}]}>
                                          <View style={[styles.dashboardDetailBoxColumnTwo,{width:'100%',height:55,justifyContent:'flex-start'}]}>
                                              <ScrollView nestedScrollEnabled={true} >
                                                  <Text style={styles.dashboardDetailBoxColumnLabel}>Description</Text>
                                                  <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.pDesc}</Text>
                                              </ScrollView>
                                          </View>
                                      </View>
                                  </View>
                              </View>
                          </View>
                        ))}
                    </View>
                  :<Notfound navigation={navigation}/>}
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};
export default Payment_History;