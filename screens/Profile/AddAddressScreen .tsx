import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderInner from '../../screens/components/Headerinner';


const AddAddressScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <HeaderInner
        title="Address"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={()=>navigation.navigate('CartPage')}
      />

      {/* Add New Address Button */}
       <TouchableOpacity style={styles.addAddressButton}>
                  <LinearGradient colors={['#FF7E5F', '#FD3A84']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.applyGradient}>
                    <Text style={styles.addAddressButtonText}>+ Add new Address</Text>
                  </LinearGradient>
                </TouchableOpacity>
      {/* Empty State */}
      <View style={styles.emptyState}>
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
    backgroundColor: '#F9F9F9',

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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  addAddressButton: {marginLeft: 0,marginTop:200,marginBottom:0},
  applyGradient: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft:20,
    marginRight:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAddressButtonText: {
   color: '#FFF', fontSize: 14, fontWeight: 'bold'  },
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
    marginBottom: 0,
  },
  emptyIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  emptyText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default AddAddressScreen;
