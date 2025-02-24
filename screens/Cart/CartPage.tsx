import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, increaseQuantity, decreaseQuantity } from '../redux/slices/showCartSlice'; // Import from the new slice
import HeaderInner from '../../screens/components/Headerinner';
import ButtonPrimary from '../../screens/components/ButtonPrimary';
import Colors from '../components/Colors';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.showCart.items); // Update to use 'showCart'
  const loading = useSelector(state => state.showCart.loading); // Update to use 'showCart'

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.total_price, 0);
    const deliveryFee = 5.0; // Update this as needed
    return { subtotal, deliveryFee, total: subtotal + deliveryFee };
  };

  const { subtotal, deliveryFee, total } = calculateTotal();

  if (loading) {
    return <Text>Loading...</Text>; // You can replace with a spinner or placeholder
  }

  return (
    <View style={styles.container}>
      <HeaderInner
        title="Cart"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={false}
        onBackPress={() => { /* Handle back */ }}
      />
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }}>
        {cartItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.cartItem}
            onPress={() => { /* Handle product navigation */ }}>
            <Image source={{ uri: item.product_detail.image }} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.itemName}>{item.product_detail.title}</Text>
              <Text style={styles.itemPrice}>${item.product_detail.price}</Text>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity onPress={() => handleDecrease(item.id)} style={styles.quantityButton}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleIncrease(item.id)} style={styles.quantityButton}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.floatingContainer}>
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

        <ButtonPrimary
          buttonText="Continue"
          onPress={() => { /* Handle checkout navigation */ }}
          buttonWidth={Dimensions.get('window').width * 0.9}
          buttonHeight={50}
          fontSize={20}
          gradientColors={['#DE8542', '#FE5993']}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  content: { flex: 1 },
  floatingContainer: {
    backgroundColor: Colors.background,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 0,
    marginBottom: 10,
    borderRadius: 10, // Increase space if needed
  },

  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    marginBottom: 16,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  cartItemImage: { width: 60, height: 60, borderRadius: 10 },
  cartItemDetails: { flex: 1, marginLeft: 10 },
  itemName: { fontSize: 16, fontFamily: 'DMSans-Bold' },
  itemPrice: { fontSize: 14, color: '#777', fontFamily: 'DMSans-SemiBold' },
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: { fontSize: 16, color: '#000', fontFamily: 'DMSans-Bold', },
  quantity: { fontSize: 16, marginHorizontal: 10 },
  promoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 16,
  },
  promoInput: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  summarySection: {
    backgroundColor: '#F6CFAC',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: { fontSize: 14, color: '#555', fontFamily: 'DMSans-Regular' },
  summaryValue: { fontSize: 14, color: '#555', fontFamily: 'DMSans-SemiBold', },
  summaryValueBold: { fontSize: 16, fontFamily: 'DMSans-Bold', color: '#000' },
  divider: { height: 1, backgroundColor: '#D2AE8FFF', marginVertical: 8 },

  continueButtonText: { fontSize: 16, fontFamily: 'DMSans-Bold', color: '#FFF' },

});

export default CartPage;
