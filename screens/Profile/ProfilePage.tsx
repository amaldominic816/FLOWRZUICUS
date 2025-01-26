import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../screens/components/Header';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
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
        <View>
          <Text style={styles.profileName}>Salim Al Tajir</Text>
          <Text style={styles.profileEmail}>smn7552@gmail.com</Text>
        </View>
      </View>

      {/* Account Settings */}
      <View style={styles.accountSettings}>
        <Text style={styles.accountSettingsTitle}>Account Setting</Text>

        {/* Account Options */}
        <View style={styles.settingsContainer}>
          {[
            {
              title: 'My Order',
              icon: require('../../assets/images/ordervan.png'),
              navigateTo: 'MyOrdersScreen', // Page to navigate
            },
            { title: 'Invoices', icon: require('../../assets/images/invoice.png'),
              navigateTo:'InvoicesScreen',
             },
            {
              title: 'Saved Addresses',
              icon: require('../../assets/images/savedaddress.png'),
              navigateTo:'AddAddressScreen',
            },
            { title: 'Occasions', icon: require('../../assets/images/calender.png'),
              navigateTo:'MyOccasionsScreen',
             },
            {
              title: 'Floward Wallet',
              icon: require('../../assets/images/wallet.png'),
              isCurrency: true,
              currency: 'AED',
              navigateTo:'MyWalletScreen',
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
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  topBarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  topBarIcons: {
    flexDirection: 'row',
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 8,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  accountSettings: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  accountSettingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  settingsContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
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
    backgroundColor: '#f9f9f9',
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
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e94e77',
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
