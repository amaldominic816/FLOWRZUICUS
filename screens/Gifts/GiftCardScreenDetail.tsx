// screens/GiftCardScreenDetail.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import ButtonPrimary from '../components/ButtonPrimary';
import HeaderInner from '../components/Headerinner';
import Colors from '../components/Colors';
import OutlinedButton from '../components/OutlinedButton';
import SuggestedMessagesBottomSheet from '../components/SuggestedMessagesBottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { sendGiftCard, resetGiftCardState } from '../redux/slices/sendGiftCardSlice';
import { fetchCart, increaseQuantity, decreaseQuantity, removeItem } from '../redux/slices/cartSlice';

const GiftCardScreenDetail = ({ navigation }) => {
  const dispatch = useDispatch();
  
  // Two tabs: "Send Gift Item" and "Add a Message"
  const [activeTab, setActiveTab] = useState('sendGiftItem');
  
  // For the Send Gift Item tab, we add two text fields above the cart list.
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  // We use a default recipient name (as the API requires it) and the cart total will serve as the amount.
  const defaultRecipientName = "Friend";
  const expiryDate = "2030-12-12";

  const { status, error, successMessage } = useSelector(state => state.giftCard);
  const { cart, loading, error: cartError } = useSelector((state) => state.cart);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());  // Fetch cart items when the page loads
    if (status === 'succeeded' && successMessage) {
      Alert.alert('Success', successMessage, [
        { text: 'OK', onPress: () => {
          dispatch(resetGiftCardState());
          navigation.goBack();
        }}
      ]);
    }
    if (status === 'failed' && error) {
      Alert.alert('Error', error);
    }
  }, [status, error, successMessage, dispatch, navigation]);

  // Cart page functionalities
  const handleIncrease = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecrease = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleRemove = (cartId, itemId) => {
    dispatch(removeItem({ cartId, itemId }));
  };

  const calculateTotal = () => {
    const subtotal = cart && cart.items
      ? cart.items.reduce((acc, item) => {
          const price = parseFloat(item.product_detail?.price);
          return acc + (price > 0 ? price * (item.quantity || 0) : 0);
        }, 0)
      : 0;
    const deliveryFee = 5.0; // static fee as in CartPage
    return { subtotal, deliveryFee, total: subtotal + deliveryFee };
  };

  const { subtotal, deliveryFee, total } = calculateTotal();

  const handleSendGift = () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      Alert.alert('Validation Error', 'Your cart is empty');
      return;
    }
    if (!recipientEmail || !message) {
      Alert.alert('Validation Error', 'Please fill in Recipient Email and Message');
      return;
    }
    dispatch(sendGiftCard({
      amount: total,
      recipient_email: recipientEmail,
      recipient_name: defaultRecipientName,
      message: message,
      expiry_date: expiryDate,
    }));
  };

  const handleSuggestedMessageSelect = (suggestedMessage) => {
    setMessage(prev => prev + ' ' + suggestedMessage);
    setIsBottomSheetVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <HeaderInner
        title="Gift Message"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Tab bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'sendGiftItem' && styles.activeTabButton]}
            onPress={() => setActiveTab('sendGiftItem')}
          >
            <Text style={[styles.tabText, activeTab === 'sendGiftItem' && styles.activeTabText]}>
              Send Gift Item
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'addMessage' && styles.activeTabButton]}
            onPress={() => setActiveTab('addMessage')}
          >
            <Text style={[styles.tabText, activeTab === 'addMessage' && styles.activeTabText]}>
              Add a Message
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'sendGiftItem' ? (
          <View style={styles.sendGiftContainer}>
            {/* Fields above the cart list */}
            <TextInput
              style={[styles.input, { height: 40 }]}
              placeholder="Recipient Email"
              placeholderTextColor={Colors.placeholder}
              value={recipientEmail}
              onChangeText={setRecipientEmail}
            />
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
              placeholder="Message"
              placeholderTextColor={Colors.placeholder}
              multiline
              numberOfLines={3}
              value={message}
              onChangeText={setMessage}
            />
            {/* Cart Items List (same design & functionalities as Cart Page) */}
            {loading ? (
              <Text>Loading cart items...</Text>
            ) : cart && cart.items && cart.items.length > 0 ? (
              cart.items.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={{ uri: item.product_detail.image }} style={styles.cartItemImage} />
                  <View style={styles.cartItemDetails}>
                    <Text style={styles.itemName}>{item.product_detail.title}</Text>
                    <Text style={styles.itemPrice}>
                      ${parseFloat(item.product_detail.price).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.quantityControls}>
                    {item.quantity > 1 ? (
                      <TouchableOpacity onPress={() => handleDecrease(item.id)} style={styles.quantityButton}>
                        <Text style={styles.quantityText}>-</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => handleRemove(cart.id, item.id)} style={styles.quantityButton}>
                        <Image source={require('../../assets/images/delete.png')} style={styles.deleteIcon} />
                      </TouchableOpacity>
                    )}
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleIncrease(item.id)} style={styles.quantityButton}>
                      <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text>No items in your cart.</Text>
            )}
            {/* Summary Section */}
            <View style={styles.summarySection}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal:</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee:</Text>
                <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Amount:</Text>
                <Text style={styles.summaryValueBold}>${total.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.content}>
            {/* Add a Message tab – separate and unrelated */}
            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Type your message..."
              placeholderTextColor="#888"
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
            />
            <View style={styles.suggestionsContainer}>
              <OutlinedButton
                title="Ask AI"
                icon={require('../../assets/images/ai.png')}
                onPress={() => navigation.navigate('')}
                style={styles.customButton}
              />
              <ButtonPrimary
                buttonText="Suggested Messages"
                onPress={() => setIsBottomSheetVisible(true)}
                buttonWidth={Dimensions.get('window').width * 0.4}
                buttonHeight={40}
                fontSize={12}
                gradientColors={['#DE8542', '#FE5993']}
              />
            </View>
          </View>
        )}
      </ScrollView>
      <SuggestedMessagesBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        onSelectMessage={handleSuggestedMessageSelect}
      />
      <View style={styles.bottomContainer}>
        <ButtonPrimary
          buttonText="Send Gift"
          onPress={handleSendGift}
          buttonWidth={Dimensions.get('window').width * 0.9}
          buttonHeight={40}
          fontSize={12}
          gradientColors={['#DE8542', '#FE5993']}
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
  customButton: {
    marginTop: 0,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: {
    color: '#777',
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderColor: '#FF6F61',
  },
  activeTabText: {
    color: '#FF6F61',
    fontFamily: 'DMSans-Bold',
  },
  sendGiftContainer: {
    paddingHorizontal: 16,
  },
  content: {
    paddingHorizontal: 16,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
    color: '#000',
    fontFamily: 'DMSans-Regular',
  },
  messageInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bottomContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  // Cart item styles (from CartPage design)
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    marginBottom: 16,
    borderRadius: 10,
    padding: 10,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'DMSans-SemiBold',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'DMSans-Bold',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  deleteIcon: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  summarySection: {
    backgroundColor: '#F6CFAC',
    borderRadius: 10,
    padding: 16,
    marginVertical: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'DMSans-Regular',
  },
  summaryValue: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'DMSans-SemiBold',
  },
  summaryValueBold: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#D2AE8FFF',
    marginVertical: 8,
  },
});

export default GiftCardScreenDetail;
