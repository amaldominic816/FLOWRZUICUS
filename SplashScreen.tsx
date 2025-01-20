import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationPage from './RegisterPage'; 
import OtpScreen from './OTPScreen';
import ProductOverview from './ProductScreen';
import CartPage from './CartPage';

const Stack = createStackNavigator();
const screenWidth = Dimensions.get('window').width;

const SplashScreen = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
            {/* Set the status bar color */}
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

            {/* App Title */}
            <Text style={styles.title}>FLOWRZ</Text>

            {/* Flower Image */}
            <Image
                source={require('./assets/images/flower.png')} // Make sure the path is correct
                style={styles.image}
            />

            {/* Registration Button */}
            <TouchableOpacity onPress={() => navigation.navigate('RegistrationPage')}>
                <LinearGradient
                    colors={['#DE8542', '#FE5993']} // Gradient colors
                    start={{ x: 0, y: 0 }} // Start of the gradient
                    end={{ x: 1, y: 0 }} // End of the gradient
                    style={[styles.button, { width: screenWidth * 0.8 }]} // Set the width to 80% of screen width
                >
                    <Text style={styles.buttonText}>REGISTRATION</Text>
                </LinearGradient>
            </TouchableOpacity>

            {/* Subtext */}
            <Text style={styles.subtext}>
                Register quickly to explore, share, and cherish beautiful flowers. Create your account now and brighten your experience!
            </Text>
        </View>
    );
};

const AppNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }} // Hide header for splash screen
        />
        <Stack.Screen
            name="RegistrationPage"
            component={RegistrationPage} // Make sure this component is defined
            options={{ headerShown: false }} // Hide header for registration page
        />
         <Stack.Screen
            name="OtpScreen"
            component={OtpScreen} // Make sure this component is defined
            options={{ headerShown: false }} // Hide header for registration page
        />
        <Stack.Screen
            name="ProductOverview"
            component={ProductOverview} // Make sure this component is defined
            options={{ headerShown: false }} // Hide header for registration page
        />
        <Stack.Screen
            name="CartPage"
            component={CartPage} // Make sure this component is defined
            options={{ headerShown: false }} // Hide header for registration page
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
        color: '#ff7f50',
        fontFamily: 'GeneralSans-Regular', // Make sure this font is installed or replace with a default one
        marginBottom: 20,
    },
    image: {
        width: 400,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    button: {
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom: 0,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    subtext: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        lineHeight: 20,
        marginTop: 0,
    },
});

export default App; 