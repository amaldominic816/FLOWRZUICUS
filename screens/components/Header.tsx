import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, StatusBar } from 'react-native';
import Colors from './Colors';

import CalenderIcon from '../../assets/images/reminder-icon.svg'; // Replace with your SVG path

const Header = ({ 
  title = 'Header', // Default title
  showCartIcon = true, // Visibility for cart icon
  showNotificationIcon = true, // Visibility for notification icon
  showProfileIcon = true, // Visibility for profile icon
  onCartPress,
  onOcPress, // Function to handle cart icon press
  onNotificationPress, // Function to handle notification icon press
  onProfilePress, // Function to handle profile icon press
}) => {
  // Calculate padding for Android status bar
  const getHeaderPaddingTop = () => {
    if (Platform.OS === 'android') {
      return (StatusBar.currentHeight ?? 0) + -20;
    }
    return 0; // iOS default
  };

  return (
    <View style={[styles.header, { paddingTop: getHeaderPaddingTop() }]}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Icons */}
      <View style={styles.iconsContainer}>
      {showNotificationIcon && (
          <TouchableOpacity style={styles.iconButton} onPress={onOcPress}>
             <CalenderIcon width={25} height={25} style={styles.icon} />
          </TouchableOpacity>
        )}
        {showCartIcon && (
          <TouchableOpacity style={styles.iconButton} onPress={onCartPress}>
            <Image
              source={require('../../assets/images/cart.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        {showNotificationIcon && (
          <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
            <Image
              source={require('../../assets/images/notification.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        {showProfileIcon && (
          <TouchableOpacity style={styles.iconButton} onPress={onProfilePress}>
            <Image
              source={require('../../assets/images/profile-picture.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontFamily:'DMSans-Bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Header;
