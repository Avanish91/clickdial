import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Loading from './Loading';
import register from './register';
import LoginWithMpin from './LoginWithMpin';
import ForgotMpin from './forgot/ForgotMpin';
import VerifyMpinOtp from './forgot/VerifyMpinOtp';
import ResetMpin from './forgot/ResetMpin';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Loading"
  >
    <RootStack.Screen name="Loading" component={Loading} />
    <RootStack.Screen name="register" component={register} />
    <RootStack.Screen name="Login With Mpin" component={LoginWithMpin} />
    <RootStack.Screen name="Forgot Mpin" component={ForgotMpin} />
    <RootStack.Screen name="Verify MPIN OTP" component={VerifyMpinOtp} />
    <RootStack.Screen name="Reset Mpin" component={ResetMpin} />
  </RootStack.Navigator>
);

export default RootStackScreen;
