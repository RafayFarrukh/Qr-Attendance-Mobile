import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Alert,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, ROUTES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import client from "../../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../components/context";

const Login = (props) => {
  const { signIn } = React.useContext(AuthContext);
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const loginHandle = async (userName, password) => {
    const res = await client
      .post("/api/auth/student/login", {
        email: data.username,
        password: data.password,
      })
      .then(setIsLoading(false));
    // console.log(res.data);
    // console.log({
    //   userName,
    //   password,
    // });
    if (res.data.success == true) {
      AsyncStorage.setItem("userInfo", JSON.stringify(res.data));
      // AsyncStorage.setItem("userToken", JSON.stringify(res.data.token));

      console.log(JSON.stringify(res.data));
    }
    // const foundUser = Users.filter((item) => {
    //   return userName == item.username && password == item.password;
    // });

    if (data.username.length == 0 || data.password.length == 0) {
      setIsLoading(false);

      Alert.alert(
        "Wrong Input!",
        "Username or password field cannot be empty.",
        [{ text: "Okay" }]
      );
      return;
    }
    // if (res.data.success == false) {
    //   console.log(res.data.error);
    // }
    if (res.data.success == false) {
      setIsLoading(false);
      console.log(res.data.error);
      Alert.alert("Invalid Credentials", res.data.error, [{ text: "Okay" }]);
      return;
    }

    signIn(res.data).then;
    navigation.navigate(ROUTES.HOME);
    // navigation.navigate(ROUTES.HOME);
    // .then(data.username == null && data.password == null);
  };

  // const {navigation} = props;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.wFull}>
          <View style={styles.row}>
            {/* <Logo width={55} height={55} style={styles.mr7} /> */}
            <Text style={styles.brandName}>Qr Code Scanner</Text>
          </View>

          <Text style={styles.loginContinueTxt}>Login in to continue</Text>
          <View
            // style={{
            //   flexDirection: "row",
            //   justifyContent: "center",
            //   marginBottom: 20,
            // }}
            style={styles.action}
          >
            <FontAwesome name="user-o" size={19} />

            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Username must be 4 characters long.
              </Text>
            </Animatable.View>
          )}

          <View style={styles.action}>
            <Feather name="lock" size={19} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters long.
              </Text>
            </Animatable.View>
          )}

          <View style={styles.loginBtnWrapper}>
            <LinearGradient
              colors={[COLORS.gradientForm, COLORS.primary]}
              style={styles.linearGradient}
              // start={{y: 0.0, x: 0.0}}
              // end={{y: 1.0, x: 0.0}}
            >
              {/******************** LOGIN BUTTON *********************/}
              <TouchableOpacity
                // onPress={() => navigation.navigate(ROUTES.HOME)}
                onPress={() => {
                  loginHandle(data.username, data.password);
                  setIsLoading(true);
                }}
                activeOpacity={0.7}
                style={styles.loginBtn}
              >
                {!loading ? (
                  <Text style={styles.loginText}>Log In</Text>
                ) : (
                  <ActivityIndicator size="large" color={"#fff"} />
                )}
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/***************** FORGOT PASSWORD BUTTON *****************/}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTES.FORGOT_PASSWORD, {
                // userId: "X0001",
              })
            }
            style={styles.forgotPassBtn}
          >
            <Text style={styles.forgotPassText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}> Don't have an account? </Text>
          {/******************** REGISTER BUTTON *********************/}
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REGISTER)}
          >
            <Text style={styles.signupBtn}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  container: {
    padding: 15,
    width: "100%",
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  brandName: {
    fontSize: 42,
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.primary,
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: "center",
    color: COLORS.gray,
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    // borderWidth: 1,
    borderColor: COLORS.grayLight,
    // padding: 10,
    // marginVertical: 10,
    borderRadius: 5,
    // height: 55,
    // paddingVertical: 0,
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  linearGradient: {
    width: "100%",
    borderRadius: 50,
  },
  loginBtn: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 55,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "400",
  },
  forgotPassText: {
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 15,
  },
  // footer
  footer: {
    position: "absolute",
    bottom: 20,
    textAlign: "center",
    flexDirection: "row",
  },
  footerText: {
    color: COLORS.gray,
    fontWeight: "bold",
  },
  signupBtn: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  // utils
  wFull: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
  action: {
    flexDirection: "row",
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
});
