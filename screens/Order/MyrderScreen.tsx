import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import HeaderInner from '../../screens/components/Headerinner';


const orders = [
  {
    id: '1',
    orderNumber: '101245847',
    deliveryDate: '02/01/2025',
    status: 'Received',
    image: require('../../assets/images/flower.png'),
  },
];

const MyOrdersScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>
      {/* Top Section: Image + Details + Badge */}
      <View style={styles.topSection}>
        {/* Left Image */}
        <Image source={item.image} style={styles.orderImage} />

        {/* Middle Details */}
        <View style={styles.orderDetails}>
          <Text style={styles.orderNumber}>Order No: {item.orderNumber}</Text>
          <Text style={styles.deliveryDate}>Deliver on: {item.deliveryDate}</Text>
        </View>

        {/* Right Status Badge */}
        <View style={styles.statusBadge}>
          <View style={styles.statusCircle}>
            <Image
              source={require('../../assets/images/recieved.png')} // Replace with appropriate status icon
              style={styles.statusIcon}
            />
          </View>
          <Text style={styles.statusText}>{item.status}</Text>
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
        {item.status === 'Received' && (
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
  );

  return (
    <View style={styles.container}>
   <HeaderInner
        title="My Orders"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={()=>navigation.navigate('CartPage')}
      />

      {/* Orders List */}
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F9F9F9',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  listContainer: {
    padding: 10,
  },
  orderCard: {
    backgroundColor: '#fff',
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
    fontWeight: 'bold',
    color: '#333',
  },
  deliveryDate: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
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
    fontWeight: 'bold',
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
    marginRight: 10,
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
    fontWeight: 'bold',
    color: '#F25485',
    marginLeft: 5,
  },
  messageText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F25485',
    marginLeft: 5,
  },
  actionIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default MyOrdersScreen;
