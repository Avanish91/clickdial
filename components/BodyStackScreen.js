import React,{useEffect, useState} from 'react';
import { TouchableOpacity, Image, View,Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import dashboard from './dashboard/Dashboard';
import UserProfile from './dashboard/Profile';
import Answer from './dashboard/Answer';
import Pending from './dashboard/Pending';
import Cancel from './dashboard/Cancel';
import Complete from './dashboard/Complete';
import Wallet from './dashboard/Wallet';
import PaymentHistory from './dashboard/Payment_History';
import NewWork from './dashboard/work';
import EditWork from './dashboard/Work_Edit';
import ViewWork from './dashboard/Work_Detail';
import axios from 'axios';

import Images from '../assets/images/index';
import styles from '../assets/css/index';
import '../services/global'


const InnerStack = createStackNavigator();
const BodyStackScreen = ({ navigation }) => {
  const url=global.url+global.wallet;
  const [credit,setCredit]=useState(0);
  const getWalletDetail = () =>{
    console.log("hello")
    axios.post(url, {'vId': global.vId,'vDeviceId': global.deviceId})
    .then(res => {
        setCredit(res.data.vAmount);
    })
    .catch(error => {
        setCredit('0');
        Toast.show("! Ooops,Please Check Newtwok !");
    });
  }
  
  useEffect(() => {
    // setInterval(async () => {
    //   await getWalletDetail();
    // }, 3000);
    getWalletDetail();
    //  const unsubscribe = navigation.addListener('focus', () => {
    //   getWalletDetail();
    // });

    // // Return the function to unsubscribe from the event so it gets removed on unmount
    // return unsubscribe;
  }, [navigation]); 
  console.log(credit);

  return (
  <InnerStack.Navigator screenOptions={{
    headerShown: true,
    headerTransparent: false,
    headerStyle: {
      backgroundColor: '#1b4f9b',

    },
    headerTitleAlign:'left',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'NunitoSans-Regular',
      fontSize: 20,
      marginLeft: Platform.OS === 'android' ? 10 : 0, // Android fix

    },
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image source={Images.icons.menuIcon} style={styles.drawerMenuIcon} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <View style={{marginRight:20}}>
          <TouchableOpacity onPress={() => { openFilterModel() }}>
              <Image source={Images.menuIcons.walletIcon} style={[styles.drawerMenuFilterIcon,{justifyContent:'flex-end'}]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
             <Text style={[styles.labelStyle,{fontSize:12,marginTop:5}]}>Rs {credit}</Text>
          </TouchableOpacity>
      </View>
  )
  }} initialRouteName="Dashboard">
    <InnerStack.Screen name="Dashboard" component={dashboard} />
    <InnerStack.Screen name="Answer" component={Answer} />
    <InnerStack.Screen name="Pending" component={Pending} />
    <InnerStack.Screen name="Cancel" component={Cancel} />
    <InnerStack.Screen name="Complete" component={Complete} />
    <InnerStack.Screen name="Wallet" component={Wallet} />
    <InnerStack.Screen name="PaymentHistory" component={PaymentHistory} />
    <InnerStack.Screen name="Profile" component={UserProfile} />
    <InnerStack.Screen name="NewWork" component={NewWork} />
    <InnerStack.Screen name="EditWork" component={EditWork} />
    <InnerStack.Screen name="ViewWork" component={ViewWork} />
  </InnerStack.Navigator>
)};
export default BodyStackScreen;


