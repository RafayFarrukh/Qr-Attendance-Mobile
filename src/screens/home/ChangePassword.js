import React, { useState } from 'react';
import { COLORS } from '../../constants';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import client from '../../api/client';
import axiosInstance from '../../api/axiosInstance';

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setIsLoading] = useState(false);

  const handlePasswordChange = async () => {
    setIsLoading(true);

    console.log('chhannge beinng hit');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      setIsLoading(false);
    } else if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      setIsLoading(false);
    } else {
      const data = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };

      await axiosInstance
        .patch('/api/class/student/updatePassword', data)
        .then((response) => {
          console.log(response.data);
          setError('');
          if (response.data.success === false) {
            setIsLoading(false);

            Toast.show({
              type: 'error',
              text1: response.data.message,
            });
          }
          if (response.data.success === true) {
            setIsLoading(false);

            Toast.show({
              type: 'success',
              text1: response.data.message,
            });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
          }
          // Password updated successfully, navigate to a new screen or perform any additional logic
          // ...
        })
        .catch((error) => {
          setIsLoading(false);

          console.log(error.message, 'error');
          // Handle error response
          // ...
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.error}>{error}</Text>
      <TextInput
        style={styles.input}
        placeholder='Current Password'
        secureTextEntry={true}
        value={currentPassword}
        onChangeText={(text) => setCurrentPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='New Password'
        secureTextEntry={true}
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Confirm Password'
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
        {!loading ? (
          <Text style={styles.buttonText}>Change Password</Text>
        ) : (
          <ActivityIndicator size='large' color={'#fff'} />
        )}
        {/* <Text style={styles.buttonText}>Change Password</Text> */}
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    marginBottom: 40,
    color: '#2e2e2e',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 18,
    color: '#333333',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  btn: {
    backgroundColor: COLORS.primary,
    marginBottom: 100,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});
