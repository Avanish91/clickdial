import React, {useEffect, useState} from 'react';
import {View,ScrollView,SafeAreaView,Text,StatusBar,TouchableOpacity} from 'react-native';
import axios from 'axios';
import Loader from "../loader/loader";
import Notfound from './notfound';

import '../../services/global';
import styles from '../../assets/css/index';

const Complete = ({navigation}) => {
  const [list,setList] = useState([]);
  const [checkloader, setcheckloader] = useState(true);
  const url=global.url+global.work;

  const getCompleteWork = (pageNo) =>{
    axios.post(url, {'vId': global.vId,'workType':'complete','deviceId': global.deviceId})
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        getCompleteWork();
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
                        <View style={[styles.dashboardDetailBoxMainContainer,{height:155}]} key={index}>
                            <View style={styles.dashboardDetailBoxTwo}>
                                <View style={styles.dashboardDetailBoxColumnTwo}>
                                    <Text style={styles.dashboardDetailBoxColumnLabel}>Name</Text>
                                    <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cName}</Text>
                                </View>
                                <View style={styles.dashboardDetailBoxColumnTwo}>
                                    <Text style={styles.dashboardDetailBoxColumnLabel}>Complaint No</Text>
                                    <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cComplaint}</Text>
                                </View>
                            </View>
                            <View style={styles.dashboardDetailBoxTwo}>
                                <View style={styles.dashboardDetailBoxColumnTwo}>
                                    <Text style={styles.dashboardDetailBoxColumnLabel}>Area</Text>
                                    <Text style={styles.dashboardDetailBoxColumnDescOne}>{list.cArea}</Text>
                                </View>
                                <View style={styles.dashboardDetailBoxColumnTwo}>
                                    <Text style={styles.dashboardDetailBoxColumnLabel}>Amount</Text>
                                    <Text style={styles.dashboardDetailBoxColumnDescOne}>Rs {list.cVisitCharge} /-</Text>
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
                      ))}
                  </View>
                :<Notfound navigation={navigation}/>}
              </View>
          </View>
      </ScrollView>
  </SafeAreaView>
);
};
export default Complete;