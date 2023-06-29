import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const Notifications = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Notifications</Text>
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
});

export default Notifications;
