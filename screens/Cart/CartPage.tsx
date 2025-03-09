import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, increaseQuantity, decreaseQuantity, removeItem } from '../redux/slices/cartSlice';
import HeaderInner from '../../screens/components/Headerinner';
import ButtonPrimary from '../../screens/components/ButtonPrimary';
import Colors from '../components/Colors';
import Loader from '../components/Loader';

const CartPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const items = cart && cart.items ? cart.items : [];

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

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
    const subtotal = items.reduce((acc, item) => {
      const price = parseFloat(item.product_detail?.price);
      return acc + (price > 0 ? price * (item.quantity || 0) : 0);
    }, 0);
    const deliveryFee = 5.0; // Static fee
    return { subtotal, deliveryFee, total: subtotal + deliveryFee };
  };

  const { subtotal, deliveryFee, total } = calculateTotal();

  // Only show a full-page loader if the cart hasn't been fetched yet.
  if (!cart && loading) {
    return <Loader/>;
  }
  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <HeaderInner
        title="Cart"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={false}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }}>
        {items.length === 0 ? (
          <Text>No items in your cart.</Text>
        ) : (
          items.map((item) => {
            const quantity = item.quantity || 0;
            return (
              <View key={item.id} style={styles.cartItem}>
                {/* Remove Button */}
                <Image source={{ uri: item.product_detail.image }} style={styles.cartItemImage} />
                <View style={styles.cartItemDetails}>
                  <Text style={styles.itemName}>{item.product_detail.title}</Text>
                  <Text style={styles.itemPrice}>${parseFloat(item.product_detail.price).toFixed(2)}</Text>
                </View>
                <View style={styles.quantityControls}>
                  {quantity > 1 ? (
                    <TouchableOpacity onPress={() => handleDecrease(item.id)} style={styles.quantityButton}>
                      <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => handleRemove(cart.id, item.id)} style={styles.quantityButton}>
                      <Image source={require('../../assets/images/delete.png')} style={styles.deleteIcon} />
                    </TouchableOpacity>
                  )}
                  <Text style={styles.quantity}>{quantity}</Text>
                  <TouchableOpacity onPress={() => handleIncrease(item.id)} style={styles.quantityButton}>
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
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
          onPress={() => navigation.navigate('CheckoutPage')}
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
    borderRadius: 10,
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
  removeButton: {
    marginRight: 10,
  },
  removeButtonText: {
    fontSize: 16,
    color: 'red',
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
  quantityText: { fontSize: 16, color: '#000', fontFamily: 'DMSans-Bold' },
  quantity: { fontSize: 16, marginHorizontal: 10 },
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
  summaryValue: { fontSize: 14, color: '#555', fontFamily: 'DMSans-SemiBold' },
  summaryValueBold: { fontSize: 16, fontFamily: 'DMSans-Bold', color: '#000' },
  divider: { height: 1, backgroundColor: '#D2AE8FFF', marginVertical: 8 },
  deleteIcon: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
});

export default CartPage;
