import React, { useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { COLORS, IMGS } from '../constants';
import { AuthContext } from '.././components/context';

const { width } = Dimensions.get('screen');
const _email = 'FA19-bcs-043@cuilahore.edu.pk';
const CustomDrawer = (props) => {
  const { signOut, token, user } = React.useContext(AuthContext);
  useEffect(() => {
    const split = _email.split('.', 2);
    console.log(user);
    console.log(split[0]);
    console.log(split[1]);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'column', marginTop: 70 }}>
          <Image source={IMGS.user} style={styles.avatar} />

          <View style={{ marginLeft: 15, flexDirection: 'column' }}>
            <Text style={styles.name}>{user ? user.fullName : null}</Text>
            <Text style={styles.email}>{user ? user.email : null}</Text>
            <Text style={styles.email}>{user ? user.stdId : null}</Text>
            {/* <Text style={styles.email}>{_email}</Text> */}
          </View>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        {/* <ImageBackground source={IMGS.bgPattern} style={{ height: 140 }}>
          <Image source={IMGS.user} style={styles.userImg} />
        </ImageBackground> */}
        <View style={styles.drawerListWrapper}>
          <DrawerItemList {...props} />
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              signOut(token);
              // signOut(token).then(navigation.navigate(ROUTES.LOGIN));
            }}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              signOut(token);
              // signOut(token).then(navigation.navigate(ROUTES.LOGIN));
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity> */}
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  name: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 13,
    marginTop: 3,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  userImg: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    position: 'absolute',
    left: width / 2 - 110,
    bottom: -110 / 2,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  drawerListWrapper: {
    marginTop: -40,
  },
  Text: {
    borderWidth: 1,
  },
  logoutButton: {
    marginVertical: 10,
    marginHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: Platform.OS === 'ios' ? 400 : 350,
    backgroundColor: COLORS.primary,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
