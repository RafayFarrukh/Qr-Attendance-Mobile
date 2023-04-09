import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, SafeAreaView } from "react-native";

import AuthNavigator from "./src/navigations/AuthNavigator";
import { AuthContext } from "./src/components/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DrawerNavigator from "./src/navigations/DrawerNavigator";
import BottomTabNavigator from "./src/navigations/BottomTabNavigator";
import { Login } from "./src/screens";
export default function App() {
  const [token, setToken] = React.useState("");
  const [User, setUser] = React.useState();
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  // const loginReducer = (prevState, action) => {
  //   switch (action.type) {
  //     case "RETRIEVE_TOKEN":
  //       return {
  //         ...prevState,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //     case "LOGIN":
  //       return action.payload;

  //     case "LOGOUT":
  //       return {
  //         ...prevState,
  //         userName: null,
  //         userToken: null,
  //         isLoading: false,
  //       };
  //     // return null;
  //     case "REGISTER":
  //       return {
  //         ...prevState,
  //         userName: action.id,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //   }
  // };

  // const [loginState, dispatch] = React.useReducer(
  //   loginReducer,
  //   initialLoginState
  // );
  const signIn = async (foundUser) => {
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      const _user = JSON.parse(userInfo);
      setToken(_user.token);
      setUser(_user.user);
      // console.log(_user.user);
      // await AsyncStorage.setItem("userToken", userToken);
      // dispatch({ type: "LOGIN", payload: _user.user });
    } catch (e) {
      console.log(e);
    }
    // console.log("user token: ", userToken);

    // dispatch({
    //   type: "LOGIN",
    //   id: _user.user.fullName,
    //   token: token,
    // });
  };
  // const userInfo = async () => {
  //   const userInfo = await AsyncStorage.getItem("userInfo");
  //   const _user = await JSON.parse(userInfo);
  //   setToken(_user.token);
  //   setUser(_user.user);
  // };
  const signOut = async () => {
    console.log("signout");

    try {
      const removetoken = await AsyncStorage.removeItem("userToken");
      setToken(null);
      // console.log(removetoken);
      console.log("rafay is a good boy");

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

  React.useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        setToken(userToken);
        // console.log(userToken);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      // dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 100);
  }, []);
  React.useEffect(() => {
    console.log(token);
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
      >
        <AuthNavigator token={token} />
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
