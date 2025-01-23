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
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

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
    image: require('../../assets/images/pink-tulips.png'), // Replace with actual image
  },
];

const myGifts = [
  {
    id: '1',
    title: '1 Item from Madinah',
    details: 'Fill the card for details',
    icons: [
      require('../../assets/images/gift1.png'),
      require('../../assets/images/gift2.png'),
    ],
  },
  {
    id: '2',
    title: '2 Items from Riyadh',
    details: 'Fill the card for details',
    icons: [
      require('../../assets/images/gift1.png'),
      require('../../assets/images/gift2.png'),
    ],
  },
];

const GiftCardScreen = () => {
  const renderGiftCard = ({ item }) => (
    <View style={styles.giftCard}>
      <Image source={item.image} style={styles.giftCardImage} />
      <Text style={styles.giftCardTitle}>{item.title}</Text>
      <TouchableOpacity style={styles.redeemButton}>
        <Text style={styles.redeemText}>Redeem</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMyGift = ({ item }) => (
    <View style={styles.myGiftCard}>
      <View style={styles.myGiftDetails}>
        <Text style={styles.myGiftTitle}>{item.title}</Text>
        <Text style={styles.myGiftDescription}>{item.details}</Text>
      </View>
      <View style={styles.myGiftIcons}>
        {item.icons.map((icon, index) => (
          <Image key={index} source={icon} style={styles.myGiftIcon} />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton}>
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Path d="M15 19l-7-7 7-7" stroke="#000" strokeWidth="2" fill="none" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.title}>Gift Card & Message</Text>
        <View style={styles.icons}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/cart.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/notification.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {banners.map((banner) => (
            <Image key={banner.id} source={banner.image} style={styles.banner} />
          ))}
        </ScrollView>
      </View>

      {/* Gift Cards Section */}
      <FlatList
        data={giftCards}
        renderItem={renderGiftCard}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.giftCardList}
        showsHorizontalScrollIndicator={false}
      />

      {/* My Gift Cards Section */}
      <Text style={styles.sectionTitle}>My gift card</Text>
      <FlatList
        data={myGifts}
        renderItem={renderMyGift}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.myGiftList}
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
  bannerContainer: {
    width: width - 32,
    height: 150,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
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

export default GiftCardScreen;
