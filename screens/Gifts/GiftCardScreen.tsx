import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Header from '../../screens/components/Header';
import ButtonOutlined from '../components/ButtonOutlined';
import Colors from '../components/Colors';
import ButtonPrimary from '../components/ButtonPrimary';

const { width } = Dimensions.get('window');

const banners = [
  { id: '1', image: require('../../assets/images/banner.png') },
];

const giftCards = [
  {
    id: '1',
    title: 'Pink Tulips',
    image: require('../../assets/images/j1.png'),
  },
];

const myGifts = [
  {
    id: '1',
    title: '1 Item from Madinah',
    details: 'Fill the card for details',
    icons: [
      require('../../assets/images/gfone.png'),
      require('../../assets/images/gftwo.png'),
    ],
  },
];

const GiftCardScreen = ({ navigation }) => {
  const renderGiftCard = ({ item }) => (
    <View style={styles.giftCard}>
      <Image source={item.image} style={styles.giftCardImage} />
      <Text style={styles.giftCardTitle}>{item.title}</Text>
      <ButtonPrimary
                      buttonText="Redeem"
                      onPress={() => navigation.navigate('')}
                      buttonWidth={Dimensions.get('window').width * 0.8}
                      buttonHeight={40}
                      fontSize={12}
                      gradientColors={['#DE8542', '#FE5993']}
                    />
    </View>
  );

  const renderMyGift = ({ item }) => (
    <View style={styles.myGiftCard}>
      <View style={styles.topContainer}>
        <Text style={styles.giftHeaderText}>Your gift</Text>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.iconContainer}>
          <Image source={require('../../assets/images/gift_icon.png')} style={styles.giftIcon} />
        </View>
        <View style={styles.textAndIconsContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.myGiftTitle}>
              <Text style={styles.boldText}>1 Item</Text> from Madinah
            </Text>
            <View style={styles.myGiftIcons}>
              {item.icons.map((icon, index) => (
                <Image key={index} source={icon} style={styles.myGiftIcon} />
              ))}
            </View>
          </View>
          <Text style={styles.myGiftDescription}>Fil the card</Text>
          <Text style={styles.myGiftDetails}>For details</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />

        <Header
          title="Gift Card & Message"
          showCartIcon={true}
          showNotificationIcon={true}
          showProfileIcon={true}
          onCartPress={() => navigation.navigate('CartPage')}
          onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
          onProfilePress={() => navigation.navigate('ProfileScreen')}
        />

        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {banners.map((banner) => (
              <Image key={banner.id} source={banner.image} style={styles.banner} />
            ))}
          </ScrollView>
        </View>

        {/* Send Gift Button */}
        <View style={styles.buttonWrapper}>
          <ButtonOutlined
            buttonText="Send a Gift now"
            onPress={() => navigation.navigate('GiftCardScreenDetail')}
            buttonWidth={width * 0.9}
            buttonHeight={50}
            fontSize={18}
            borderColor="#FF7E5F"
            textColor="#FF7E5F"
          />
        </View>

        {/* Redeem Section */}
        <Text style={styles.sectionTitle}>Redeem</Text>
        <FlatList
          data={giftCards}
          renderItem={renderGiftCard}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={styles.giftCardList}
          showsHorizontalScrollIndicator={false}
        />

        {/* My Gift Cards Section */}
        <Text style={styles.sectionTitle}>My Gift Card</Text>
        <FlatList
          data={myGifts}
          renderItem={renderMyGift}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.myGiftList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  buttonWrapper: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  bannerContainer: {
    width: width - 32,
    height: 150,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.secondary,
  },
  banner: {
    width: width - 32,
    height: 150,
    resizeMode: 'cover',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily:'DMSans-Bold',
    color: '#333',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  giftCardList: {
    paddingHorizontal: 15,
  },
  giftCard: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    marginRight: 10,
    marginLeft:10,
    alignItems: 'center',
    padding: 10,
    resizeMode:'contain',
  },
  giftCardImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  giftCardTitle: {
    marginTop:10,
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    fontFamily:'DMSans-SemiBold',
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
    fontFamily:'DMSans-Bold',
  },
  myGiftList: {
    paddingHorizontal: 15,
  },
  myGiftCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  giftHeaderText:{
    fontFamily:'DMSans-SemiBold',
      },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFC0CB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  giftIcon: {
    width: 24,
    height: 24,
  },
  textAndIconsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myGiftTitle: {
    fontSize: 16,
    color: '#333',
    fontFamily:'DMSans-Regular',
  },
  boldText: {
    fontFamily:'DMSans-Bold',
  },
  myGiftDescription: {
    fontSize: 14,
    color: '#777',
    fontFamily:'DMSans-Regular',
  },
  myGiftDetails: {
    fontSize: 14,
    fontFamily:'DMSans-SemiBold',
    color: '#333',
  },
  myGiftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  myGiftIcon: {
    width: 47,
    height: 30,
    marginHorizontal: 3,
    resizeMode: 'contain',
  },
});

export default GiftCardScreen;
