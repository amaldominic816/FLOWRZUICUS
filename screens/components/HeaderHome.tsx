import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, StatusBar } from 'react-native';
import Colors from './Colors';
import CalenderIcon from '../../assets/images/reminder-icon.svg'; // Replace with your SVG path

const HeaderHome = ({ 
  profileImage = require('../../assets/images/profile-picture.png'), // Default profile image
  userName = 'User', // Default user name
  onProfilePress, // Function to handle profile icon press
  onCartPress,
  onNotificationPress,
  onCalendarPress,
}) => {
  // Calculate padding for Android status bar
  const getHeaderPaddingTop = () => {
    if (Platform.OS === 'android') {
      return (StatusBar.currentHeight ?? 0) - 20;
    }
    return 0; // iOS default
  };

  // Compute dynamic greeting based on current time
  const currentHour = new Date().getHours();
  let timeGreeting = 'Good Morning';
  if (currentHour >= 12 && currentHour < 18) {
    timeGreeting = 'Good Afternoon';
  } else if (currentHour >= 18) {
    timeGreeting = 'Good Evening';
  }

  return (
    <View style={[styles.header, { paddingTop: getHeaderPaddingTop() }]}>
      {/* Left Side: Profile Image and Greeting */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={onProfilePress}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        <View>
          <Text style={styles.greeting}>Hi, {userName} 👋</Text>
          <Text style={styles.subText}>{timeGreeting}</Text>
        </View>
      </View>
      
      {/* Icons on Right Side */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={onCalendarPress}>
          <CalenderIcon width={25} height={25} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onCartPress}>
          <Image source={require('../../assets/images/cart.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
          <Image source={require('../../assets/images/notification.png')} style={styles.icon} />
        </TouchableOpacity>
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  greeting: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'DMSans-Bold',
  },
  subText: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'DMSans-Regular',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default HeaderHome;
