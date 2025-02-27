// Loader.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from './Colors'; // Adjust the import path as necessary

const Loader = ({ size = 'large', color = Colors.primary }) => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});

export default Loader;
