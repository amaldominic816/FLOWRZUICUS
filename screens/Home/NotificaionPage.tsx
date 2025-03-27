import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../redux/slices/notificationSlice';
import HeaderInner from '../components/Headerinner';

const PushNotificationsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const status = useSelector((state) => state.notifications.status);
  const error = useSelector((state) => state.notifications.error);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => console.log(`Notification with ID ${item.id} clicked!`)}
      activeOpacity={0.7}
    >
      <View style={styles.notificationCard}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{new Date(item.created_at).toLocaleString()}</Text>
        </View>
        <View style={styles.notificationContent}>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          {item.data.order_number && (
            <Text style={styles.notificationDetail}>
              Order Number: {item.data.order_number}
            </Text>
          )}
          {item.data.order_id && (
            <Text style={styles.notificationDetail}>
              Order ID: {item.data.order_id}
            </Text>
          )}
          {item.data.pickup_code && (
            <Text style={styles.notificationDetail}>
              Pickup Code: {item.data.pickup_code}
            </Text>
          )}
        </View>
        <View style={styles.notificationFooter}>
          <Text style={styles.notificationStatusText}>
            Status: {item.data.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <HeaderInner
        title="Notifications"
        showBackButton={true}
        showNotificationIcon={false}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
      />

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.notificationList}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationList: {
    padding: 10,
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 10,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  notificationContent: {
    flex: 1,
    marginBottom: 10,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  notificationDetail: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  notificationStatusText: {
    fontSize: 14,
    color: '#666',
  },
});

export default PushNotificationsScreen;