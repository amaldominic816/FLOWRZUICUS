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
import { useNavigation } from '@react-navigation/native';
import Colors from '../components/Colors';



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
  const navigation = useNavigation();
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
       <HeaderInner
        title="Notifications"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={()=>navigation.navigate('CartPage')}
      />

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
    backgroundColor:Colors.background,
  },


 
  notificationList: {
    padding: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    backgroundColor: Colors.secondary,
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
    fontFamily:'DMSans-Bold',

    color: '#333',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    fontFamily:'DMSans-Regular',

  },
  notificationMessage: {
    fontSize: 13,
    color: '#555',
    fontFamily:'DMSans-Regular',

  },
});

export default PushNotificationsScreen;
