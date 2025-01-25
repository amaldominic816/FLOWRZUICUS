import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Video from 'react-native-video';

// Import screens
import RegistrationPage from './screens/Authentication/RegisterPage';
import OtpScreen from './screens/Authentication/OTPScreen';
import ProductOverview from './screens/Store/ProductScreen';
import CartPage from './screens/Cart/CartPage';
import HomePage from './screens/Home/HomePage';
import CheckoutPage from './screens/CheckOut/CheckoutPage';
import OrderDetailpage from './screens/Order/OrderDetailpage';
import OrderTracking from './screens/Order/TrackOrderPage';
import ProfileScreen from './screens/Profile/ProfilePage';
import PushNotificationsScreen from './screens/Home/NotificaionPage';
import MyOrdersScreen from './screens/Order/MyrderScreen';
import InvoicesScreen from './screens/Profile/InvoicesScreen';
import AddAddressScreen from './screens/Profile/AddAddressScreen ';
import MyOccasionsScreen from './screens/Profile/MyOccasionsScreen';
import MyWalletScreen from './screens/Profile/MyWalletScreen';
import GiftScreen from './screens/Gifts/GiftCardScreen';
import GiftCardScreenDetail  from './screens/Gifts/GiftCardScreenDetail';
import StoreOverviewPage from './screens/Store/StoreOverviewPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenWidth = Dimensions.get('window').width;



const SplashScreen = ({ navigation }) => {
  return (
      <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

          {/* Video Background */}
          <Video
              source={require('./assets/videos/bg.mp4')} // Ensure the video file exists in the correct path
              style={StyleSheet.absoluteFillObject} // Makes the video cover the entire screen
              resizeMode="cover" // Adjust the video to fill the screen while maintaining aspect ratio
              repeat // Loops the video
              muted // Mutes the video
              playInBackground={false} // Stops playing when the app is in the background
              playWhenInactive={false} // Stops playing when the app is inactive
          />

          {/* Overlay Content */}
          <View style={styles.overlay}>
    {/* Logo Image */}
    <Image
        source={require('./assets/images/logo.png')} // Replace with the correct path to your logo image
        style={styles.logo} // Apply styles to adjust size and positioning
    />

              {/* Registration Button */}
              <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                      onPress={() => navigation.navigate('RegistrationPage')} // Navigate to the RegistrationPage
                  >
                      <LinearGradient
                          colors={['#DE8542', '#FE5993']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={[styles.button, { width: screenWidth * 0.8 }]}
                      >
                          <Text style={styles.buttonText}>Registration</Text>
                      </LinearGradient>
                  </TouchableOpacity>
                   {/* Subtext */}
              <Text style={styles.subtext}>
                  Welcome to FLOWRZ! Dive into a world of beautiful flowers. Explore, shop, and share the joy!
              </Text>
              </View>
          </View>
      </View>
  );
};
// Placeholder Screens for Rewards, Gift, and Profile
const RewardsScreen = () => (
    <View style={styles.center}>
        <Text>Rewards Screen</Text>
    </View>
);
// Bottom Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconSource;
        if (route.name === 'Home') {
          iconSource = require('./assets/images/HOME.png');
        } else if (route.name === 'Rewards') {
          iconSource = require('./assets/images/rewards.png');
        } else if (route.name === 'Gift') {
          iconSource = require('./assets/images/gift.png');
        } else if (route.name === 'Profile') {
          iconSource = require('./assets/images/profile.png');
        }

        return focused ? (
          // Linear gradient for selected item
          <LinearGradient
            colors={['#DE8542', '#FE5993']} // Adjust colors for the gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.tabItemSelected}
          >
            <Image
              source={iconSource}
              style={[styles.tabIcon, { tintColor: 'white' }]} // White tint for selected icons
            />
          </LinearGradient>
        ) : (
          // Plain icon for unselected items
          <View style={styles.tabItem}>
            <Image
              source={iconSource}
              style={[styles.tabIcon, { tintColor: 'black' }]} // Black tint for unselected icons
            />
          </View>
        );
      },
      tabBarStyle: {
        height: 50, // Adjust the height of the tab bar
        paddingBottom: 0, // Remove padding at the bottom
      },
      tabBarShowLabel: false, // Disable labels in the bottom navigation
      headerShown: false, // Removes the header for all screens in TabNavigator
    })}
  >
    <Tab.Screen name="Home" component={HomePage} />
    <Tab.Screen name="Rewards" component={RewardsScreen} />
    <Tab.Screen name="Gift" component={GiftScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);





// Main Stack Navigator
const AppNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="RegistrationPage"
            component={RegistrationPage}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="OtpScreen"
            component={OtpScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="ProductOverview"
            component={ProductOverview}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="CartPage"
            component={CartPage}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="CheckoutPage"
            component={CheckoutPage}
            options={{ headerShown: false }}
        />
         <Stack.Screen
            name="OrderDetailpage"
            component={OrderDetailpage}
            options={{ headerShown: false }}
        />
         <Stack.Screen
            name="OrderTracking"
            component={OrderTracking}
            options={{ headerShown: false }}
        />
         <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="PushNotificationsScreen"
            component={PushNotificationsScreen}
            options={{ headerShown: false }}
        />
         <Stack.Screen
            name="MyOrdersScreen"
            component={MyOrdersScreen}
            options={{ headerShown: false }}
        />
         <Stack.Screen
            name="InvoicesScreen"
            component={InvoicesScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="AddAddressScreen"
            component={AddAddressScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="MyOccasionsScreen"
            component={MyOccasionsScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="MyWalletScreen"
            component={MyWalletScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="GiftCardScreenDetail"
            component={GiftCardScreenDetail}
            options={{ headerShown: false }}
        />
         <Stack.Screen
            name="StoreOverviewPage"
            component={StoreOverviewPage}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

const App = () => {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
},
overlay: {
    flex: 1,
    justifyContent: 'space-between', // Aligns content vertically
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay over video
    paddingHorizontal: 20,
    paddingVertical: 40,
},
title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FE5993',
    textAlign: 'center',
    marginTop: 50, // Pushes title down slightly
},
subtext: {
    fontSize: 16,
    color: '#fff', // Set text to white
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 0,
    marginTop:20, // Space above the button
},
buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, // Space at the bottom of the screen
},
button: {
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
},
logo: {
  width: 200, // Adjust width as needed
  height: 200, // Adjust height as needed
  resizeMode: 'contain', // Ensures the image maintains its aspect ratio
  marginTop: 20, // Adds some space from the top
  marginBottom: 0, // Adds space below the logo
},
buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
},
    tabItemSelected: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 35,
      height: 35,
      borderRadius: 25, // Circular shape
    },
    tabIcon: {
      width: 22,
      height: 22,
      resizeMode: 'contain',
    },


});

export default App;
