import React from 'react';
import {
  View,
  Text,
  Image,
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

const GiftCardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />

        <Header
          title="Gift "
          showCartIcon={true}
          showNotificationIcon={true}
          showProfileIcon={true}
          onCartPress={() => navigation.navigate('CartPage')}
          onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
          onProfilePress={() => navigation.navigate('ProfileScreen')}
          onOcPress={() => navigation.navigate('MyOccasionsScreen')}
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
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No Data Available</Text>
        </View>

        {/* My Gift Card Section */}
        <Text style={styles.sectionTitle}>My Gift Card</Text>
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No Data Available</Text>
        </View>
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
    fontFamily: 'DMSans-Bold',
    color: '#333',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  noDataContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'DMSans-Regular',
  },
});

export default GiftCardScreen;
