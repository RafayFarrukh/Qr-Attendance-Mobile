// import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../constants";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
const Wallet = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    // Make API call to retrieve user data
    axios
      .get("https://example.com/api/user")
      .then((response) => {
        const userData = response.data;

        setPassword(userData.password);
        setDepartment(userData.department);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleReminders = () => {
    setRemindersEnabled(!remindersEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wallet</Text>

      <View style={styles.row}>
        <Text style={styles.rowLabel}>Courses</Text>
        <Text style={styles.rowValue}>rafay</Text>
      </View>
    </View>
  );
};

export default Wallet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  rowLabel: {
    fontSize: 16,
  },
  rowValue: {
    fontSize: 16,
    color: "#555",
  },
});
