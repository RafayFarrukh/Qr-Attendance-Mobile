import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../components/context';
import { COLORS } from '../../constants';
import axiosInstance from '../../api/axiosInstance';

const EditProfile = () => {
  const { user } = React.useContext(AuthContext);
  const [image, setImage] = useState(null);
  const userId = user ? user._id : null;
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      return;
    }
    try {
      const base64String = await FileSystem.readAsStringAsync(image.uri, {
        encoding: 'base64',
      });
      const response = await axiosInstance.post(
        `/api/class/student/studentProfile/${userId}`,
        { image: base64String },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.avatar} />
          ) : (
            <Image source={{ uri: user.profilePic }} style={styles.avatar} />
          )}
          <Button title='Choose Image' onPress={pickImage} />
          <Button title='Upload Image' onPress={handleUpload} />
        </View>
      </View>
      <View style={styles.body}></View>
      <View style={styles.body}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatarContainer: {
    borderWidth: 2,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  userInfo: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
  body: {
    padding: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
  },
  sectionContent: {
    fontSize: 16,
    marginLeft: 34,
    color: '#555',
  },
});

export default EditProfile;
