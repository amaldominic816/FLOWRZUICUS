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

// Import screens
import RegistrationPage from './screens/Authentication/RegisterPage';
import OtpScreen from './screens/Authentication/OTPScreen';
import ProductOverview from './screens/Store/ProductScreen';
import CartPage from './screens/Cart/CartPage';
import HomePage from './screens/Home/HomePage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenWidth = Dimensions.get('window').width;



const SplashScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

            {/* App Title */}
            <Text style={styles.title}>FLOWRZ</Text>

            {/* Decorative Image */}
            <Image
                source={require('./assets/images/flower.png')} // Ensure the image exists
                style={styles.image}
            />

            {/* Registration Button */}
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

            {/* Descriptive Text */}
            <Text style={styles.subtext}>
                Welcome to FLOWRZ! Dive into a world of beautiful flowers. Explore, shop, and share the joy!
            </Text>
        </View>
    );
};
// Placeholder Screens for Rewards, Gift, and Profile
const RewardsScreen = () => (
    <View style={styles.center}>
        <Text>Rewards Screen</Text>
    </View>
);

const GiftScreen = () => (
    <View style={styles.center}>
        <Text>Gift Screen</Text>
    </View>
);

const ProfileScreen = () => (
    <View style={styles.center}>
        <Text>Profile Screen</Text>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 40,
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#FE5993',
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 30,
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
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    subtext: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabItem: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 30,
      height: 30,
      borderRadius: 25, // Circular shape for the icon background
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
