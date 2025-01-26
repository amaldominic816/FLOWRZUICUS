import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import HeaderInner from '../../screens/components/Headerinner';
import ButtonPrimary from '../components/ButtonPrimary';


const CheckoutPage = ({navigation}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const paymentMethods = [
    { id: 'applepay', name: 'Apple Pay', icon: require('../../assets/images/applepay.png') },
    { id: 'tamara', name: 'Tamara', icon: require('../../assets/images/tamara.png') },
    { id: 'tabby', name: 'Tabby', icon: require('../../assets/images/tabby.png') },
    { id: 'creditcard', name: 'Credit Card', icon: require('../../assets/images/creditcard.png') },
    { id: 'paypal', name: 'PayPal', icon: require('../../assets/images/paypal.png') },
  ];

  return (
    <View style={styles.container}>
       {/* Header Section */}
       <HeaderInner
        title="Checkout"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={()=>navigation.navigate('CartPage')}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>


        {/* Delivery Address Section */}
        <View style={styles.deliveryAddressRow}>
          <Text style={styles.sectionTitleLeft}>Delivery Address</Text>
          <TouchableOpacity style={styles.addButton}>
            <Image source={require('../../assets/images/plus.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.editButtonTopRight}>
            <Image source={require('../../assets/images/ed.png')} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.addressContainer}>
            <Text style={styles.addressLabel}>Shipping Address</Text>
            <Text style={styles.addressName}>Salim Al Tajir</Text>
            <View style={styles.iconRow}>
              <Image source={require('../../assets/images/call.png')} style={styles.icon} />
              <Text style={styles.addressDetails}>+971 56 333 9262</Text>
            </View>
            <View style={styles.iconRow}>
              <Image source={require('../../assets/images/location.png')} style={styles.icon} />
              <View>
                <Text style={styles.addressDetails}>123 west 45th Street, Saudi Arab</Text>
                <Text style={styles.addressCity}>Madinah</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Method Section */}
        <Text style={styles.sectionTitleLeft}>Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentOption,
              selectedPaymentMethod === method.id && styles.paymentOptionSelected,
            ]}
            onPress={() => setSelectedPaymentMethod(method.id)}
          >
            <Image source={method.icon} style={styles.paymentIcon} />
            <Text style={styles.paymentText}>{method.name}</Text>
          <View style={styles.radioButton}>
  {selectedPaymentMethod === method.id && (
    <View style={styles.radioInnerCircle} />
  )}
</View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Summary and Pay Now Button */}
      <View style={styles.floatingContainer}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal:</Text>
            <Text style={styles.summaryText}>$50.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Delivery Fee:</Text>
            <Text style={styles.summaryText}>$5.00</Text>
          </View>
           <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Total Amount:</Text>
            <Text style={styles.totalText}>$55.00</Text>
          </View>
        </View>

         <ButtonPrimary
                 buttonText="Pay Now"
                 onPress={() => navigation.navigate('OrderDetailpage')}
                 buttonWidth={Dimensions.get('window').width * 0.9} // Set width to 80% of the screen width
                 buttonHeight={50}
                 fontSize={20}
                 gradientColors={['#DE8542', '#FE5993']} // Optional custom gradient
               />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 230, // Add extra space for floating footer
  },
  summaryContainer: {
    marginBottom: 16,
    backgroundColor: '#F6CFAC',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#F9F9F9',
  },
  iconButton2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE0C4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginRight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#D2AE8FFF',
    marginVertical: 8,
  },
  iconImage: { width: 24,
    height: 24,
    borderRadius: 10},
      content: {padding: 16},
     cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 16,
    borderRadius: 10,
    padding: 10,
  },
  iconButtonn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  cartIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  deliveryAddressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleLeft: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  addButton: {
    backgroundColor: '#F9F9F9',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  editButtonTopRight: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  addressContainer: {
    paddingBottom: 16,
  },
  addressLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  addressDetails: {
    fontSize: 14,
    color: '#666',
  },
  addressCity: {
    fontSize: 14,
    color: '#999',
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 0,
    borderColor: '#DDD',
  },
  paymentOptionSelected: {
    borderColor: '#FF7E5F',
    backgroundColor: '#FFF',
  },
  paymentIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
    resizeMode:'contain',
  },
  paymentText: {
    fontSize: 16,
    flex: 1,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12, // Outer circle
    borderWidth: 2,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  radioButtonSelected: {
    borderColor: '#FF7E5F',
  },
  
  radioInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6, // Inner circle
    backgroundColor: '#FF7E5F',
  },
  floatingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#555',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  payNowButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payNowText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default CheckoutPage;
