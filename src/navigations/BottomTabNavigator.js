import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Platform, TouchableOpacity } from "react-native";
import { COLORS, ROUTES } from "../constants";
import { Home, Wallet, Notifications, Settings } from "../screens";
import Icon from "react-native-vector-icons/Ionicons";
import SettingsNavigator from "./SettingsNavigator";
import CustomTabBarButton from "../components/CustomTabBarButton";
import CustomTabBar from "../components/CustomTabBar";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: COLORS.dark,
        // tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: COLORS.primary,

        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === ROUTES.HOME_TAB) {
            iconName = focused ? "ios-home-sharp" : "ios-home-outline";
          } else if (route.name === ROUTES.SETTINGS_NAVIGATOR) {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === ROUTES.WALLET) {
            iconName = focused ? "wallet" : "wallet-outline";
          } else if (route.name === ROUTES.NOTIFICATIONS) {
            iconName = focused
              ? "md-notifications-sharp"
              : "md-notifications-outline";
          }

          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={Home}
        // options={{
        //   tabBarLabel: "Home",
        //   tabBarColor: "#009387",
        //   // tabBarButton: (props) => (
        //   //   <CustomTabBarButton route="home" {...props} />
        //   // ),
        //   tabBarIcon: ({ color }) => (
        //     <Icon name="ios-home" color={color} size={26} />
        //   ),
        // }}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#009387",
          title: "Home",
          style: "",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon
                  name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
                  size={30}
                  color={COLORS.dark}
                  style={{ marginLeft: 13 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.WALLET}
        component={Wallet}
        // options={{
        //   tabBarLabel: "Explore",
        //   tabBarColor: "#009387",
        //   tabBarIcon: ({ color }) => (
        //     <Icon name="ios-aperture" color={color} size={26} />
        //   ),
        // }}
        options={{
          tabBarLabel: "Wallet",
          tabBarColor: "#009387",
          title: "Wallet",
          style: "",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon
                  name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
                  size={30}
                  color={COLORS.dark}
                  style={{ marginLeft: 13 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.NOTIFICATIONS}
        component={Notifications}
        // options={{
        //   tabBarLabel: "Updates",
        //   tabBarColor: "#009387",
        //   tabBarIcon: ({ color }) => (
        //     <Icon name="ios-notifications" color={color} size={26} />
        //   ),
        // }}
        options={{
          tabBarLabel: "Notifications",
          tabBarColor: "#009387",
          title: "Notifications",
          style: "",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon
                  name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
                  size={30}
                  color={COLORS.dark}
                  style={{ marginLeft: 13 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS_NAVIGATOR}
        component={SettingsNavigator}
        // options={{
        //   tabBarLabel: "Profile",
        //   tabBarColor: "#009387",
        //   tabBarIcon: ({ color }) => (
        //     <Icon name="ios-person" color={color} size={26} />
        //   ),
        // }}
        options={{
          tabBarLabel: "Settings",
          tabBarColor: "#009387",
          title: "Settings",
          style: "",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-settings" color={color} size={26} />
          ),
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon
                  name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
                  size={30}
                  color={COLORS.dark}
                  style={{ marginLeft: 13 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    // backgroundColor: COLORS.transparent,
    borderTopWidth: 0,
    // bottom: 15,
    right: 12,
    left: 10,
    height: 62,
  },
});
