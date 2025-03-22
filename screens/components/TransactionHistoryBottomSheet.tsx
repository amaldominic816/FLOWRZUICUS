// TransactionHistoryBottomSheet.js

import React from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Colors from '../components/Colors';

const screenHeight = Dimensions.get('window').height; // Get screen height
const bottomSheetHeight = screenHeight * 0.5; // 50% of screen height

const TransactionHistoryBottomSheet = ({ isVisible, onClose, transactions }) => {
  if (!isVisible) return null;

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={[styles.bottomSheet, { height: bottomSheetHeight }]}>
          <Text style={styles.title}>Transaction History</Text>

          {/* Scrollable area for transaction items */}
          <ScrollView contentContainerStyle={styles.transactionList}>
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.transaction_id}
              renderItem={({ item }) => (
                <View style={styles.transactionItem}>
                  <Text style={styles.transactionText}>Type: {item.transaction_type}</Text>
                  <Text style={styles.transactionText}>Amount: AED {item.amount}</Text>
                  <Text style={styles.transactionText}>Status: {item.status}</Text>
                  <Text style={styles.transactionText}>Date: {new Date(item.created_at).toLocaleString()}</Text>
                </View>
              )}
            />
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: Colors.background,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    color: '#F25485',
    marginBottom: 15,
  },
  transactionList: {
    paddingBottom: 20, // Ensure enough space at the bottom
  },
  transactionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#F25485',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TransactionHistoryBottomSheet;
