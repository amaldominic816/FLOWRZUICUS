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
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { Snackbar } from 'react-native-paper';
import { fetchUserDetails } from '../redux/slices/userSlice';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch();
  const { loading, token } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!username || !password) {
      showSnackbar('Username and password are required!', 'error');
      return;
    }

    try {
      const resultAction = await dispatch(loginUser({ username, password }));

      if (loginUser.fulfilled.match(resultAction)) { // Check if login was successful
        showSnackbar('Login successful!', 'success');

        // Fetch user details after login
        const userDetailsAction = await dispatch(fetchUserDetails(resultAction.payload.token)); // assuming your fetchUserDetails takes a token

        if (fetchUserDetails.fulfilled.match(userDetailsAction)) {
          console.log('User details fetched successfully:', userDetailsAction.payload);
          // Navigate to Main after login and fetching user details
          navigation.replace('Main');
        } else {
          showSnackbar(userDetailsAction.error.message || 'Failed to fetch user details.', 'error');
        }

      } else {
        showSnackbar(resultAction.error.message || 'Login failed. Please check your credentials.', 'error');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error); // Log unexpected errors
      showSnackbar(error.message || 'Login failed. Please check your credentials.', 'error');
    }
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };

  const safeAreaStyle = {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 20 : 0,
  };

  return (
    <SafeAreaView style={[styles.safeArea, safeAreaStyle]}>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.logo}>FLOWRZ</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#999"
          />

          <TouchableOpacity onPress={handleLogin} activeOpacity={0.8}>
            <LinearGradient
              colors={['#DE8542', '#FE5993']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RegistrationPage')}>
            <Text style={styles.registerText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={hideSnackbar}
        duration={3000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
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
  registerText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
    color: '#DE8542',
  },
  snackbar: {
    backgroundColor: '#333', // You can customize the background color
  },
});

export default LoginPage;
