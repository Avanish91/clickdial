import React, {useEffect, useState} from 'react';
import {View,ScrollView,SafeAreaView,Text,StatusBar,TouchableOpacity,Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Loader from "../loader/loader";
import Notfound from './notfound';

import Images from '../../assets/images/index';
import '../../services/global';
import styles from '../../assets/css/index';

const Pending = ({navigation}) => {
  const [list,setList] = useState([]);
  const [checkloader, setcheckloader] = useState(true);
  const url=global.url+global.work;

  const getPendingWork = () =>{
    axios.post(url, {'vId': global.vId,'workType':'pending','deviceId': global.deviceId})
    .then(res => {
          if(res.data.error){
              Alert.alert("! "+res.data.message+" !");
          }else{
              setList(res.data.data);
          }
          setcheckloader(false);
    })
    .catch(error => {
        Alert.alert("! Ooops,Please Check Newtwok !");
    });
  }
  const onShare = async (index) => {
    try {
      const result = await Share.share({
        message:
         
          'Complaint No :'+list[index].cComplaint+'\n'+
          'Customer Name : '+list[index].cName+'\n'+
          'Mobile No : '+list[index].cPrimaryNo+'\n'+
          'State :'+list[index].cState+'\n'+
          'City :'+list[index].cCity+'\n'+
          'Address :'+list[index].cAddress+'\n'+
          'Area :'+list[index].cArea+'\n'+
          'Service Type:'+list[index].cServiceType+'\n'+
          'Work Description :'+list[index].cWorkDesc+'\n'+
          'Visit Charge :'+list[index].cVisitCharge+'\n'+
          'Register Date :'+list[index].cRegisterDate+'\n',
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
        getPendingWork();
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
                       <View style={[styles.dashboardDetailBoxMainContainer,{height:185,flexDirection:'row',flexWrap:'wrap'}]} key={index}>
                       <View style={{width:'80%'}}>
                           <View style={[styles.dashboardDetailBoxTwo,{height:40},{borderBottomWidth:0}]}>
                               <View style={styles.dashboardDetailBoxColumnTwo}>
                                   <Text style={styles.dashboardDetailBoxColumnLabel}>Name</Text>
                                   <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cName}</Text>
                               </View>
                               <View style={styles.dashboardDetailBoxColumnTwo}>
                                   <Text style={styles.dashboardDetailBoxColumnLabel}>Complaint No</Text>
                                   <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cComplaint}</Text>
                               </View>
                           </View>
                           <View style={[styles.dashboardDetailBoxTwo,{height:40},{borderBottomWidth:0}]}>
                               <View style={[styles.dashboardDetailBoxColumnTwo]}>
                                   <Text style={styles.dashboardDetailBoxColumnLabel}>Area</Text>
                                   <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cArea}</Text>
                               </View>
                               <View style={styles.dashboardDetailBoxColumnTwo}>
                                   <Text style={styles.dashboardDetailBoxColumnLabel}>Pincode</Text>
                                   <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cPincode}</Text>
                               </View>
                           </View>
                           <View style={[styles.dashboardDetailBoxTwo,{borderBottomWidth:0}]}>
                               <View style={[styles.dashboardDetailBoxColumnTwo,{width:'100%',height:55,justifyContent:'flex-start'}]}>
                                   <ScrollView nestedScrollEnabled={true} >
                                       <Text style={styles.dashboardDetailBoxColumnLabel}>Remark</Text>
                                       <Text style={styles.dashboardDetailBoxColumnDescOne}>{(list.cRemark==null?'No Data':list.cRemark)}</Text>
                                   </ScrollView>
                               </View>
                           </View>
                           <View style={[styles.dashboardDetailBoxTwo,{borderBottomWidth:0}]}>
                               <View style={[styles.dashboardDetailBoxColumnTwo,{width:'100%',height:55,justifyContent:'flex-start'}]}>
                                   <ScrollView nestedScrollEnabled={true} >
                                       <Text style={styles.dashboardDetailBoxColumnLabel}>Work Description</Text>                                      
                                       <Text style={styles.dashboardDetailBoxColumnDescOne}>{(list.cWorkDesc==null || list.cWorkDesc==""?'No Data':list.cWorkDesc)}</Text>
                                   </ScrollView>
                               </View>
                           </View>
                       </View>
                       <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',borderLeftColor:'#e9e9e9',borderLeftWidth:1}}>
                           <TouchableOpacity  onPress={()=>{Linking.openURL('tel:(+91)'+list.cPrimaryNo);}}
                                style={[styles.btnTouch,{height:30,width:40}]}>
                                <Image source={Images.workIcons.callIcon}  style={styles.workIcon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {navigation.navigate('ViewWork',{oId:list.cId})}}
                                style={[styles.btnTouch,{height:30,width:40,marginTop:7}]}>
                                <Image source={Images.workIcons.viewIcon} style={styles.workIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {navigation.navigate('EditWork',{oId:list.cId})}}
                                style={[styles.btnTouch,{height:30,width:40,marginTop:7}]}>
                                <Image source={Images.workIcons.editIcon} style={styles.workIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{onShare(index)}} title="Share"
                                style={[styles.btnTouch,{height:30,width:40,marginTop:7}]}>
                                <Image source={Images.workIcons.shareIcon} style={styles.workIcon} />
                            </TouchableOpacity>
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
export default Pending;