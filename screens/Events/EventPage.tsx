import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../screens/components/Header';
import Colors from '../components/Colors';
const { width } = Dimensions.get('window');

const EventScreen = () => {
    const navigation = useNavigation();
    const occasionbanners = [
      { id: '2', image: require('../../assets/images/ocbg1.jpg'), title: 'Valentines Day' },
      { id: '3', image: require('../../assets/images/ocbirbg.jpeg'), title: 'Happy Birth Day' },

  ];
  const popularStoresData = [
    {
      id: '1',
      name: 'Flower Bliss',
      location: 'Madinah, Saudi Arab',
      rating: 4.8,
      image: require('../../assets/images/j1.png'),
    },
    {
      id: '2',
      name: 'Bloom Haven',
      location: 'Jeddah, Saudi Arab',
      rating: 4.7,
      image: require('../../assets/images/j2.png'),
    },
    {
      id: '3',
      name: 'Petal Paradise',
      location: 'Riyadh, Saudi Arab',
      rating: 4.9,
      image: require('../../assets/images/j3.png'),
    },
    {
      id: '4',
      name: 'Petal Paradise',
      location: 'Riyadh, Saudi Arab',
      rating: 4.9,
      image: require('../../assets/images/j4.png'),
    },
    {
      id: '2',
      name: 'Bloom Haven',
      location: 'Jeddah, Saudi Arab',
      rating: 4.7,
      image: require('../../assets/images/flower.png'),
    },
    {
      id: '2',
      name: 'Bloom Haven',
      location: 'Jeddah, Saudi Arab',
      rating: 4.7,
      image: require('../../assets/images/j2.png'),
    },

    {
      id: '2',
      name: 'Bloom Haven',
      location: 'Jeddah, Saudi Arab',
      rating: 4.7,
      image: require('../../assets/images/j1.png'),
    },
    {
      id: '2',
      name: 'Bloom Haven',
      location: 'Jeddah, Saudi Arab',
      rating: 4.7,
      image: require('../../assets/images/j4.png'),
    },
    {
      id: '2',
      name: 'Bloom Haven',
      location: 'Jeddah, Saudi Arab',
      rating: 4.7,
      image: require('../../assets/images/j2.png'),
    },
    {
      id: '2',
      name: 'Bloom Haven',
      location: 'Jeddah, Saudi Arab',
      rating: 4.7,
      image: require('../../assets/images/j1.png'),
    },
    {
      id: '2',
      name: 'Bloom Haven',
      location: 'Jeddah, Saudi Arab',
      rating: 4.7,
      image: require('../../assets/images/j3.png'),
    },

    // Add more stores
  ];

  const renderPopularStoreItem = ({ item }) => (
      <TouchableOpacity
        style={styles.popularStoreCardSingle}
        onPress={() =>
          navigation.navigate('StoreOverviewPage', {
            name: item.name,
            image: item.image,
            location: item.location,
            rating: item.rating,
          })
        }>
        <Image source={item.image} style={styles.popularStoreImageSingle} />
        <View style={styles.popularStoreInfoSingle}>
          <Text style={styles.popularStoreNameSingle}>{item.name}</Text>
          <Text style={styles.popularStoreLocationSingle}>{item.location}</Text>
          <View style={styles.popularStoreRatingRow}>
            <Image
              source={require('../../assets/images/star.png')}
              style={styles.ratingIconSingle}
            />
            <Text style={styles.popularStoreRatingSingle}>{item.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );

return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Top Bar */}
          <Header
            title="Events" // Dynamic title
            showCartIcon={true} // Show cart icon
            showNotificationIcon={true} // Show notification icon
            showProfileIcon={false} // Show profile icon
            onCartPress={() => navigation.navigate('CartPage')}
            onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
            onProfilePress={() => navigation.navigate('ProfileScreen')}
          />
          <View style={styles.searchSection}>
            <View style={styles.searchBar}>
              <Image
                source={require('../../assets/images/search.png')}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search your flower"
                placeholderTextColor={Colors.placeholder}
                onSubmitEditing={(event) => {
                  const searchQuery = event.nativeEvent.text; // Get the search input value
                  if (searchQuery.trim().length > 0) {
                    navigation.navigate('SearchProducts', { query: searchQuery }); // Navigate to SearchProducts
                  }
                }}
              />

            </View>
          </View>
          <View style={styles.categoriesContainer}>
            <View style={styles.categoriesHeader}>
              <Text style={styles.categoriesTitle}>All Events</Text>
              <TouchableOpacity>
                <Text style={styles.categoriesSeeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {occasionbanners.map((occasionbanner) => (
                <View key={occasionbanner.id} style={styles.bannerCard}>
                  <Image source={occasionbanner.image} style={styles.Occasionbanner} />
                  <View style={styles.occasionoverlay}>
                    <Text style={styles.bannerText}>{occasionbanner.title}</Text>
                  </View>
                  
                </View>
                
              ))}
            </ScrollView>
            
          </View>
           {/* Popular Stores Section */}
                    <View style={styles.popularStoresContainer}>
                      <View style={styles.popularStoresHeader}>
                        <Text style={styles.popularStoresTitle}>Stores</Text>
                        <TouchableOpacity>
                          <Text style={styles.popularStoresSeeAll}>See all</Text>
                        </TouchableOpacity>
                      </View>
                      <FlatList
                        data={popularStoresData}
                        renderItem={renderPopularStoreItem}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                      />
                    </View>
                </ScrollView>
              </SafeAreaView>
            );
          };
          const styles = StyleSheet.create({
            container: {
              flex: 1,
              backgroundColor: Colors.background,
            },
            scrollViewContent: {
              paddingBottom: 20,
            },
            popularStoresContainer: {
              marginHorizontal: 16,
              marginBottom: 20,
            },
            popularStoresHeader: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            },
            popularStoresTitle: {
              fontSize: 18,
              fontFamily: 'DMSans-Bold',
            },
            popularStoresSeeAll: {
              fontSize: 14,
              color: '#000',
              fontFamily: 'DMSans-Light',
            },
            popularStoreCardSingle: {
              flexDirection: 'row',
              backgroundColor: Colors.secondary,
              borderRadius: 12,
              padding: 10,
              marginBottom: 10,
              alignItems: 'center',
            },
            popularStoreImageSingle: {
              width: 70,
              height: 70,
              borderRadius: 8,
              marginRight: 10,
              resizeMode: 'cover',
            },
            popularStoreInfoSingle: {
              flex: 1,
              fontFamily: 'DMSans-Regular',
            },
            popularStoreNameSingle: {
              fontSize: 16,
              color: '#000',
              marginBottom: 4,
              fontFamily: 'DMSans-Bold',
            },
            popularStoreLocationSingle: {
              fontSize: 14,
              color: '#666',
              marginBottom: 6,
              fontFamily: 'DMSans-Regular',
            },
            popularStoreRatingRow: {
              flexDirection: 'row',
              alignItems: 'center',
            },
            ratingIconSingle: {
              width: 16,
              height: 16,
              marginRight: 4,
            },
            popularStoreRatingSingle: {
              fontSize: 14,
              color: '#444',
              fontFamily: 'DMSans-Medium',
            },
            searchSection: {

              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 16,
              marginBottom: 8,
              marginTop: 8,
            },

            searchBar: {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.secondary,
              borderRadius: 8,
              paddingHorizontal: 12,
              height: 35,
            },
            searchIcon: {
              width: 15,
              height: 15,
              marginRight: 8,
            },
            searchInput: {
              flex: 1,
              fontSize: 12,
              color: '#000',
              fontFamily: 'DMSans-Light',
            },
            categoriesContainer: {
              marginHorizontal: 16,
              marginBottom: 20,
            },
            categoriesHeader: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            },
            categoriesTitle: {
              fontSize: 18,
              fontFamily:'DMSans-Bold',
            },
            categoriesSeeAll: {
              fontSize: 14,
              color: '#000',
              fontFamily:'DMSans-Light',
            },
            Occasionbanner: {
              width: width - 32,
              height: 150,
              resizeMode: 'cover',
            },
            bannerText: {
              color: 'white',
              fontSize: 30,
              fontFamily:'DMSans-Bold',
            },
            bannerCard: {
              marginRight: 10,
              borderRadius: 10,
              overflow: 'hidden',
            },
            occasionoverlay: {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            },
        });

        export default EventScreen;
