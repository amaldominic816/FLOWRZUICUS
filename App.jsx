import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Video from 'react-native-video';
import ButtonPrimary from './screens/components/ButtonPrimary';
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
import GiftCardScreenDetail from './screens/Gifts/GiftCardScreenDetail';
import StoreOverviewPage from './screens/Store/StoreOverviewPage';
import RewardsScreen from './screens/Rewards/RewardsScreen';
import EditProfileScreen from './screens/Profile/EditProfileScreen';
import HelpScreen  from './screens/Profile/HelpScreen';
import SearchProducts from './screens/Home/SearchProducts';
import EventScreen from './screens/Events/EventPage';
import FlashMessage from 'react-native-flash-message';
import LoginPage from './screens/Authentication/LoginPage';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './screens/redux/store';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserDetails } from './screens/redux/slices/userSlice';
import OccasionBannersPage from './screens/Home/OccasionPannerPage';
import CategoriesPage from './screens/Home/CategoriesPage';
import StoresPage from './screens/Home/StoresPage';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenWidth = Dimensions.get('window').width;


const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Import useDispatch
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');

      if (username && password) {
        setIsLoggedIn(true);
        // Fetch user details and then navigate to Main screen
        await dispatch(fetchUserDetails()); // Fetch user details
        navigation.replace('Main');
      } else {
        setTimeout(() => {
          navigation.replace('LoginPage');
        }, 5000); // Wait for 3 seconds before navigating 
      }
    };

    checkLoginStatus();
  }, [navigation, dispatch]); // Add dispatch to the dependencies array



  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <Video
        source={require('./assets/videos/bg.mp4')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
        repeat
        muted
      />

      <View style={styles.overlay}>
        {/* Logo Image */}
        <Image
          source={require('./assets/images/logo.png')}
          style={styles.logo}
        />

        {!isLoggedIn && ( // Only show buttons if user is NOT logged in
          <View style={styles.bottomContainer}>
            
            <Text style={styles.subtext}>
              Welcome to FLOWRZ! Dive into a world of beautiful flowers. Explore, shop, and share the joy!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};


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
        } else if (route.name === 'Events') { // Make sure the route name matches exactly
          iconSource = require('./assets/images/event.png');
        }

        return focused ? (
          // Linear gradient for selected item
          <LinearGradient
            colors={['#DE8542', '#FE5993']}
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
      // Style for the label text
      tabBarLabelStyle: {
        marginTop:5,
        fontSize: 12,           // Adjust font size
        fontFamily: 'DMSans-SemiBold', // Use your desired font family      // Adjust the weight if needed
        marginBottom: 0,        // Provide spacing from the bottom edge
      },
      tabBarActiveTintColor: '#000000FF',  // Color for the active label
      tabBarInactiveTintColor: '#BABABAFF',// Color for the inactive label
      tabBarStyle: {
        height: 60,           // Adjust the height of the tab bar if necessary
        paddingBottom: 0,
      },
      tabBarShowLabel: true,   // Enable label display
      headerShown: false,      // Hide the header in the tab navigator
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomePage}
      options={{ tabBarLabel: 'Home' }}
    />
    <Tab.Screen
      name="Rewards"
      component={RewardsScreen}
      options={{ tabBarLabel: 'Rewards' }}
    />
    <Tab.Screen
      name="Gift"
      component={GiftScreen}
      options={{ tabBarLabel: 'Gift' }}
    />
    <Tab.Screen
      name="Events"
      component={EventScreen}
      options={{ tabBarLabel: 'Events' }}
    />
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
      name="LoginPage"
      component={LoginPage}
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
      name="OccasionBannersPage"
      component={OccasionBannersPage}
      options={{ headerShown: false }}
    />
       <Stack.Screen
      name="CategoriesPage"
      component={CategoriesPage}
      options={{ headerShown: false }}
    />
         <Stack.Screen
      name="StoresPage"
      component={StoresPage}
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
      name="EditProfileScreen"
      component={EditProfileScreen}
      options={{ headerShown: false }}
    />
     <Stack.Screen
      name="HelpScreen"
      component={HelpScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SearchProducts"
      component={SearchProducts}
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
    <Provider store={store}> {/* Wrap with Provider */}
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
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

  

  bottomContainer: {
    position: 'absolute', // Aligns the container to the bottom of the screen
    bottom: 40, // Adds spacing from the bottom
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  subtext: {
    fontSize: 16,
    color: '#fff', // Set text to white
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginTop: 10, // Space above the subtext
    fontFamily:'DMSans-Regular',
  },




  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center', // Center text horizontally
  },



  logo: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    resizeMode: 'contain', // Ensures the image maintains its aspect ratio
    marginTop: 20, // Adds some space from the top
    marginBottom: 0, // Adds space below the logo
  },

  tabItemSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    marginTop:10,
    borderRadius: 25, // Circular shape
  },
  tabIcon: {
    marginTop:10,
    marginBottom:10,
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  tabItem:{
    marginTop:20,
    width: 22,
    height: 22,
    marginBottom:30,
    resizeMode: 'contain',
  },


});

export default App;
