import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/auth/Register';
import Login from '../screens/auth/Login';
import { COLORS, ROUTES } from '../constants';
import DrawerNavigator from './DrawerNavigator';

import { NavigationContainer } from '@react-navigation/native';
import ScanQr from '../screens/home/ScanQr';
import ViewAttendance from '../screens/home/ViewAttendance';
import ChangePassword from '../screens/home/ChangePassword';
// import { IconButton } from "react-native-paper";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Profile } from '../screens';
const Stack = createStackNavigator();

function AuthNavigator(props) {
  const navigation = useNavigation();

  // const { loginState, dispatch } = useContext(AuthContext);

  const [validToken, setValidToken] = React.useState(false);
  React.useEffect(() => {
    console.log(props.token);
    if (props.token == null) {
      console.log('token is empty');
    } else {
      console.log('token is not empty');
    }
  }, []);

  // console.log(Stack);
  return (
    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          // <AntDesign
          //   name="back"
          //   size={32}
          //   style={{ marginLeft: 12 }}
          //   color={COLORS.primary}
          //   onPress={() => navigation.goBack()}
          // />
          <AntDesign
            name='arrowleft'
            style={{ marginLeft: 12 }}
            size={28}
            color={COLORS.primary}
            onPress={() => navigation.goBack()}
          />
          // <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        ),
      }}
      initialRouteName={ROUTES.LOGIN}
    >
      {/* <Stack.Screen
          name={ROUTES.FORGOT_PASSWORD}
          component={ForgotPassword}
          options={({ route }) => ({   
            headerTintColor: COLORS.white,
            // headerBackTitle: 'Back',
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            // title: route.params.userId,
          })}
        /> */}

      {props.token !== null ? (
        <>
          <Stack.Screen
            name={ROUTES.HOME}
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name='ScanQr' component={ScanQr} />
          <Stack.Screen name='ViewAttendance' component={ViewAttendance} />
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen
            name='ChangePassword'
            component={ChangePassword}
            options={{ cardShadowEnabled: true }}
            // options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={ROUTES.LOGIN}
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={ROUTES.REGISTER} component={Register} />
        </>
      )}
    </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default AuthNavigator;
