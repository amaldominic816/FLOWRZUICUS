// screens/BookingDetailsScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingDetails } from '../redux/slices/bookingDetailsSlice';
import Loader from '../components/Loader';
import HeaderInner from '../../screens/components/Headerinner';
import Colors from '../components/Colors';

const BookingDetailsScreen = ({ navigation, route }) => {
  const { bookingId } = route.params;
  const dispatch = useDispatch();

  const { bookingDetails, status, error } = useSelector(
    (state) => state.bookingDetails
  );

  useEffect(() => {
    dispatch(fetchBookingDetails(bookingId));
  }, [dispatch, bookingId]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error fetching booking details: {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderInner
        title="Booking Details"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{bookingDetails.product_name}</Text>
        <Text style={styles.detail}>Booking ID: {bookingDetails.id}</Text>
        <Text style={styles.detail}>
          Customer Email: {bookingDetails.customer_email}
        </Text>
        <Text style={styles.detail}>Vendor: {bookingDetails.vendor_name}</Text>
        <Text style={styles.detail}>
          Start Date: {bookingDetails.start_date}
        </Text>
        <Text style={styles.detail}>End Date: {bookingDetails.end_date}</Text>
        <Text style={styles.detail}>
          Quantity: {bookingDetails.quantity}
        </Text>
        <Text style={styles.detail}>
          Total Amount: {bookingDetails.total_amount}
        </Text>
        <Text style={styles.detail}>Status: {bookingDetails.status}</Text>
        <Text style={styles.detail}>
          Booking Date:{' '}
          {new Date(bookingDetails.booking_date).toLocaleString()}
        </Text>
        <Text style={styles.detail}>Notes: {bookingDetails.notes}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'DMSans-Bold',
    marginBottom: 15,
    color: '#333',
  },
  detail: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    marginBottom: 10,
    color: '#555',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default BookingDetailsScreen;
