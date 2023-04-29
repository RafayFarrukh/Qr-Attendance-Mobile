import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Button,
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { COLORS, ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import ChangePassword from './ChangePassword';
import Icon from 'react-native-vector-icons/FontAwesome';

const Settings = ({ navigation }) => {
  // const navigation = useNavigation();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const toggleNotification = () => {
    setIsNotificationEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingContainer}>
          <MaterialIcons
            name='notifications'
            size={24}
            color={COLORS.primary}
          />
          <View style={styles.settingDetails}>
            <Text style={styles.settingTitle}>Enable Notifications</Text>
            <Switch
              trackColor={{ false: '#767577', true: COLORS.primary }}
              onValueChange={toggleNotification}
              value={isNotificationEnabled}
            />
          </View>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.headingContainer}>
          <AntDesign name='lock' size={24} color={COLORS.primary} />
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <Text style={styles.headingTitle}>Manage Password</Text>
          </TouchableOpacity>
          <AntDesign
            name='arrowright'
            style={{
              marginLeft: 'auto',
            }}
            size={24}
            color={COLORS.primary}
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Department</Text>
        <View style={styles.headingContainer}>
          <AntDesign name='team' size={24} color={COLORS.primary} />
          <Text style={styles.headingTitle}>Select Department</Text>
          <AntDesign
            name='arrowright'
            style={{
              marginLeft: 'auto',
            }}
            size={24}
            color={COLORS.primary}
          />
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Courses</Text>
        <View style={styles.headingContainer}>
          <AntDesign name='book' size={24} color={COLORS.primary} />
          <Text style={styles.headingTitle}>View Courses</Text>
          <AntDesign
            name='arrowright'
            style={{
              marginLeft: 'auto',
            }}
            size={24}
            color={COLORS.primary}
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.headingContainer}>
            <Icon name='user' size={24} color={COLORS.primary} />
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.headingTitle}> View Profile</Text>
            </TouchableOpacity>
            <AntDesign
              name='arrowright'
              style={{
                marginLeft: 'auto',
              }}
              size={24}
              color={COLORS.primary}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginLeft: 20,
  },
  settingTitle: {
    fontSize: 16,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headingTitle: {
    fontSize: 18,
    marginLeft: 20,
  },
});

export default Settings;
