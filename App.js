import React, { createContext, useEffect, useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';

import AuthNavigator from './src/navigations/AuthNavigator';
import { AuthContext } from './src/components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reducer, initialState } from './src/reducers/userReducer';
import DrawerNavigator from './src/navigations/DrawerNavigator';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';
import { Login } from './src/screens';
export const UserContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [token, setToken] = React.useState('');
  const [User, setUser] = React.useState();

  const signIn = async (foundUser) => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      const _user = JSON.parse(userInfo);
      setToken(_user.token);
      setUser(_user.user);
      // console.log(_user.user);
      // await AsyncStorage.setItem("userToken", userToken);
      // dispatch({ type: "LOGIN", payload: _user.user });
    } catch (e) {
      console.log(e);
    }
  };

  const signOut = async () => {
    try {
      const removetoken = await AsyncStorage.removeItem('userToken');
      setToken(null);
      // console.log(removetoken);
      // console.log('rafay is a good boy');

      // dispatch({
      //   type: "LOGOUT",
      //   token: removetoken,
      //   username: null,
      // });
      // loginState.userToken;
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(async () => {
    // setTimeout(async () => {
    // setIsLoading(false);
    let userToken;
    userToken = null;
    try {
      userToken = await AsyncStorage.getItem('userToken');
      setToken(userToken);
      console.log(userToken);
    } catch (e) {
      console.log(e);
    }
    // console.log('user token: ', userToken);
    // dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    // }, 100);
  }, []);
  React.useEffect(() => {
    // console.log(token);
  }, []);

  return (
    <NavigationContainer>
      <AuthContext.Provider
        value={{
          Token: token,
          user: User,
          // userInfo,
          signOut,
          signIn,
          // authContext,
          // UserInfo,
        }}
        // value={{ state, dispatch }}
      >
        <AuthNavigator token={token} />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
