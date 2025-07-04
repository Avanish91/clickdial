import React, { useEffect } from 'react';
import { View, ActivityIndicator, Platform,Alert,Linking,BackHandler } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {AuthContext} from './components/context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootStackScreen from './components/RootStackScreen';
import './services/global.js';
import { DrawerContent } from './components/DrawerContent';
import BodyStackScreen from './components/BodyStackScreen';
// import { getAppstoreAppMetadata } from "react-native-appstore-version-checker";
import DeviceInfo from 'react-native-device-info';
import { LogBox } from 'react-native'
// import PushNotification from "react-native-push-notification";

LogBox.ignoreLogs(['Warning: ...']);

import { Provider as PaperProvider} from 'react-native-paper';

const Drawer = createDrawerNavigator();

const App = () =>{
      // PushNotification.configure({
      //   largeIcon: "ic_launcher",
      //   smallIcon: "call",
      //   onNotification: function (notification) {
      //     console.log("NOTIFICATION:", notification);

      //   },
        
      // }) 
      // const osType=Platform.OS;
      // const osDetail= osType === "android"?"com.clickdial":"1496581899990"; 
      // const version = DeviceInfo.getVersion();

      const initialLoginState = {
        isLoading: false,
        userName: null,
        userToken: '',
      };

    //Check Play And App store Version
    // getAppstoreAppMetadata(osDetail) 
    // .then(metadata => {
    //   if( metadata.version!==version){
    //     Alert.alert(
    //       'Update Available',
    //       'A new version of Clickdial is available. Please update to new version.',
    //       [
    //         {text: 'Cancel', onPress: () => {BackHandler.exitApp()}},
    //         {text: 'Ok', onPress: () => { Linking.openURL("market://details?id=com.clickdial"),BackHandler.exitApp()}}
    //       ]
    //     );
    //   }
    // })
    // .catch(err => {
    //   console.log("error occurred", err);
    // });
    const loginReducer = (prevState, action) => {
      switch( action.type ) {
        case 'RETRIEVE_TOKEN': 
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGIN': 
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGOUT': 
          return {
            ...prevState,
            userName: null,
            userToken: '',
            isLoading: false,
          };
        case 'REGISTER': 
          return {
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
          };
      }
    };
    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
    const authContext = React.useMemo(() => ({
      signIn: async (userData) => {
        if(userData.errorType==0){
          try {
            const vToken    = await AsyncStorage.getItem('vToken');
            dispatch({ type: 'LOGIN',  token: vToken });
          } catch(e) {
            console.log(e);
          }
        }  
      },
      signOut: async() => {
        try {
          await AsyncStorage.removeItem('vToken');
        } catch(e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT', token: '',userToken:'' });
      },
    }), []);
    useEffect(() => {
      setTimeout(async() => {
        let dt = new Date();
        let vExpire='';
        let vToken='';
        try {
          vExpire   = await AsyncStorage.getItem('vExpire');
          vToken    = await AsyncStorage.getItem('vToken');
        } catch(e) {
          console.log(e);
        }
        if(vExpire>dt.getTime().toString() && vToken!==null){
          dispatch({ type: 'RETRIEVE_TOKEN', token: vToken });
        }
      }, 1000);
    }, []);    
    if( loginState.isLoading ) {
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
    return(  
    <PaperProvider>
      <AuthContext.Provider value={authContext}>      
        <NavigationContainer>
          {loginState.userToken === '' ?  <RootStackScreen/> 
          :(
            <Drawer.Navigator initialRouteName='Drawer Dashboard' 
                drawerContent={props => <DrawerContent {...props} />}
                drawerPosition={"left"}
                screenOptions={{ headerShown: false }} 
              >              
                <Drawer.Screen name="Drawer Dashboard" component={ BodyStackScreen} drawerPosition={"right"}/>  
            </Drawer.Navigator>
            )
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
    );
  }
export default App;

