import React, {useEffect, useState} from 'react';
import {View,ScrollView,SafeAreaView,Text,StatusBar,TouchableOpacity,TextInput,Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Loader from "../loader/loader";
import DropDownPicker from 'react-native-dropdown-picker';
import '../../services/global';
import styles from '../../assets/css/index';
import { setReadable } from 'react-native-fs';

const Work_Edit = ({navigation,route}) => {
  const [checkloader, setcheckloader] = useState(true);
  const [workType,setWorkType] = useState('answer');
  const [remark,setRemark] = useState('');
  const [amount,setAmount] = useState(0);
  const [partPrice,setPartPrice] = useState(0);

  const getEditWorkUrl=global.url+global.editWork;
  const updateEditWorkUrl=global.url+global.editWorkUpdate;
  const oId = route.params.oId;


  const getEditWork = () =>{
    axios.post(getEditWorkUrl, {'vId': global.vId,'deviceId': global.deviceId,'oId':oId})
    .then(res => {
      //console.log(res.data);
        if(res.data.errorType==0){
          //console.log(res.data.data[0].wStatus)
          setWorkType(res.data.data[0].wStatus);
          setRemark(res.data.data[0].wRemark);
          setAmount(res.data.data[0].wAmount);
          setcheckloader(false);
        }else{
          Alert.alert("! "+res.data.message+" !");
          setcheckloader(false);
        }
    })
    .catch(error => {
        Alert.alert("! Ooops,Please Check Newtwok !");
    });
  }

  const updateEditWork = () =>{
    if(workType==='answer'){
        Alert.alert("Warning!",
        "Please Change Work Type");
    }else{
       // console.log('vId:'+ global.vId,'deviceId:'+ global.deviceId,'oId:'+oId,'workType:'+workType,'workAmount:'+amount,'workPart:'+partPrice,'workRemark:'+remark);
        axios.post(updateEditWorkUrl, {'vId': global.vId,'deviceId': global.deviceId,'oId':oId,'workType':workType,'workAmount':amount,'workPart':partPrice,'workRemark':remark})
        .then(res => {
            if(res.data.errorType==1){
              setcheckloader(false);
            }else{
                Alert.alert("! "+res.data.message+" !");
                navigation.navigate('Dashboard');
                setcheckloader(false);
            }
        })
        .catch(error => {
            Alert.alert("! Ooops,Please Check Newtwok !");
        });
    }
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        getEditWork();
      });
      return unsubscribe;
    }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>   
      <Loader load={checkloader} />      
      <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
              <StatusBar hidden={true} />
              <View style={[styles.editPagesMainContainer]}>
                  <View style={[styles.dashboardDetailBoxMainContainer,{paddingBottom:10}]}>
                  <View style={styles.Margin}></View>
                    <View style={[]}>
                        <View>
                            <Text style={[styles.editPagesInputLabel]}>
                                Work Status
                            </Text>
                            <DropDownPicker
                                items={[
                                    { value: "answer", label: "Answer" },                        
                                    { value: "pending",label: "Pending" },
                                    // { value: "cancel",label: "Cancel" },
                                    { value: "complete", label: "Complete" },

                                ]}
                                placeholder="Select Work Status"
                                defaultValue={workType}
                                containerStyle={{ height: 45 }}
                                style={{ backgroundColor: '#fff', borderColor: '#999', elevation: 0, borderRadius: 5 }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                labelStyle={{
                                    color: '#222', fontSize: 16,
                                }}
                                dropDownStyle={{ backgroundColor: '#fff', borderColor: '#999' }}
                                onChangeItem={item => (setWorkType(item.value))}
                            />
                        </View>
                        <View style={styles.editPagesInputContainer}>
                        {workType==='complete'?
                            <Text style={styles.editPagesInputLabel}>
                                Collected Amount
                            </Text>:
                            <Text style={styles.editPagesInputLabel}>
                                Visit Charge
                            </Text>}
                            
                            <View style={styles.editPagesInput}>
                                <TextInput style={styles.editPagesValue}
                                multiline = {true}
                                    placeholderTextColor="#888"
                                    placeholder = {'Amount'}
                                    value={amount.toString()}
                                    editable = {workType==='complete'?true:false}
                                    onChangeText={amount => { setAmount(amount)}}
                                ></TextInput>
                                
                                {/* <Text style={{color:'#c9c9c9',fontSize:12}}>Password consist of both uppercase and lowercase letters with one special character, e.g., ! @ # ? ]</Text> */}
                                {/* {validateData.passwordError === '' ? <Text style={styles.errorMsg}></Text> : <View style={{ height: 50 }}><Text style={styles.errorMsg}>{validateData.passwordError}</Text></View>} */}
                            </View>
                        </View>
                        {workType==='complete'?
                        <View style={styles.editPagesInputContainer}>
                            <Text style={styles.editPagesInputLabel}>
                                Part Price
                            </Text>
                            <View style={styles.editPagesInput}>
                                <TextInput style={styles.editPagesValue}
                                    multiline = {true}
                                    placeholderTextColor="#888"
                                    placeholder={'Part Price'}
                                    value={partPrice.toString()}
                                    editable = {workType==='complete'?true:false}
                                    onChangeText={partPrice => { setPartPrice(partPrice)}}
                                ></TextInput>
                                {/* <Text style={{color:'#c9c9c9',fontSize:12}}>Password consist of both uppercase and lowercase letters with one special character, e.g., ! @ # ? ]</Text> */}
                                {/* {validateData.passwordError === '' ? <Text style={styles.errorMsg}></Text> : <View style={{ height: 50 }}><Text style={styles.errorMsg}>{validateData.passwordError}</Text></View>} */}
                            </View>
                        </View>:null}
                        <View style={styles.editPagesInputContainer}>
                        <Text style={styles.editPagesInputLabel}>
                           Remark
                        </Text>
                        <View style={[styles.editPagesInput,{height:80}]}>
                            <TextInput style={styles.editPagesValue}
                            multiline = {true}
                            numberOfLines = {4}
                                placeholderTextColor="#888"
                                placeholder={'Remark'}
                                value={remark}
                                onChangeText={remark => { setRemark(remark)}}
                            ></TextInput>
                            {/* <Text style={{color:'#c9c9c9',fontSize:12}}>Password consist of both uppercase and lowercase letters with one special character, e.g., ! @ # ? ]</Text> */}
                            {/* {validateData.passwordError === '' ? <Text style={styles.errorMsg}></Text> : <View style={{ height: 50 }}><Text style={styles.errorMsg}>{validateData.passwordError}</Text></View>} */}
                        </View>
                    </View>
                    </View>
                    <View style={[styles.mpinBtnContainer,{marginTop:50}]}>
                        <TouchableOpacity onPress={() => updateEditWork()} style={[styles.btnTouch,{height:50}]}>
                            <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#d5a433', '#fdd271']}
                            style={[styles.linearGradient]}
                            >
                                <Text style={styles.buttonText}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        </View>
                  </View>
              </View>
          </View>
        </ScrollView>      
    </SafeAreaView>
  );
};
export default Work_Edit;