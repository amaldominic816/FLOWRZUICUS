import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import HeaderInner from '../../screens/components/Headerinner';
import Colors from '../components/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/slices/ordersSlice';
import { fetchBookings } from '../redux/slices/bookingsSlice';
import Loader from '../components/Loader';

const MyOrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('Orders');

  // Orders slice data
  const { orders, status, error } = useSelector((state) => state.orders);

  // Bookings slice data
  const {
    bookings,
    status: bookingStatus,
    error: bookingError,
  } = useSelector((state) => state.bookings);

  // Fetch orders and bookings on component mount
  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchBookings());
  }, [dispatch]);

  // Render each order card with navigation on press
  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('OrderDetailpage', { orderId: item.id })
      }
    >
      <View style={styles.orderCard}>
        {/* Top Section: Image + Details + Badge */}
        <View style={styles.topSection}>
          {/* Left Image */}
          <Image
            source={require('../../assets/images/flower.png')}
            style={styles.orderImage}
          />

          {/* Middle Details */}
          <View style={styles.orderDetails}>
            <Text style={styles.orderNumber}>
              Order No: {item.order_number}
            </Text>
            <Text style={styles.deliveryDate}>
              Deliver on: {item.expected_delivery ? item.expected_delivery : 'TBD'}
            </Text>
          </View>

          {/* Right Status Badge */}
          <View style={styles.statusBadge}>
            <View style={styles.statusCircle}>
              <Image
                source={require('../../assets/images/recieved.png')}
                style={styles.statusIcon}
              />
            </View>
            <Text style={styles.statusText}>{item.status_display}</Text>
          </View>
        </View>

        {/* Bottom Section: Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.rateButton}>
            <Image
              source={require('../../assets/images/star.png')}
              style={styles.actionIcon}
            />
            <Text style={styles.rateText}>Rate Order</Text>
          </TouchableOpacity>
          {item.status_display.toLowerCase() === 'received' && (
            <TouchableOpacity style={styles.messageButton}>
              <Image
                source={require('../../assets/images/view-msg.png')}
                style={styles.actionIcon}
              />
              <Text style={styles.messageText}>View Message</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('BookingDetailsScreen', { bookingId: item.id })
      }
    >
      <View style={styles.bookingCard}>
        <Text style={styles.bookingTitle}>{item.product_name}</Text>
        <Text style={styles.bookingDetail}>
          Booking Date: {new Date(item.booking_date).toLocaleDateString()}
        </Text>
        <Text style={styles.bookingDetail}>Vendor: {item.vendor_name}</Text>
        <Text style={styles.bookingDetail}>Status: {item.status}</Text>
      </View>
    </TouchableOpacity>
  );
  

  // For bookings slice, the API returns an object with a "results" array
  const bookingList =
    bookings && bookings.results ? bookings.results : bookings;

  return (
    <View style={styles.container}>
      <HeaderInner
        title="My Orders"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
      />

      {/* Tabs for Orders and Booking */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Orders' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Orders')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Orders' && styles.activeTabText,
            ]}
          >
            Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Booking' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Booking')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Booking' && styles.activeTabText,
            ]}
          >
            Booking
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Orders' ? (
        // Orders List with loading and error handling
        status === 'loading' ? (
          <Loader />
        ) : status === 'failed' ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error fetching orders: {error}</Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        )
      ) : (
        // Booking Tab Content with loading and error handling
        bookingStatus === 'loading' ? (
          <Loader />
        ) : bookingStatus === 'failed' ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Error fetching bookings: {bookingError}
            </Text>
          </View>
        ) : bookingList && bookingList.length > 0 ? (
          <FlatList
            data={bookingList}
            renderItem={renderBookingItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.noBookingContainer}>
            <Text style={styles.noBookingText}>No Booking Available</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    padding: 10,
  },
  orderCard: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  orderNumber: {
    fontSize: 12,
    fontFamily: 'DMSans-Bold',
    color: '#333',
  },
  deliveryDate: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
    fontFamily: 'DMSans-Regular',
  },
  statusBadge: {
    alignItems: 'center',
  },
  statusCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFE9EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  statusIcon: {
    width: 30,
    height: 30,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'DMSans-Bold',
    color: '#F25485',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE0E6',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    marginRight: 0,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE0E6',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
  rateText: {
    fontSize: 12,
    fontFamily: 'DMSans-Bold',
    color: '#F25485',
    marginLeft: 5,
  },
  messageText: {
    fontSize: 12,
    fontFamily: 'DMSans-Bold',
    color: '#F25485',
    marginLeft: 5,
  },
  actionIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#F25485',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'DMSans-Bold',
  },
  activeTabText: {
    color: '#F25485',
  },
  noBookingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBookingText: {
    fontSize: 18,
    color: '#999',
    fontFamily: 'DMSans-Regular',
  },
  bookingCard: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  bookingTitle: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    color: '#333',
    marginBottom: 5,
  },
  bookingDetail: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: '#666',
  },
});

export default MyOrdersScreen;
