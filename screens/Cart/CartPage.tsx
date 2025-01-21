import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const CartPage = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([
    {id: 1, name: 'Tulips', price: 40, quantity: 1, image: require('../../assets/images/flower.png')},
    {id: 2, name: 'Yellow Roses', price: 350, quantity: 1, image: require('../../assets/images/in1.png')},
    {id: 3, name: 'Lavender', price: 55, quantity: 1, image: require('../../assets/images/in2.png')},
    {id: 4, name: 'White Orchid', price: 40, quantity: 1, image: require('../../assets/images/in3.png')},
    {id: 5, name: 'White drchid', price: 40, quantity: 1, image: require('../../assets/images/in4.png')},
  ]);
  const [promoCode, setPromoCode] = useState('');

  const handleIncrease = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item));
  };

  const handleDecrease = (id) => {
    setCartItems(cartItems.map(item => item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item));
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = 5.0;
    return {subtotal, deliveryFee, total: subtotal + deliveryFee};
  };

  const {subtotal, deliveryFee, total} = calculateTotal();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F9F9F9" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
         <TouchableOpacity style={styles.iconButton2}>
                  <Svg width="24" height="24" viewBox="0 0 24 24">
                    <Path
                      d="M15 19l-7-7 7-7"
                      stroke="#000"
                      strokeWidth="2"
                      fill="none"
                    />
                  </Svg>
                </TouchableOpacity>
        <Text style={styles.headerText}>Cart</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/notification.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}
        contentContainerStyle={{ paddingBottom: 50 }} // Add extra padding at the bottom
>
        {/* Cart Items */}
        {cartItems.map(item => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.cartItem} 
            onPress={() => navigation.navigate('ProductOverview')}>
            <Image source={item.image} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
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

        {/* Promo Code Section */}
        <View style={styles.promoSection}>
          <TextInput
            placeholder="Promo Code"
            value={promoCode}
            onChangeText={setPromoCode}
            style={styles.promoInput}
            placeholderTextColor="#000"
          />
          <TouchableOpacity style={styles.applyButton}>
            <LinearGradient colors={['#FF7E5F', '#FD3A84']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.applyGradient}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

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
            {/* Divider */}
  <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Amount:</Text>
            <Text style={styles.summaryValueBold}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Footer Button */}
        <TouchableOpacity>
    <LinearGradient
      colors={['#FF7E5F', '#FD3A84']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.continueButton}
    >
      <Text style={styles.continueButtonText}>Continue</Text>
    </LinearGradient>
  </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F9F9F9'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  divider: {
    height: 1,
    backgroundColor: '#D2AE8FFF',
    marginVertical: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {fontSize: 18, color: '#000'},
  headerText: {fontSize: 18, fontWeight: 'bold', color: '#000'},
  headerIcons: {flexDirection: 'row'},
  iconImage: {width: 24, height: 24, marginLeft: 16},
  content: {padding: 16},
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 16,
    borderRadius: 10,
    padding: 10,
  },
  cartItemImage: {width: 60, height: 60, borderRadius: 10},
  cartItemDetails: {flex: 1, marginLeft: 10},
  itemName: {fontSize: 16, fontWeight: 'bold'},
  itemPrice: {fontSize: 14, color: '#777'},
  quantityControls: {flexDirection: 'row', alignItems: 'center'},
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE0C4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 8,
  },
  quantityText: {fontSize: 16, color: '#000'},
  quantity: {fontSize: 16, marginHorizontal: 10},
  promoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 16,
  },
  promoInput: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  applyButton: {
    marginLeft: 10,
  },
  applyGradient: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  summarySection: {
    backgroundColor: '#F6CFAC',
    borderRadius: 20,
    padding: 16,
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    color: '#555',
  },
  summaryValueBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  continueButton: {
    width: '100%', // Make it span the full width
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default CartPage;
