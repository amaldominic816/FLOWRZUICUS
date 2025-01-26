import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import HeaderInner from '../../screens/components/Headerinner';


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

const InvoicesScreen = ({navigation}) => {
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
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={()=>navigation.navigate('CartPage')}
      />


      {/* Invoices List */}
      <FlatList
        data={invoices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    padding: 10,
  },
  invoiceCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
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
    fontWeight: 'bold',
  },
});

export default InvoicesScreen;
