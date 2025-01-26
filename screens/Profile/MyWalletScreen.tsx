import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import HeaderInner from '../../screens/components/Headerinner';
import ButtonPrimary from '../components/ButtonPrimary';


const MyWalletScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <HeaderInner
        title="Wallet"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={()=>navigation.navigate('CartPage')}
      />

      {/* Wallet Section */}
      <View style={styles.walletSection}>
        <View style={styles.iconWrapper}>
          <Image
            source={require('../../assets/images/wallet-icon.png')} // Replace with the actual wallet icon
            style={styles.walletIcon}
          />
        </View>
        <Text style={styles.walletTitle}>FLOWRZ Wallet</Text>
        <Text style={styles.walletDescription}>
          A quick and convenient way to pay and refund
        </Text>

        {/* Wallet Balance Button */}
        <ButtonPrimary
                 buttonText="Save & Continue"
                 onPress={() => navigation.navigate('RegistrationPage')}
                 buttonWidth={Dimensions.get('window').width * 0.8}
                 buttonHeight={40}
                 fontSize={12}
                 gradientColors={['#DE8542', '#FE5993']}
               />

        {/* Transaction History Link */}
        <TouchableOpacity>
          <Text style={styles.transactionHistory}>Transaction history</Text>
        </TouchableOpacity>
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
    padding: 15,
    backgroundColor: '#F9F9F9',
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
  walletSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconWrapper: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 50,
    marginBottom: 15,
  },
  walletIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F25485',
    marginBottom: 5,
  },
  walletDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  balanceButton: {
    width: '60%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  balanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  transactionHistory: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F25485',
    marginTop: 20,
  },
});

export default MyWalletScreen;
