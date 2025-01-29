import React, {useState }from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import HeaderInner from '../../screens/components/Headerinner';
import ButtonPrimary from '../components/ButtonPrimary';
import Colors from '../components/Colors';
import TransactionHistoryBottomSheet from '../components/TransactionHistoryBottomSheet'; // Import the bottom sheet component



const MyWalletScreen = ({navigation}) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false); // State for bottom sheet visibility
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
                 buttonText="Add Money"
                 onPress={() => navigation.navigate('')}
                 buttonWidth={Dimensions.get('window').width * 0.8}
                 buttonHeight={40}
                 fontSize={12}
                 gradientColors={['#DE8542', '#FE5993']}
               />

        {/* Transaction History Link */}
        <TouchableOpacity onPress={() => setIsBottomSheetVisible(true)}>
          <Text style={styles.transactionHistory}>Transaction history</Text>
        </TouchableOpacity>
      </View>
      <TransactionHistoryBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)} // Close the bottom sheet
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  walletSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  iconWrapper: {
    backgroundColor: Colors.secondary,
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
    fontFamily:'DMSans-Bold',
    color: '#F25485',
    marginBottom: 5,
  },
  walletDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily:'DMSans-Regular',
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
    fontFamily:'DMSans-Bold',
    color: '#fff',
  },
  transactionHistory: {
    fontSize: 14,
    fontFamily:'DMSans-Bold',
    color: '#F25485',
    marginTop: 20,
  },
});

export default MyWalletScreen;
