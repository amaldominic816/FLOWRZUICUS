import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import HeaderInner from '../../screens/components/Headerinner';
import Colors from '../components/Colors';

const HelpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <HeaderInner
        title="Help & Support"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
      />

      {/* Contact Us Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Us</Text>
        <Text style={styles.cardContent}>Phone: +1 234 567 890</Text>
        <Text style={styles.cardContent}>Address: 123 Main Street, City, Country</Text>
      </View>

      {/* Support Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Support</Text>
        <Text style={styles.cardContent}>WhatsApp: +1 987 654 321</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Live Chat Pressed')}
        >
          <Text style={styles.buttonText}>Live Chat</Text>
        </TouchableOpacity>
      </View>

      {/* Email Address Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Email Address</Text>
        <Text style={styles.cardContent}>support@example.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    
  },
  card: {
    
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    marginTop:30,
    marginLeft:10,
    marginRight:10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontFamily:'DMSans-Bold',
    marginBottom: 8,
    color: Colors.textSecondary,
  },
  cardContent: {
    fontSize: 16,
    marginBottom: 4,
    color: Colors.text,
    fontFamily:'DMSans-Regular',
  },
  button: {
    marginTop: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily:'DMSans-Bold',
  },
});

export default HelpScreen;