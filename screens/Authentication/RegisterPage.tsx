import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { registerUser } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';



const RegistrationPage = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('🇦🇪');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
      showMessage({
        message: 'All fields are required!',
        type: 'danger',
        duration: 3000, // 3 seconds
      });
      return;
    }

    if (password !== confirmPassword) {
      showMessage({
        message: 'Passwords do not match!',
        type: 'danger',
        duration: 3000,
      });
      return;
    }

    try {
      const userData = {
        username: fullName,
        email,
        phone: phoneNumber,
        password,
        address: 'default',
      };

      const response = await registerUser(userData);

      if (response.token) {
        await AsyncStorage.setItem('token', response.token);
      }

      showMessage({
        message: 'Registration successful! Proceed to OTP verification.',
        type: 'success',
        duration: 3000,
      });

      setTimeout(() => {
        navigation.navigate('OtpScreen');
      }, 2000);

    } catch (error) {
      showMessage({
        message: error.error || 'Registration failed. Please try again.',
        type: 'danger',
        duration: 3000,
      });
    }
  };

  const safeAreaStyle = {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 20 : 0,
  };

  return (
    <SafeAreaView style={[styles.safeArea, safeAreaStyle]}>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.logo}>FLOWRZ</Text>
        <Text style={styles.subtitle}>Create your account</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.countryCodeInput}
              value={countryCode}
              onChangeText={setCountryCode}
              keyboardType="phone-pad"
              placeholder="+971"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#999"
          />

          <TouchableOpacity onPress={handleRegister} activeOpacity={0.8}>
            <LinearGradient
              colors={['#DE8542', '#FE5993']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 50,
    fontFamily: 'DMSans-Bold',
    color: '#ff7f50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
    fontFamily: 'DMSans-Regular',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'DMSans-Regular',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginBottom: 15,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  countryCodeInput: {
    width: '25%',
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#333',
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#333',
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default RegistrationPage;


