import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';  // <-- Add this import
import Header from '../../screens/components/Header';
import Colors from '../components/Colors';
import { logout } from '../redux/slices/authSlice';
import ButtonOutlined from '../components/ButtonOutlined';
import ButtonPrimary from '../components/ButtonPrimary';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Select your state values
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  // Show snackbar if there's an error
  useEffect(() => {
    if (status === 'failed' && error) {
      Snackbar.show({
        text: error || 'Something went wrong.',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',   // Customize as needed
        textColor: '#fff',        // Customize as needed
      });
    }
  }, [status, error]);

  // You can still show a loading indicator if desired:
  if (status === 'loading') {
    return <Text>Loading...</Text>; 
  }

  // Remove the block that returns an error component:
  // if (status === 'failed') {
  //   return <Text>Error: {error}</Text>;
  // }

  const userData = user && user.results ? user.results[0] : null;


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Top Bar */}
        <Header
          title="Profile"
          showCartIcon={true}
          showNotificationIcon={true}
          showProfileIcon={false}
          onCartPress={() => navigation.navigate('CartPage')}
          onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
          onProfilePress={() => navigation.navigate('ProfileScreen')}
        />

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/images/profile-picture.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userData?.username}</Text>
            <Text style={styles.profileEmail}>{userData?.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfileScreen')}
          >
            <Image
              source={require('../../assets/images/ed.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Refer & Earn Section */}
        <View style={styles.referEarnContainer}>
          <Image
            source={require('../../assets/images/referal.png')}
            style={styles.referEarnIcon}
          />
          <View style={styles.referEarnTextContainer}>
            <Text style={styles.referEarnTitle}>Refer & Earn</Text>
            <Text style={styles.referEarnDescription}>Get 70% off </Text>
          </View>
          <ButtonPrimary
            buttonText="Refer Now"
            onPress={() => navigation.navigate('ReferralScreen')}
            buttonWidth={Dimensions.get('window').width * 0.2}
            buttonHeight={35}
            fontSize={13}
            gradientColors={[Colors.Gradient1, Colors.Gradient2]}
          />
        </View>

        {/* Account Settings */}
        <View style={styles.accountSettings}>
          <Text style={styles.accountSettingsTitle}>Account Setting</Text>
          <View style={styles.settingsContainer}>
            {[
              {
                title: 'My Order',
                icon: require('../../assets/images/van.png'),
                navigateTo: 'MyOrdersScreen',
              },
              {
                title: 'My Favorites',
                icon: require('../../assets/images/myfav.png'),
                navigateTo: 'MyFavoritesScreen',
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

          <View style={styles.logcontainer}>
            <ButtonOutlined
              textColor="#000"
              borderColor="#CACACAFF"
              buttonWidth={Dimensions.get('window').width * 0.8}
              buttonText="Logout"
              onPress={() => {
                dispatch(logout());
                navigation.navigate('LoginPage');
              }}
            />
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
  logcontainer: {
    alignItems: 'center',
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
    fontFamily: 'DMSans-Bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'DMSans-Regular',
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
    fontFamily: 'DMSans-Bold',
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
    fontFamily: 'DMSans-Regular',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    color: Colors.Gradient2,
    marginRight: 5,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#333',
    resizeMode: 'contain',
  },
  referEarnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9E1E1',
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  referEarnIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  referEarnTextContainer: {
    flex: 1,
  },
  referEarnTitle: {
    fontSize: 16,
     fontFamily:'DMSans-Bold',
    color: '#333',
  },
  referEarnDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily:'DMSans-Regular'
  },
  referEarnButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;