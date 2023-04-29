import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { COLORS, IMGS } from '../../constants';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={IMGS.user} resizeMode='contain' />
      <Text style={styles.heading}>Welcome to Attendance App</Text>
      <Text style={styles.subheading}>
        Scan QR code to mark your attendance
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ScanQr')}
      >
        <AntDesign name='qrcode' size={24} color='#fff' style={styles.icon} />
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: COLORS.primary,
  },
  subheading: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: COLORS.secondary,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  icon: {
    marginRight: 10,
  },
});

export default Home;
