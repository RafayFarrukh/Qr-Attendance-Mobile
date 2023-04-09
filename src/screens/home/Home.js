import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../../components/context";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { COLORS, IMGS } from "../../constants";

const Home = () => {
  const navigation = useNavigation();
  const { user } = React.useContext(AuthContext);

  return (
    <>
      {/* <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.bgColor,
        }}
      >
        <Button title="Scan" onPress={() => navigation.navigate("ScanQr")} />
      </View> */}
      <View style={styles.container}>
        <Image style={styles.logo} source={IMGS.user} resizeMode="contain" />
        <Text style={styles.heading}>Welcome to Attendence App</Text>
        <Text style={styles.subheading}>
          Scan QR code to mark you attendence
        </Text>
        <TouchableOpacity style={styles.button}>
          <Button
            title="Scan QR Code"
            style={styles.buttonText}
            color="#fff"
            onPress={() => navigation.navigate("ScanQr")}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Home;

//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: COLORS.primary,

    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
