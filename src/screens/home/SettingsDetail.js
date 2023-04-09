import React from "react";
// import {StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { COLORS, ROUTES } from "../../constants";

const Settings = ({ navigation }) => {
  const name = "John Doe";
  const bio = "I am a software engineer and avid hiker.";
  const profileImage = "https://www.example.com/profile-pic.jpg";
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.bgColor,
      }}
    >
      <Text>Settings Detail</Text>
      <View style={styles.container}>
        <Image style={styles.profileImage} source={{ uri: profileImage }} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 17,
    margin: 10,
    borderRadius: 5,
    fontSize: 18,
    width: 180,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    marginTop: 40,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
    textTransform: "capitalize",
  },
  bio: {
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 50,
    color: "#666",
    lineHeight: 25,
  },
});
