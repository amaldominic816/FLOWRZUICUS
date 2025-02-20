import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../screens/components/Header';
import Colors from '../components/Colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer'; // Import buffer for Base64 encoding


const ProfileScreen = () => {
  const [user, setUser] = useState({ username: '', email: '' });
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Retrieve stored username & password
        const storedUsername = await AsyncStorage.getItem('username');
        const storedPassword = await AsyncStorage.getItem('password');

        if (!storedUsername || !storedPassword) {
          console.error('Missing username or password');
          return;
        }

        // Encode username:password in Base64
        const credentials = Buffer.from(`${storedUsername}:${storedPassword}`).toString('base64');

        // Make API request with Basic Auth
        const response = await axios.get('http://127.0.0.1:8000/auth/users/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${credentials}`,
          },
        });

        if (response.data.results.length > 0) {
          const userData = response.data.results[0]; // Extract user details
          setUser({ username: userData.username, email: userData.email });
        }
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data || error.message);
      }
    };

    fetchUserProfile();
  }, []);


  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Top Bar */}
        <Header
          title="Profile" // Dynamic title
          showCartIcon={true} // Show cart icon
          showNotificationIcon={true} // Show notification icon
          showProfileIcon={false} // Show profile icon
          onCartPress={() => navigation.navigate('CartPage')}
          onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
          onProfilePress={() => navigation.navigate('ProfileScreen')}
        />
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/images/profile-picture.png')} // Replace with dynamic image source
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
      <Text style={styles.profileName}>{user.username || 'Unknown User'}</Text>
      <Text style={styles.profileEmail}>{user.email || 'No Email'}</Text>
    </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfileScreen')} // Navigate to the profile edit screen
          >
            <Image
              source={require('../../assets/images/ed.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <View style={styles.accountSettings}>
          <Text style={styles.accountSettingsTitle}>Account Setting</Text>

          {/* Account Options */}
          <View style={styles.settingsContainer}>
            {[
              {
                title: 'My Order',
                icon: require('../../assets/images/van.png'),
                navigateTo: 'MyOrdersScreen', // Page to navigate
              },
              {
                title: 'My Favorites',
                icon: require('../../assets/images/myfav.png'),
                navigateTo: 'MyOrdersScreen', // Page to navigate
              },
              {
                title: 'Invoices',
                icon: require('../../assets/images/invoice.png'),
                navigateTo: 'InvoicesScreen',
              },
              {
                title: 'Saved Addresses',
                icon: require('../../assets/images/locationdd.png'),
                navigateTo: 'AddAddressScreen',
              },
              {
                title: 'Occasions',
                icon: require('../../assets/images/calender.png'),
                navigateTo: 'MyOccasionsScreen',
              },
              {
                title: 'Flowrz Wallet',
                icon: require('../../assets/images/wallet.png'),
                isCurrency: true,
                currency: 'AED',
                navigateTo: 'MyWalletScreen',
              },
              {
                title: 'Help & Support',
                icon: require('../../assets/images/help.png'),
                navigateTo: 'HelpScreen',
              },
              {
                title: 'Terms and Conditions',
                icon: require('../../assets/images/Terms.png'),
              },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.settingItem}
                onPress={() => {
                  if (item.navigateTo) {
                    navigation.navigate(item.navigateTo);
                  }
                }}
              >
                <View style={styles.settingLeft}>
                  <Image source={item.icon} style={styles.settingIcon} />
                  <Text style={styles.settingText}>{item.title}</Text>
                </View>
                <View style={styles.settingRight}>
                  {item.isCurrency && (
                    <Text style={styles.currency}>{item.currency}</Text>
                  )}
                  <Image
                    source={require('../../assets/images/arrow-right.png')}
                    style={styles.arrowIcon}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily:'DMSans-Bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    fontFamily:'DMSans-Regular',
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  accountSettings: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  accountSettingsTitle: {
    fontSize: 16,
    fontFamily:'DMSans-Bold',
    marginBottom: 15,
    color: '#333',
  },
  settingsContainer: {
    borderRadius: 10,
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: Colors.background,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    fontFamily:'DMSans-Regular',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    fontSize: 16,
    fontFamily:'DMSans-Bold',
    color: Colors.Gradient2,
    marginRight: 5,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#333',
    resizeMode: 'contain',
  },
});

export default ProfileScreen;
