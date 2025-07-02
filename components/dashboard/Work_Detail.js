import React, {useEffect, useState} from 'react';
import {View,SafeAreaView,ScrollView,Text,StatusBar,TouchableOpacity,Linking,Share,Image} from 'react-native';
import Toast from 'react-native-tiny-toast';
import axios from 'axios';
import Loader from "../loader/loader";
import LinearGradient from 'react-native-linear-gradient';

import '../../services/global';
import styles from '../../assets/css/index';
import Images from '../../assets/images/index';
import AppTexts from '../../assets/text/index';

const Work_Detail = ({navigation,route}) => {
  const [list,setList] = useState([]);
  const [checkloader, setcheckloader] = useState(true);
  const url=global.url+global.workDetail;
  const oId = route.params.oId;
  const getWorkDetail = () =>{
    axios.post(url, {'vId': global.vId,'oId':oId,'deviceId': global.deviceId})
    .then(res => {
          if(res.data.error){
            Toast.show("! "+response.data.message+" !");
          }else{
              setList(res.data);
          }
          setcheckloader(false);
    })
    .catch(error => {
        Toast.show("! Ooops,Please Check Newtwok !");
    });
  }
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
 
          'Complaint No :'+list.cComplaint+'\n'+
          'Customer Name : '+list.cName+'\n'+
          'Mobile No : '+list.cPrimaryNo+'\n'+
          'State :'+list.cState+'\n'+
          'City :'+list.cCity+'\n'+
          'Address :'+list.cAddress+'\n'+
          'Area :'+list.cArea+'\n'+
          'Service Type:'+list.cServiceType+'\n'+
          'Work Description :'+list.cWorkDesc+'\n'+
          'Visit Charge :'+list.cVisitCharge+'\n'+
          'Register Date :'+list.cRegisterDate+'\n',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getWorkDetail();
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
          <View
            style={[styles.dashboardDetailBoxMainContainer, {height: 530}]}
            >
            <View style={styles.dashboardDetailBoxContainerOne}>
              <View style={[styles.dashboardDetailBoxTwo]}>
                <View style={styles.dashboardDetailBoxColumnTwo}>
                  <Text style={styles.dashboardDetailBoxColumnLabel}>
                    Name
                  </Text>
                  <Text style={styles.dashboardDetailBoxColumnDescOne}>
                    {list.cName}
                  </Text>
                </View>
                <View style={styles.dashboardDetailBoxColumnTwo}>
                  <Text style={styles.dashboardDetailBoxColumnLabel}>
                    Complaint No
                  </Text>
                  <Text style={styles.dashboardDetailBoxColumnDescOne}>
                    {list.cComplaint}
                  </Text>
                </View>
              </View>
              <View style={[styles.dashboardDetailBoxContainerTwo]}>
                <View style={[styles.dashboardDetailBoxTwo]}>
                  <View style={styles.dashboardDetailBoxColumnTwo}>
                    <Text style={styles.dashboardDetailBoxColumnLabel}>
                      Primary Contact
                    </Text>
                    <TouchableOpacity  onPress={()=>{Linking.openURL('tel:(+91)'+list.cPrimaryNo);}}>
                    <Text style={styles.dashboardDetailBoxColumnDescOne}>
                      {list.cPrimaryNo}
                    </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.dashboardDetailBoxColumnTwo}>
                    <Text style={styles.dashboardDetailBoxColumnLabel}>
                      Alternate Contact
                    </Text>
                    <TouchableOpacity  onPress={()=>{Linking.openURL('tel:(+91)'+list.cAlternateNo);}}>
                    <Text style={styles.dashboardDetailBoxColumnDescOne}>
                    {(list.cAlternateNo==0?'No Data':list.cAlternateNo)}
                    </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.dashboardDetailBoxTwo}>
                  <View style={styles.dashboardDetailBoxColumnTwo}>
                    <Text style={styles.dashboardDetailBoxColumnLabel}>
                      State
                    </Text>
                    <Text style={styles.dashboardDetailBoxColumnDescOne}>
                    {list.cState}
                    </Text>
                  </View>
                  <View style={styles.dashboardDetailBoxColumnTwo}>
                    <Text style={styles.dashboardDetailBoxColumnLabel}>
                      City
                    </Text>
                    <Text style={styles.dashboardDetailBoxColumnDescOne}>
                    {list.cCity}
                    </Text>
                  </View>
                </View>
                <View style={[styles.dashboardDetailBoxTwo]}>
                    <View style={[styles.dashboardDetailBoxColumnTwo,{width:'100%',height:55,justifyContent:'flex-start'}]}>
                        <ScrollView nestedScrollEnabled={true} >
                            <Text style={styles.dashboardDetailBoxColumnLabel}>Address</Text>
                            <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cAddress}</Text>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.dashboardDetailBoxTwo}>
                  <View style={styles.dashboardDetailBoxColumnTwo}>
                    <Text style={styles.dashboardDetailBoxColumnLabel}>Area</Text>
                    <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cArea}</Text>
                  </View>
                  <View style={styles.dashboardDetailBoxColumnTwo}>
                    <Text style={styles.dashboardDetailBoxColumnLabel}> Pincode</Text>
                    <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cPincode}</Text>
                  </View>
                </View>
                <View style={styles.dashboardDetailBoxTwo}>
                  <View style={styles.dashboardDetailBoxColumnTwo}>
                    <Text style={styles.dashboardDetailBoxColumnLabel}>Registar Date</Text>
                    <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cRegisterDate}</Text>
                  </View>
                  <View style={styles.dashboardDetailBoxColumnTwo}>
                    <Text style={styles.dashboardDetailBoxColumnLabel}>Start Date</Text>
                    <Text style={styles.dashboardDetailBoxColumnDescOne}>{(list.cStartDate==null?'No Data':list.cStartDate)}</Text>
                  </View>
                </View>
                <View style={[styles.dashboardDetailBoxTwo]}>
                  <View style={[styles.dashboardDetailBoxColumnTwo]}>
                    <Text style={styles.dashboardDetailBoxColumnLabel}>Visit Charge</Text>
                    <Text style={styles.dashboardDetailBoxColumnDescOne}>Rs {list.cVisitCharge} /-</Text>
                  </View>
                  <View style={[styles.dashboardDetailBoxColumnTwo]}>
                    <Text style={styles.dashboardDetailBoxColumnLabel}>Service Type</Text>
                    <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cServiceType} /-</Text>
                  </View>
                </View>
                <View style={[styles.dashboardDetailBoxTwo]}>
                    <View style={[styles.dashboardDetailBoxColumnTwo,{width:'100%',height:55,justifyContent:'flex-start'}]}>
                        <ScrollView nestedScrollEnabled={true} >
                            <Text style={styles.dashboardDetailBoxColumnLabel}>Work Description</Text>
                            <Text style={styles.dashboardDetailBoxColumnDescOne}>{(list.cWorkDesc==null || list.cWorkDesc==""?'No Data':list.cWorkDesc)}</Text>
                        </ScrollView>
                    </View>
                </View>
                <View style={[styles.dashboardDetailBoxTwo,{borderBottomWidth:0}]}>
                    <View style={[styles.dashboardDetailBoxColumnTwo,{width:'100%',height:55,justifyContent:'flex-start'}]}>
                        <ScrollView nestedScrollEnabled={true} >
                            <Text style={styles.dashboardDetailBoxColumnLabel}>Note</Text>
                            <Text style={styles.dashboardDetailBoxColumnDescOne}>{(list.cNote==null || list.cNote==""?'No Data':list.cNote)}</Text>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.mpinUnlockBtnContainer}>
              <TouchableOpacity onPress={onShare} title="Share" style={styles.btnTouch}>
                <View style={styles.mpinUnlockBtnContainer}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#3c80f7', '#1058d1']}
                    style={styles.linearGradient}
                  >
                    <View style={styles.mpinUnlockBtn}>
                      <Image source={Images.workIcons.shareIconWhite} style={styles.mpinUnlockImage} />
                      <Text style={styles.mpinUnlockText}>
                       Share
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};
export default Work_Detail;