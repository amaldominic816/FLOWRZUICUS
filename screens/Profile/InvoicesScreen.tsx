import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import HeaderInner from '../../screens/components/Headerinner';
import Colors from '../components/Colors';

const invoices = [
  {
    id: '1',
    orderId: '#154144124',
    country: 'United Arab Emirates',
    currency: 'AED',
    serialNumber: 'AE244655254415',
    invoiceDate: '2025-02-02T18:30:05.979',
    amount: '999',
  },
  {
    id: '2',
    orderId: '#21656454',
    country: 'United Arab Emirates',
    currency: 'AED',
    serialNumber: 'AE244655254415',
    invoiceDate: '2025-02-02T18:30:05.979',
    amount: '999',
  },
  {
    id: '3',
    orderId: '#14254478',
    country: 'United Arab Emirates',
    currency: 'AED',
    serialNumber: 'AE244655254415',
    invoiceDate: '2025-02-02T18:30:05.979',
    amount: '999',
  },
];

const InvoicesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.invoiceCard}>
      <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
      <Text style={styles.detailText}>Country: {item.country}</Text>
      <Text style={styles.detailText}>Currency: {item.currency}</Text>
      <Text style={styles.detailText}>Serial Number: {item.serialNumber}</Text>
      <Text style={styles.detailText}>Invoice Date: {item.invoiceDate}</Text>
      <Text style={styles.detailText}>Amount: {item.amount}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Invoice Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <HeaderInner
        title="Invoices"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() =>
          navigation.navigate('PushNotificationsScreen')
        }
        onCartPress={() => navigation.navigate('CartPage')}
      />

      {/* Invoices List */}
      <View style={styles.listWrapper}>
        <FlatList
          data={invoices}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false} // Hide vertical scroll bar for cleaner UI
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listWrapper: {
    flex: 1,
    marginTop: 20, // Add margin at the top to separate content from the header
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20, // Add padding at the bottom for better spacing
  },
  invoiceCard: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  orderId: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontFamily: 'DMSans-Regular',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#FFE0E6',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#F25485',
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
  },
});

export default InvoicesScreen;
