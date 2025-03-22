import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../redux/slices/bookingSlice'; // Import the createBooking action
import Colors from '../components/Colors';
import ButtonPrimary from '../components/ButtonPrimary';
import HeaderInner from '../components/Headerinner';
import DatePicker from 'react-native-date-picker'; // Use react-native-date-picker

const screenWidth = Dimensions.get('window').width;

const EventsProductOverview = ({ navigation, route }) => {
  const { id, name, price, image, description, quantityAvailable } = route.params;

  const dispatch = useDispatch();
  const { status, error, bookingResponse } = useSelector((state) => state.booking);
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isModalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleIncreaseLocal = () => {
    if (quantity < quantityAvailable) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseLocal = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleCreateBooking = () => {
    if (quantity <= quantityAvailable) {
      setModalVisible(true); // Set modal visibility to true
    } else {
      alert('Maximum Quantity Reached');
    }
  };

  const handleConfirmBooking = () => {
    // Dispatch the createBooking action with the necessary data
    dispatch(createBooking({
      event_product: id,
      quantity,
      start_date: startDate.toISOString().split('T')[0], // Convert date to YYYY-MM-DD format
      end_date: endDate.toISOString().split('T')[0],     // Convert date to YYYY-MM-DD format
      notes,
    }));
  
    // After a successful booking, navigate to EventSuccessPage
    if (status === 'succeeded') {
      console.log('Booking successful, navigating to EventSuccessPage');
      navigation.navigate('EventSuccessPage', {
        bookingId: bookingResponse.id, // Pass booking ID or any other data you need
        productName: name,
      });
    }
  
    setModalVisible(false); // Close the modal after booking is confirmed
  };
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />

      {/* Header */}
      <HeaderInner
        title="Product Overview"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
      />

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Product Image */}
        <Image source={{ uri: image }} style={styles.productImage} />

        {/* Product Details */}
        <View style={styles.detailsBox}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsTextContainer}>
              <Text style={styles.productName}>{name}</Text>
              <Text style={styles.price}>AED {Number(price).toFixed(2)} (Per/Day)</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleDecreaseLocal} style={styles.quantityButton}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={handleIncreaseLocal} style={styles.quantityButton}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionBox}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        {/* Tabs Section */}
        <View style={styles.tabContentBox}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'description' && styles.activeTabButton]}
              onPress={() => setActiveTab('description')}
            >
              <Text style={[styles.tabText, activeTab === 'description' && styles.activeTabText]}>
                Description
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'careTips' && styles.activeTabButton]}
              onPress={() => setActiveTab('careTips')}
            >
              <Text style={[styles.tabText, activeTab === 'careTips' && styles.activeTabText]}>
                Care Tips
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'description' && (
            <Text style={styles.description}>
              {description}
            </Text>
          )}
          {activeTab === 'careTips' && (
            <Text style={styles.description}>
              ✂️ Trim Stems: Cut stems at a 45° angle for better water absorption...
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footerButtons}>
        <ButtonPrimary
          buttonText="Create Booking"
          onPress={handleCreateBooking}
          buttonWidth={Dimensions.get('window').width * 0.7}
          buttonHeight={50}
          fontSize={20}
          gradientColors={['#DE8542', '#FE5993']}
        />
      </View>

      {/* Modal for Date Selection and Notes */}
      <Modal
        visible={isModalVisible} // Modal visibility controlled by `isModalVisible`
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Dates</Text>

            {/* Start Date Picker */}
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
              <TextInput
                style={styles.dateInput}
                placeholder="Start Date"
                value={startDate.toLocaleDateString()}
                editable={false}
              />
            </TouchableOpacity>

            {/* End Date Picker */}
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
              <TextInput
                style={styles.dateInput}
                placeholder="End Date"
                value={endDate.toLocaleDateString()}
                editable={false}
              />
            </TouchableOpacity>

            {/* Notes Section */}
            <TextInput
              style={styles.notesInput}
              placeholder="Add Notes"
              value={notes}
              onChangeText={setNotes}
              multiline
            />

            {/* Confirm Booking Button */}
            <ButtonPrimary
              buttonText="Confirm Booking"
              onPress={handleConfirmBooking}
              buttonWidth={screenWidth * 0.7}
              buttonHeight={50}
              fontSize={20}
              gradientColors={['#DE8542', '#FE5993']}
            />
          </View>
        </View>
      </Modal>

      {/* Date Picker for Start Date */}
      {showStartDatePicker && (
        <DatePicker
          modal
          open={showStartDatePicker}
          date={startDate}
          onConfirm={(date) => {
            setStartDate(date);
            setShowStartDatePicker(false);
          }}
          onCancel={() => setShowStartDatePicker(false)}
        />
      )}

      {/* Date Picker for End Date */}
      {showEndDatePicker && (
        <DatePicker
          modal
          open={showEndDatePicker}
          date={endDate}
          onConfirm={(date) => {
            setEndDate(date);
            setShowEndDatePicker(false);
          }}
          onCancel={() => setShowEndDatePicker(false)}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  productImage: {
    width: '80%',
    height: undefined,
    aspectRatio: 1.2,
    borderRadius: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  detailsBox: { backgroundColor: Colors.secondary, borderRadius: 20, padding: 16, marginTop: 16 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailsTextContainer: { flex: 1 },
  productName: { fontSize: 20, fontFamily: 'DMSans-Bold' },
  price: { fontSize: 18, color: '#000', marginTop: 4, fontFamily: 'DMSans-Regular' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { paddingVertical: 6, paddingHorizontal: 16, backgroundColor: '#ddd', borderRadius: 5, marginHorizontal: 8 },
  quantityText: { fontSize: 18, fontFamily: 'DMSans-Regular' },
  quantity: { fontSize: 18, fontFamily: 'DMSans-Regular' },
  descriptionBox: { marginTop: 24 },
  sectionTitle: { fontSize: 18, fontFamily: 'DMSans-Bold', marginBottom: 8 },
  description: { fontSize: 12, color: '#555', fontFamily: 'DMSans-Regular' },
  footerButtons: { flexDirection: 'row', alignItems: 'center', margin: 16 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 18, fontFamily: 'DMSans-Bold', marginBottom: 10 },
  dateInput: { height: 40, borderColor: '#ddd', borderWidth: 1, marginBottom: 10, paddingLeft: 10 },
  notesInput: { height: 80, borderColor: '#ddd', borderWidth: 1, paddingLeft: 10, marginBottom: 20 },
});

export default EventsProductOverview;
