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

const notifications = [
  {
    id: '1',
    name: 'Savannah Nguyen',
    time: '5 min ago',
    message:
      'This flower design is stunning, with vibrant colors and intricate details that create a harmonious balance.',
    image: require('../../assets/images/profile-picture.png'),
  },
  {
    id: '2',
    name: 'Fayez Ali',
    time: '5 min ago',
    message:
      'This flower design is stunning, with vibrant colors and intricate details that create a harmonious balance.',
    image: require('../../assets/images/profile-picture.png'),
  },
  {
    id: '3',
    name: 'Salim Al Tajir',
    time: '10 min ago',
    message:
      'This flower design is stunning, with vibrant colors and intricate details that create a harmonious balance.',
    image: require('../../assets/images/profile-picture.png'),
  },
  {
    id: '4',
    name: 'Kanz',
    time: '36 min ago',
    message:
      'This flower design is stunning, with vibrant colors and intricate details that create a harmonious balance.',
    image: require('../../assets/images/profile-picture.png'),
  },
  {
    id: '5',
    name: 'Ziyad Abdullah',
    time: '56 min ago',
    message:
      'This flower design is stunning, with vibrant colors and intricate details that create a harmonious balance.',
    image: require('../../assets/images/profile-picture.png'),
  },
  {
    id: '6',
    name: 'Ziyad Abdullah',
    time: '1 hour ago',
    message:
      'This flower design is stunning, with vibrant colors and intricate details that create a harmonious balance.',
    image: require('../../assets/images/profile-picture.png'),
  },
];

const PushNotificationsScreen = () => {
  const handleCardPress = (id) => {
    console.log(`Card with ID ${id} clicked!`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCardPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.notificationItem}>
        <Image source={item.image} style={styles.userImage} />
        <View style={styles.notificationText}>
          <View style={styles.notificationHeader}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
          <Text style={styles.notificationMessage}>{item.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton2}>
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Path d="M15 19l-7-7 7-7" stroke="#000" strokeWidth="2" fill="none" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.topBarText}>Push notifications</Text>
        <View style={styles.topBarIcons}>
          <TouchableOpacity style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/cart.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/notification.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.notificationList}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  topBarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  topBarIcons: {
    flexDirection: 'row',
  },
  iconButton2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE0C4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginRight: 16,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    marginLeft: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  notificationList: {
    padding: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  notificationText: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  notificationMessage: {
    fontSize: 13,
    color: '#555',
  },
});

export default PushNotificationsScreen;
