import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import HeaderInner from '../../screens/components/Headerinner';
import ButtonPrimary from '../components/ButtonPrimary';
import DatePicker from 'react-native-date-picker';
import Colors from '../components/Colors';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../redux/slices/createorderSlice';

const CheckoutPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.createOrder);

  // UI State
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [selectedDateOption, setSelectedDateOption] = useState('today');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11 am - 1 pm');

  // Example order payload – update with your dynamic values as needed.
  const orderPayload = {
    user: 11, // Example user ID
    total_amount: "550.00",
    shipping_address: "", // Populate if available
    phone: "",
    email: "",
    notes: deliveryNote,
    items: [
      { product: 5, quantity: 1, price: "200.00" },
      { product: 3, quantity: 1, price: "250.00" },
      { product: 2, quantity: 1, price: "100.00" },
    ],
  };

  const paymentMethods = [
    { id: 'applepay', name: 'Apple Pay', icon: require('../../assets/images/applepay.png') },
    { id: 'tamara', name: 'Tamara', icon: require('../../assets/images/tamara.png') },
    { id: 'tabby', name: 'Tabby', icon: require('../../assets/images/tabby.png') },
    { id: 'creditcard', name: 'Credit Card', icon: require('../../assets/images/creditcard.png') },
    { id: 'paypal', name: 'PayPal', icon: require('../../assets/images/paypal.png') },
  ];

  const handlePayNow = async () => {
    try {
      // Dispatch the createOrder action and wait for it to complete
      // Navigate to OrderDetailpage and pass the created order details
      navigation.navigate('OrderSuccessPage');
    } catch (err) {
      console.error('Order creation failed:', err);
      // Optionally, show an error message to the user
    }
  };

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
        onCartPress={() => navigation.navigate('CartPage')}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Delivery Type Section */}
        <View style={styles.deliveryTypeContainer}>
          <Text style={styles.sectionTitle}>Select Pickup Method</Text>
          <View style={styles.deliveryTypeOptions}>
            <TouchableOpacity
              style={[styles.deliveryTypeBox, deliveryType === 'delivery' && styles.deliveryTypeSelected]}
              onPress={() => setDeliveryType('delivery')}
            >
              <Image source={require('../../assets/images/delivery.png')} style={styles.deliveryIcon} />
              <Text style={deliveryType === 'delivery' ? styles.deliveryTypeTextSelected : styles.deliveryTypeText}>
                Delivery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.deliveryTypeBox, deliveryType === 'pickup' && styles.deliveryTypeSelected]}
              onPress={() => setDeliveryType('pickup')}
            >
              <Image source={require('../../assets/images/store.png')} style={styles.deliveryIcon} />
              <Text style={deliveryType === 'pickup' ? styles.deliveryTypeTextSelected : styles.deliveryTypeText}>
                Pickup from Store
              </Text>
            </TouchableOpacity>
          </View>

          {/* ETA or Delivery Time */}
          {deliveryType === 'pickup' ? (
            <View style={styles.etaContainer}>
              <TouchableOpacity style={styles.etaBox}>
                <Text style={styles.etaText}>10 Min <Text style={styles.etaLabel}>ETA</Text></Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.etaBox}>
                <Text style={styles.etaText}>30 Min <Text style={styles.etaLabel}>ETA</Text></Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.etaBox}>
                <Text style={styles.etaText}>45 Min <Text style={styles.etaLabel}>ETA</Text></Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.deliveryTimeContainer}>
              <Text style={styles.sectionTitle}>Delivery Time</Text>
              <TouchableOpacity onPress={() => setShowBottomSheet(true)}>
                <Text style={styles.dateTimeText}>
                  {selectedDate.toLocaleDateString()} {selectedDateOption && selectedTimeSlot ? `(${selectedTimeSlot})` : ''}
                </Text>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* DatePicker Modal */}
        <DatePicker
          modal
          open={showPicker}
          date={selectedDate}
          mode="date"
          onConfirm={(date) => {
            setShowPicker(false);
            setSelectedDate(date);
            setSelectedDateOption('pick');
          }}
          onCancel={() => {
            setShowPicker(false);
          }}
        />

        {/* Delivery Address Section */}
        <View style={styles.deliveryAddressRow}>
          <Text style={styles.sectionTitleLeft}>
            {deliveryType === 'delivery' ? 'Delivery Address' : 'Pickup from Store'}
          </Text>
          {deliveryType === 'delivery' && (
            <TouchableOpacity style={styles.addButton}>
              <Image source={require('../../assets/images/plus.png')} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>

        {deliveryType === 'delivery' ? (
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
        ) : (
          <View style={styles.sectionContainer}>
            <Text style={styles.pickupText}>You have selected to pick up your order from the store.</Text>
          </View>
        )}

        {/* Add Note Section */}
        <View style={styles.noteContainer}>
          <Text style={styles.sectionTitleLeft}>Add Note</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Any delivery instructions or special notes?"
            placeholderTextColor={Colors.placeholder}
            multiline
            value={deliveryNote}
            onChangeText={setDeliveryNote}
          />
        </View>

        {/* Promo Code Section */}
        <View style={styles.PromoContainer}>
          <View style={styles.promoSection}>
            <TextInput
              placeholder="Promo Code"
              value={promoCode}
              onChangeText={setPromoCode}
              style={styles.promoInput}
              placeholderTextColor="#000"
            />
          </View>
        </View>

        {/* Payment Method Section */}
        <Text style={styles.sectionTitleLeft}>Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[styles.paymentOption, selectedPaymentMethod === method.id && styles.paymentOptionSelected]}
            onPress={() => setSelectedPaymentMethod(method.id)}
          >
            <Image source={method.icon} style={styles.paymentIcon} />
            <Text style={styles.paymentText}>{method.name}</Text>
            <View style={styles.radioButton}>
              {selectedPaymentMethod === method.id && <View style={styles.radioInnerCircle} />}
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
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <ButtonPrimary
            buttonText="Pay Now"
            onPress={handlePayNow}
            buttonWidth={Dimensions.get('window').width * 0.9}
            buttonHeight={50}
            fontSize={20}
            gradientColors={['#DE8542', '#FE5993']}
          />
        )}
        {error && <Text style={{ color: 'red', textAlign: 'center' }}>Error: {JSON.stringify(error)}</Text>}
      </View>

      {/* Bottom Sheet Modal for Delivery Date & Time Slot */}
      <Modal
        isVisible={showBottomSheet}
        onBackdropPress={() => setShowBottomSheet(false)}
        style={styles.bottomModal}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.bottomSheetTitle}>Select Delivery Date</Text>
          <View style={styles.dateOptionsContainer}>
            <TouchableOpacity
              onPress={() => {
                setSelectedDate(new Date());
                setSelectedDateOption('today');
              }}
              style={[styles.dateOption, selectedDateOption === 'today' && styles.selectedOption]}
            >
              <Text style={styles.optionText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setSelectedDate(tomorrow);
                setSelectedDateOption('tomorrow');
              }}
              style={[styles.dateOption, selectedDateOption === 'tomorrow' && styles.selectedOption]}
            >
              <Text style={styles.optionText}>Tomorrow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowPicker(true);
                setSelectedDateOption('pick');
              }}
              style={[styles.dateOption, selectedDateOption === 'pick' && styles.selectedOption]}
            >
              <Text style={styles.optionText}>Pick Date</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.bottomSheetTitle}>Select Time Slot</Text>
          <View style={styles.timeSlotsContainer}>
            <TouchableOpacity
              onPress={() => setSelectedTimeSlot('11 am - 1 pm')}
              style={[styles.timeSlot, selectedTimeSlot === '11 am - 1 pm' && styles.selectedTimeSlot]}
            >
              <Text style={styles.optionText}>11 am - 1 pm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTimeSlot('1 pm - 3 pm')}
              style={[styles.timeSlot, selectedTimeSlot === '1 pm - 3 pm' && styles.selectedTimeSlot]}
            >
              <Text style={styles.optionText}>1 pm - 3 pm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTimeSlot('3 pm - 5 pm')}
              style={[styles.timeSlot, selectedTimeSlot === '3 pm - 5 pm' && styles.selectedTimeSlot]}
            >
              <Text style={styles.optionText}>3 pm - 5 pm</Text>
            </TouchableOpacity>
          </View>

          <ButtonPrimary
            buttonText="Confirm"
            onPress={() => setShowBottomSheet(false)}
            buttonWidth={Dimensions.get('window').width * 0.8}
            buttonHeight={50}
            fontSize={18}
            gradientColors={['#DE8542', '#FE5993']}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContainer: { padding: 16, paddingBottom: 230 },
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
  deliveryTimeContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
  deliveryTypeContainer: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  deliveryTypeOptions: { flexDirection: 'row', justifyContent: 'space-between' },
  deliveryTypeBox: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  deliveryTypeSelected: { borderColor: '#FF7E5F', backgroundColor: '#FFF5F0' },
  deliveryTypeText: { fontSize: 12, color: '#666' },
  deliveryTypeTextSelected: { fontSize: 12, color: '#FF7E5F' },
  deliveryIcon: { width: 24, height: 24, marginBottom: 4, resizeMode: 'contain' },
  etaContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  etaBox: { backgroundColor: Colors.background, padding: 12, borderRadius: 8, flex: 1, marginHorizontal: 4, alignItems: 'center' },
  etaText: { fontSize: 14, fontFamily: 'DMSans-Bold' },
  etaLabel: { color: '#FF7E5F' },
  sectionTitle: { fontSize: 16, fontFamily: 'DMSans-Bold', marginBottom: 8 },
  sectionTitleLeft: { fontSize: 16, fontFamily: 'DMSans-Bold', textAlign: 'left' },
  promoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
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
  pickupText: { fontSize: 14, fontFamily: 'DMSans-Regular', color: '#666', textAlign: 'center' },
  noteContainer: {
    marginBottom: 16,
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  PromoContainer: {
    marginBottom: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  noteInput: {
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.secondary,
    fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 60,
  },
  divider: { height: 1, backgroundColor: '#D2AE8FFF', marginVertical: 8 },
  iconImage: { width: 24, height: 24, borderRadius: 10 },
  content: { padding: 16 },
  deliveryAddressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  dateTimeText: { fontSize: 14, fontWeight: 'bold' },
  changeText: { color: Colors.primary, fontSize: 14, textAlign: 'right' },
  addButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  editButtonTopRight: { position: 'absolute', top: 16, right: 16 },
  addressContainer: { paddingBottom: 16 },
  addressLabel: { fontSize: 14, fontFamily: 'DMSans-Regular', color: '#999', marginBottom: 4 },
  addressName: { fontSize: 16, fontFamily: 'DMSans-Bold' },
  iconRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  icon: { width: 20, height: 20, marginRight: 8 },
  addressDetails: { fontSize: 14, color: '#666', fontFamily: 'DMSans-Regular' },
  addressCity: { fontSize: 14, color: '#999', fontFamily: 'DMSans-Regular' },
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
  paymentOptionSelected: { borderColor: '#FF7E5F', backgroundColor: '#FFF' },
  paymentIcon: { width: 40, height: 40, marginRight: 12, resizeMode: 'contain' },
  paymentText: { fontSize: 16, flex: 1, fontFamily: 'DMSans-Regular' },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInnerCircle: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#FF7E5F' },
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
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryText: { fontSize: 14, color: '#555', fontFamily: 'DMSans-Regular' },
  totalText: { fontSize: 16, color: '#000', fontFamily: 'DMSans-Bold' },
  bottomModal: { justifyContent: 'flex-end', margin: 0 },
  bottomSheet: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetTitle: { fontSize: 18, fontFamily: 'DMSans-Bold', marginBottom: 10 },
  dateOptionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  dateOption: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  selectedOption: { borderColor: '#FF7E5F', backgroundColor: '#FFF5F0' },
  optionText: { fontSize: 16, fontFamily: 'DMSans-Regular' },
  timeSlotsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  timeSlot: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  selectedTimeSlot: { borderColor: '#FF7E5F', backgroundColor: '#FFF5F0' },
});

export default CheckoutPage;
