import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../screens/components/Header';
import Colors from '../components/Colors';

const { width } = Dimensions.get('window');

const banners = [
  { id: '1', image: require('../../assets/images/banner.png') },
  { id: '2', image: require('../../assets/images/banner.png') },
  { id: '3', image: require('../../assets/images/banner.png') },
];

const giftCards = [
  {
    id: '1',
    title: 'Pink Tulips',
    image: require('../../assets/images/flower.png'),
  },
];

const myGifts = [
  {
    id: '1',
    title: '1 Item from Madinah',
    details: 'Fill the card for details',
    icons: [
      require('../../assets/images/gift.png'),
      require('../../assets/images/gift.png'),
    ],
  },
  {
    id: '2',
    title: '2 Items from Riyadh',
    details: 'Fill the card for details',
    icons: [
      require('../../assets/images/gift.png'),
      require('../../assets/images/gift.png'),
    ],
  },
];

const RewardsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Set StatusBar */}
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />

      <Header
        title="Rewards" // Dynamic title
        showCartIcon={true} // Show cart icon
        showNotificationIcon={true} // Show notification icon
        showProfileIcon={true} // Show profile icon
        onCartPress={() => navigation.navigate('CartPage')}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onProfilePress={() => navigation.navigate('ProfileScreen')}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop:40,
    backgroundColor: Colors.background,
  },
  trackButton: {
    marginVertical: 8,
    padding:15,
    alignSelf: 'center', // Centers the button horizontally
    width: '100%', // Matches the parent container width
  },
  trackButtonGradient: {
    padding: 2, // Gradient border thickness
    borderRadius: 12, // Ensures the gradient border matches the button's radius
  },
  trackButtonContent: {
    backgroundColor: '#FFF', // White background inside the gradient border
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FD3A84', // Matches the gradient color for text
    textAlign: 'center',
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
  bannerContainer: {
    width: width - 32,
    height: 150,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  banner: {
    width: width - 32,
    height: 150,
    resizeMode: 'cover',
  },
  giftCardList: {
    paddingHorizontal: 15,
  },
  giftCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    padding: 10,
    elevation: 2,
  },
  giftCardImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  giftCardTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  redeemButton: {
    backgroundColor: '#F25485',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  redeemText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  myGiftList: {
    paddingHorizontal: 15,
  },
  myGiftCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  myGiftDetails: {
    flex: 1,
  },
  myGiftTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  myGiftDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  myGiftIcons: {
    flexDirection: 'row',
  },
  myGiftIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
  },
});

export default RewardsScreen;
