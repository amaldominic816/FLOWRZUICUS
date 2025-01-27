import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import HeaderInner from '../../screens/components/Headerinner';
import ButtonPrimary from '../components/ButtonPrimary';
import Colors from '../components/Colors';

const AddAddressScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <HeaderInner
        title="Saved Address"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() =>
          navigation.navigate('PushNotificationsScreen')
        }
        onCartPress={() => navigation.navigate('CartPage')}
      />

      {/* Empty State */}
      <View style={styles.emptyState}>
        {/* Add New Address Button */}
        <ButtonPrimary
          buttonText="+ Add Address"
          onPress={() => navigation.navigate('')}
          buttonWidth={Dimensions.get('window').width * 0.8} // Set width to 80% of the screen width
          buttonHeight={40}
          fontSize={12}
          gradientColors={['#DE8542', '#FE5993']} // Optional custom gradient
        />

        <View style={styles.emptyIconWrapper}>
          <Image
            source={require('../../assets/images/empty-address.png')} // Replace with your empty icon
            style={styles.emptyIcon}
          />
        </View>
        <Text style={styles.emptyText}>You have no saved Address</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  backButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -200,
  },
  emptyIconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 20,
    marginBottom: 0, // Add some space between the icon and the button
  },
  emptyIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#555',
    textAlign: 'center',
    marginTop: 0, // Add some spacing between the text and the icon
  },
});

export default AddAddressScreen;
