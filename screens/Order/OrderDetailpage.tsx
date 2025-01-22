import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,ScrollView, } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';


const OrderDetails = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton2}>
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Path d="M15 19l-7-7 7-7" stroke="#000" strokeWidth="2" fill="none" />
          </Svg>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Order Details</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.iconButtonn}>
            <Image source={require('../../assets/images/cart.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButtonn}>
            <Image source={require('../../assets/images/notification.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Order Status Section */}
      <View style={styles.orderContainer}>
        <View style={styles.orderHeader}>
          <Image
            source={require('../../assets/images/giving.png')}
            style={styles.recipientImage}
          />
          <View style={styles.orderDetails}>
            <Text style={styles.orderNumber}>Order No: 10129036</Text>
            <TouchableOpacity style={styles.copyButton}>
              <Image
                source={require('../../assets/images/copy.png')}
                style={styles.copyIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
  style={styles.trackButton}
  onPress={() => navigation.navigate('OrderTracking')} // Move the onPress here
>
  <LinearGradient
    colors={["#FF7E5F", "#FD3A84"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.trackButtonGradient}
  >
    <View style={styles.trackButtonContent}>
      <Text style={styles.trackButtonText}>Track order</Text>
    </View>
  </LinearGradient>
</TouchableOpacity>






        <Text style={styles.deliveryStatus}>Delivered</Text>
        <Text style={styles.deliveryMessage}>
          The recipient has happily received your gift.
        </Text>

        {/* Steps */}
        <View style={styles.stepsContainer}>
          {["Received", "Preparing", "Delivering", "Delivered"].map((step, index) => (
            <View key={index} style={styles.step}>
              <View style={styles.stepIcon}>
                <Svg width="24" height="24" viewBox="0 0 24 24">
                  <Path
                    d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z"
                    stroke="#FF8A80"
                    strokeWidth="2"
                    fill="none"
                  />
                </Svg>
              </View>
              <Text style={styles.stepLabel}>{step}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
                onPress={() => navigation.navigate('OrderDetailpage')}>
                 <LinearGradient
                   colors={["#FF7E5F", "#FD3A84"]}
                   start={{ x: 0, y: 0 }}
                   end={{ x: 1, y: 0 }}
                   style={styles.needHelpButton}
                 >
                   <Text style={styles.needHelpText}>Need Help ?</Text>
                 </LinearGradient>
               </TouchableOpacity>
      </View>

      {/* Delivery Section */}
      <View style={styles.deliveryContainer}>
        <View style={styles.deliveryIconWrapper}>
          <Image
            source={require('../../assets/images/van.png')}
            style={styles.deliveryIcon}
          />
        </View>
        <View style={styles.deliveryTextWrapper}>
          <Text style={styles.deliveryLabel}>Delivery</Text>
          <Text style={styles.deliveryDate}>07 / 05 / 2024 5:00 PM - 9:00 PM</Text>
        </View>
      </View>

      {/* Product Section */}
      <View style={styles.productContainer}>
        <View style={styles.productDetails}>
          <Image
            source={require('../../assets/images/flower.png')}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Pink Tulips</Text>
            <Text style={styles.productQty}>Qty: 2</Text>
          </View>
          <Text style={styles.productPrice}>AED 209.52</Text>
        </View>
      </View>

      {/* Payment Details Section */}
      <View style={styles.paymentContainer}>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Subtotal</Text>
          <Text style={styles.paymentValue}>AED 220.00</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Delivery charges</Text>
          <Text style={styles.paymentValue}>AED 50.00</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Floward Wallet</Text>
          <Text style={styles.paymentValue}>Free</Text>
        </View>
        <Text style={styles.paymentNote}>
          Please note that specific regions and express delivery may incur extra delivery fees.
        </Text>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Paid with</Text>
          <Text style={styles.paymentValue}>Apple Pay</Text>
        </View>
      </View>
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    paddingBottom: 20, // Add some padding for better spacing at the bottom
  },
  copyIcon: {
    width: 75, // Adjust the size as needed
    height: 75,
    marginTop: 4, // Aligns with the order number text
    resizeMode: 'contain',
  },
  orderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButton: {
    marginLeft: 0, // Space between the text and the icon
  },
  iconButtonn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  iconImage: { width: 24, height: 24 },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  deliveryIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  deliveryIcon: {
    width: 75,
    height: 75,
    resizeMode: 'contain', // Ensures the image fits well
  },
  deliveryTextWrapper: {
    flex: 1,
  },
  deliveryLabel: {
    fontSize: 14,
    color: '#7E7E7E',
    marginBottom: 4,
  },
  deliveryDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  
  iconButton2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE0C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  orderContainer: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  recipientImage: {
    width: 70,
    height: 70,
    marginRight: 16,
    resizeMode:'contain',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  copyText: {
    fontSize: 12,
    color: '#FF8A80',
  },
  trackButton: {
    marginVertical: 8,
    alignSelf: 'center', // Centers the button horizontally
    width: '100%', // Matches the parent container width
  },
  trackButtonGradient: {
    padding: 2, // Gradient border thickness
    borderRadius: 12, // Ensures the gradient border matches the button's radius
  },
  trackButtonContent: {
    backgroundColor: '#FFF', // White background inside the gradient border
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FD3A84', // Matches the gradient color for text
    textAlign: 'center',
  },
  deliveryStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  deliveryMessage: {
    fontSize: 14,
    color: '#7E7E7E',
    marginVertical: 8,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  step: {
    alignItems: 'center',
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE0C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#7E7E7E',
  },
  needHelpButton: {
    backgroundColor: '#FF8A80',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
  },
  needHelpText: {
    color: '#fff',
    fontWeight: '600',
  },
  productContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 16,
    resizeMode: 'contain',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  productQty: {
    fontSize: 14,
    color: '#7E7E7E',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  paymentContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#7E7E7E',
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  paymentNote: {
    fontSize: 12,
    color: '#7E7E7E',
    marginTop: 8,
    marginBottom: 16,
  },
});

export default OrderDetails;
