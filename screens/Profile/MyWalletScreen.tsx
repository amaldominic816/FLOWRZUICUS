// MyWalletScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Modal, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWalletBalance, fetchTransactions, addFunds } from '../redux/slices/walletSlice';
import HeaderInner from '../../screens/components/Headerinner';
import ButtonPrimary from '../components/ButtonPrimary';
import Colors from '../components/Colors';
import TransactionHistoryBottomSheet from '../components/TransactionHistoryBottomSheet';

const MyWalletScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { balance, transactions, status, addFundsStatus, addFundsError } = useSelector((state) => state.wallet);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    dispatch(fetchWalletBalance()); // Fetch wallet balance
    dispatch(fetchTransactions()); // Fetch transaction history
  }, [dispatch]);

  const handleAddMoney = () => {
    if (amount) {
      dispatch(addFunds(amount)); // Call the addFunds thunk with the entered amount
      setAmount(''); // Clear the input field
      setIsModalVisible(false); // Close the modal
    }
  };

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <HeaderInner
        title="Wallet"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
      />

      <View style={styles.walletSection}>
        <View style={styles.iconWrapper}>
          <Image
            source={require('../../assets/images/wallet-icon.png')}
            style={styles.walletIcon}
          />
        </View>
        <Text style={styles.walletTitle}>FLOWRZ Wallet</Text>
        <Text style={styles.walletDescription}>
          A quick and convenient way to pay and refund
        </Text>

        {/* Display wallet balance */}
        <Text style={styles.walletBalance}>{`AED ${balance}`}</Text>

        {/* Add Money Button */}
        <ButtonPrimary
          buttonText="Add Money"
          onPress={() => setIsModalVisible(true)} // Show modal on click
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

      {/* Bottom sheet for transaction history */}
      <TransactionHistoryBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        transactions={transactions} // Pass transactions here
      />

      {/* Modal for adding money */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Amount to Add</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <Button title="Add Money" onPress={handleAddMoney} />
            {addFundsStatus === 'loading' && <Text>Adding money...</Text>}
            {addFundsStatus === 'succeeded' && <Text>Money Added!</Text>}
            {addFundsStatus === 'failed' && <Text style={styles.errorText}>{addFundsError}</Text>}
            <Button title="Close" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
    fontFamily: 'DMSans-Bold',
    color: '#F25485',
    marginBottom: 5,
  },
  walletDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'DMSans-Regular',
  },
  walletBalance: {
    fontSize: 30,
    fontFamily: 'DMSans-Bold',
    color: '#F25485',
    marginBottom: 20,
  },
  transactionHistory: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    color: '#F25485',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    marginBottom: 15,
  },
  amountInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default MyWalletScreen;
