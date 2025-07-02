import React, {useEffect, useState} from 'react';
import {View,ScrollView,SafeAreaView,StatusBar,Text,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Loader from "../loader/loader";
import Toast from 'react-native-tiny-toast';
import Notfound from './notfound';
import '../../services/global';
import styles from '../../assets/css/index';
const work = ({navigation}) => {
  const [checkloader, setcheckloader] = useState(true);
  const orderUpdateUrl=global.url+global.workUpdate;
  const newEnquiry=global.url+global.newEnquiry;
  const walletUrl=global.url+global.wallet;
  const [list,setList] = useState([]);

  const getNewEnquiryDetail = () =>{
    axios.post(newEnquiry, {'vId': global.vId,'deviceId': global.deviceId})
    .then(res => {
      if(res.data.error){         
        Toast.show("! "+res.data.message+" !");
        setList([]);
        setcheckloader(false);
      }else{
        setList(res.data.data);
        setcheckloader(false);
      }
    })
    .catch(error => {
        Toast.show("! Ooops,Please Check Newtwok !");
    });
  }
  const updateWork = (workType,oId) =>{
    axios.post(walletUrl, {'vId': global.vId,'vDeviceId': global.deviceId})
    .then(res => {
        if(res.data.vAmount>0 || res.data.vAmount>res.data.vLimit ){
          axios.post(orderUpdateUrl, {'vId': global.vId,'deviceId': global.deviceId,'workType':workType,'oId':oId})
          .then(res => {
              if(res.data.errorType==0){
                setcheckloader(false);
                console.log(workType);
                if(workType==='answer'){
                  console.log(oId)
                  navigation.navigate('ViewWork',{oId:oId});
                }else{
                  getNewEnquiryDetail();
                }
              }else{
                Toast.show("! "+res.data.message+" !");
              }
      
          })
          .catch(error => {
            console.log(error);
            Toast.show("! Ooops,Please Check Newtwok !");
          });
        }else{
          navigation.navigate('Wallet');
        }
    })
    .catch(error => {
        setCredit('0');
        Toast.show("! Ooops,Please Check Newtwok !");
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNewEnquiryDetail();
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
                  <View style={[styles.dashboardDetailBoxMainContainer,{height:210}]} key={index}>
                      <View style={[styles.dashboardDetailBoxTwo]}>
                        <View style={[styles.dashboardDetailBoxColumnTwo]}>
                          <Text style={styles.dashboardDetailBoxColumnLabel}>Name </Text>
                          <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cName}</Text>
                        </View>
                        <View style={[styles.dashboardDetailBoxColumnTwo]}>
                          <Text style={styles.dashboardDetailBoxColumnLabel}>Complaint No</Text>
                          <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cComplaintNo}</Text>
                        </View>
                      </View>
                      <View style={[styles.dashboardDetailBoxTwo]}>
                        <View style={[styles.dashboardDetailBoxColumnTwo]}>
                          <Text style={styles.dashboardDetailBoxColumnLabel}>State</Text>
                          <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cState}</Text>
                        </View>
                        <View style={[styles.dashboardDetailBoxColumnTwo]}>
                          <Text style={styles.dashboardDetailBoxColumnLabel}>City</Text>
                          <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cCity}</Text>
                        </View>
                      </View>
                      <View style={[styles.dashboardDetailBoxTwo,{borderBottomWidth:0,height:60}]}>
                        <View style={[styles.dashboardDetailBoxColumnTwo]}>
                          <Text style={styles.dashboardDetailBoxColumnLabel}>Area</Text>
                          <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cArea}</Text>
                        </View>
                        <View style={[styles.dashboardDetailBoxColumnTwo]}>
                          <Text style={styles.dashboardDetailBoxColumnLabel}>Pincode</Text>
                          <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cPincode}</Text>
                        </View>
                      </View>
                    <View style={[styles.welcomeBtn,{height:40,marginTop:0}]}>
                          <View style={[styles.loginBtn,{height:40}]}>
                              <TouchableOpacity onPress={() => {updateWork('answer',list.cId)}}
                                  style={[styles.btnTouch,{height:40}]}>
                                  <LinearGradient
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      colors={['#1D976C', '#0f9b0f']}
                                      style={[styles.linearGradient]}>
                                      <Text style={[styles.buttonText]}>Answer</Text>
                                  </LinearGradient>
                              </TouchableOpacity>
                          </View>
                          <View style={[styles.signUpBtn,{}]}> 
                          <TouchableOpacity onPress={() => {updateWork('unanswer',list.cId)}}
                              style={[styles.btnTouch,{height:40}]}>
                              <LinearGradient
                                  start={{x: 0, y: 0}}
                                  end={{x: 1, y: 0}}
                                  colors={['#FF416C', '#FF4B2B']}
                                  style={styles.linearGradient}>
                                  <Text style={styles.buttonText}>Cancel</Text>
                              </LinearGradient>
                          </TouchableOpacity>   
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
export default work;
