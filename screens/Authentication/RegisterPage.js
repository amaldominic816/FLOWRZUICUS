import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const RegistrationPage = ({ navigation }) => {
    const [countryCode, setCountryCode] = useState('   🇦🇪'); // Default country code
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleRegister = () => {
        const fullPhoneNumber = countryCode + phoneNumber;
        console.log('Full phone number:', fullPhoneNumber);
        // Handle registration logic here
        navigation.navigate('OtpScreen');
    };

    return (
        <View style={styles.container}>
            {/* Set the status bar color */}
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <Text style={styles.logo}>FLOWRZ</Text>
            <Text style={styles.subtitle}>Log in to your account</Text>

            {/* Phone number input field with country code */}
            <View style={styles.inputContainer}>
                <View style={styles.countryCodeContainer}>
                    <TextInput
                        style={[styles.input, { width: '20%' }]}
                        value={countryCode}
                        onChangeText={setCountryCode}
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        style={[styles.input, { width: Dimensions.get('window').width * 0.8 - 80 }]} // Match button width
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        placeholder="Enter phone number"
                        keyboardType="phone-pad"
                    />
                </View>
            </View>

            <TouchableOpacity onPress={handleRegister}>
        <LinearGradient
          colors={['#DE8542', '#FE5993']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button, { width: Dimensions.get('window').width * 0.8 }]}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </LinearGradient>
      </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingTop: 40,
    },
    logo: {
      fontSize: 45,
      fontWeight: 'bold',
      color: '#ff7f50',
      fontFamily: 'GeneralSans-Regular',
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 16,
      color: '#888',
      marginBottom: 30,
    },
    inputContainer: {
      width: '80%',
      marginBottom: 20,
    },
    countryCodeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '110%',
    },
    input: {
      padding: 16, // Increased padding for larger size
      fontSize: 18, // Increased font size
      height: 50, // Set a fixed height for larger input fields
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      backgroundColor: '#fff',
    },
    buttonWrapper: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 40, // Add more space if needed
    },
    
    button: {
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center', // Center text vertically
      height: 50, // Fixed height for the button
      width: '80%', // Dynamic width based on screen size
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
      textAlign: 'center', // Center text horizontally
    },
  });

export default RegistrationPage;
