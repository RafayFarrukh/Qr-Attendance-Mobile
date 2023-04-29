import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../../components/context';
import { COLORS } from '../../constants';

const Profile = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: user.profilePic }} style={styles.avatar} />
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.section}>
          <MaterialCommunityIcons
            name='account-outline'
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.sectionTitle}>Name</Text>
          <Text style={styles.sectionContent}>{user.fullName}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.section}>
          <MaterialCommunityIcons
            name='email-outline'
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.sectionTitle}>Email</Text>
          <Text style={styles.sectionContent}>{user.email}</Text>
        </View>
      </View>
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

export default Profile;
