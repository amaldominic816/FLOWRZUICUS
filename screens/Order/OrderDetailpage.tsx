import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import HeaderInner from '../../screens/components/Headerinner';
import ButtonOutlined from '../components/ButtonOutlined';
import ButtonPrimary from '../components/ButtonPrimary';
import Colors from '../components/Colors';
import { useSelector } from 'react-redux';

const OrderDetails = ({ navigation, route }) => {
  // Get the orderId from route params passed when navigating
  const { orderId } = route.params;
  // Retrieve the order details from the orders slice using the orderId
  const order = useSelector(state =>
    state.orders.orders.find(o => o.id === orderId)
  );

  // If order data is not yet available, show a loading indicator
  if (!order) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }

  // For product section, use order.items if available; otherwise show a message.
  const orderItems =
    order.items && order.items.length > 0 ? order.items : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <HeaderInner
        title="Order Details"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
      />

      {/* Order Status Section */}
      <View style={styles.orderContainer}>
        <View style={styles.orderHeader}>
          <Image
            source={require('../../assets/images/giving.png')}
            style={styles.recipientImage}
          />
          <View style={styles.orderDetails}>
            <Text style={styles.orderNumber}>Order No: {order.order_number}</Text>
            <TouchableOpacity style={styles.copyButton}>
              <Image
                source={require('../../assets/images/copy.png')}
                style={styles.copyIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ButtonOutlined
          buttonText="Track Order"
          onPress={() => navigation.navigate('OrderTracking')}
          buttonWidth={Dimensions.get('window').width * 0.8}
          buttonHeight={50}
          fontSize={15}
          borderColor="#FF7E5F"
          textColor="#FF7E5F"
        />

        <Text style={styles.deliveryStatus}>{order.status_display}</Text>
        <Text style={styles.deliveryMessage}>
          {order.status.toLowerCase() === 'delivered'
            ? 'The recipient has happily received your gift.'
            : 'Your order is on its way.'}
        </Text>

        {/* Steps Section */}
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

        <ButtonPrimary
          buttonText="Need Help ?"
          onPress={() => navigation.navigate('HelpScreen')}
          buttonWidth={Dimensions.get('window').width * 0.8}
          buttonHeight={50}
          fontSize={15}
          gradientColors={['#DE8542', '#FE5993']}
        />
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
          <Text style={styles.deliveryDate}>
            {order.expected_delivery ? order.expected_delivery : 'TBD'}
          </Text>
        </View>
      </View>

      {/* Product Section */}
      <View style={styles.productContainer}>
        {orderItems ? (
          orderItems.map((item, index) => (
            <View key={index} style={styles.productDetails}>
              <Image
                source={{ uri: item.product_details.image_url || item.product_details.image }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.product_details.title}</Text>
                <Text style={styles.productQty}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.productPrice}>AED {item.total_price}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noItemsText}>No items in this order.</Text>
        )}
      </View>

      {/* Payment Details Section */}
      <View style={styles.paymentContainer}>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Subtotal</Text>
          <Text style={styles.paymentValue}>AED {order.total_amount}</Text>
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
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
  },
  copyIcon: {
    width: 75,
    height: 75,
    marginTop: 4,
    resizeMode: 'contain',
  },
  orderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButton: {
    marginLeft: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    color: '#000',
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
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
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  deliveryIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  deliveryTextWrapper: {
    flex: 1,
  },
  deliveryLabel: {
    fontSize: 14,
    color: '#7E7E7E',
    marginBottom: 4,
    fontFamily: 'DMSans-Regular',
  },
  deliveryDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'DMSans-Regular',
  },
  orderContainer: {
    margin: 16,
    backgroundColor: Colors.secondary,
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
    resizeMode: 'contain',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'DMSans-Regular',
  },
  deliveryStatus: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
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
    fontFamily: 'DMSans-Regular',
  },
  productContainer: {
    backgroundColor: Colors.secondary,
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
    color: '#000',
    fontFamily: 'DMSans-SemiBold',
  },
  productQty: {
    fontSize: 14,
    color: '#7E7E7E',
    marginTop: 4,
    fontFamily: 'DMSans-Regular',
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: '#000',
  },
  noItemsText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#7E7E7E',
    fontFamily: 'DMSans-Regular',
  },
  paymentContainer: {
    backgroundColor: Colors.secondary,
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
    fontFamily: 'DMSans-Regular',
  },
  paymentValue: {
    fontSize: 14,
    fontFamily: 'DMSans-SemiBold',
    color: '#000',
  },
  paymentNote: {
    fontSize: 12,
    color: '#7E7E7E',
    marginTop: 8,
    marginBottom: 16,
    fontFamily: 'DMSans-Regular',
  },
});

export default OrderDetails;
