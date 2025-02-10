import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../screens/components/Header';
import Colors from '../components/Colors';

const EventScreen = () => {
    const navigation = useNavigation();
return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Top Bar */}
          <Header
            title="Events" // Dynamic title
            showCartIcon={true} // Show cart icon
            showNotificationIcon={true} // Show notification icon
            showProfileIcon={false} // Show profile icon
            onCartPress={() => navigation.navigate('CartPage')}
            onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
            onProfilePress={() => navigation.navigate('ProfileScreen')}
          />
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
        });

        export default EventScreen;
