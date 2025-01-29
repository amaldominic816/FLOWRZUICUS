import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

// Dummy transaction data
const transactions = [
  { id: '1', type: 'Credit', amount: '+ $50.00', date: '2023-10-01' },
  { id: '2', type: 'Debit', amount: '- $20.00', date: '2023-10-02' },
  { id: '3', type: 'Credit', amount: '+ $30.00', date: '2023-10-03' },
  { id: '4', type: 'Debit', amount: '- $10.00', date: '2023-10-04' },
];

const TransactionHistoryBottomSheet = ({ isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Transaction History</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionType}>{item.type}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text style={styles.transactionAmount}>{item.amount}</Text>
            </View>
          )}
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: Dimensions.get('window').height * 0.6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  transactionType: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FF6F61',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionHistoryBottomSheet;
