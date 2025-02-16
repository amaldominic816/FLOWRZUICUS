import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, FlatList, TouchableOpacity, StatusBar, Dimensions, ScrollView, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView, Platform } from 'react-native';
import Header from '../../screens/components/Header';
import ButtonPrimary from '../components/ButtonPrimary';
import Colors from '../components/Colors';





const HomePage = ({ navigation }) => {
  const data = [
    {
      id: '1',
      title: 'Yellow Roses',
      address: '123 west 45th Street, Saudi Arab, Madinah',
      rating: 4.9,
      reviews: 73,
      image: require('../../assets/images/flower.png'),
    },
    // Additional data items...
  ];

  const banners = [
    { id: '2', image: require('../../assets/images/banner.png') },
    { id: '3', image: require('../../assets/images/banner.png') },
  ];
  const occasionbanners = [
    { id: '2', image: require('../../assets/images/ocbg1.jpg'), title: 'Valentines Day' },
    { id: '3', image: require('../../assets/images/ocbirbg.jpeg'), title: 'Happy Birth Day' },

  ];

  const categories = [
    { id: '1', name: 'Dahlia', image: require('../../assets/images/j1.png') },
    { id: '2', name: 'Tulips', image: require('../../assets/images/j1.png') },
    { id: '3', name: 'Rose', image: require('../../assets/images/j1.png') },
    { id: '4', name: 'Teleflor', image: require('../../assets/images/j1.png') },
    { id: '1', name: 'Dahlia', image: require('../../assets/images/j1.png') },
    { id: '2', name: 'Tulips', image: require('../../assets/images/j1.png') },
    { id: '3', name: 'Rose', image: require('../../assets/images/j1.png') },
    { id: '4', name: 'Teleflor', image: require('../../assets/images/j1.png') },
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
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />

          {/* Header Section */}
          <Header
            title="FLOWRZ" // Dynamic title
            showCartIcon={true} // Show cart icon
            showNotificationIcon={true} // Show notification icon
            showProfileIcon={true} // Show profile icon
            onCartPress={() => navigation.navigate('CartPage')}
            onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
            onProfilePress={() => navigation.navigate('ProfileScreen')}
          />
          {/* Search Bar and Filter */}
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
            <View style={styles.iconButtonfilter}>
              <Image
                source={require('../../assets/images/filter.png')}
                style={styles.filtericon}
              />
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

          {/* Categories Section
          <View style={styles.categoriesContainer}>
            <View style={styles.categoriesHeader}>
              <Text style={styles.categoriesTitle}>Occasions</Text>
              <TouchableOpacity>
                <Text style={styles.categoriesSeeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScrollView}>
              {categories.map((item) => (
                <View key={item.id} style={styles.categoryCard}>
                  <View style={styles.categoryImageContainer}>
                    <Image source={item.image} style={styles.categoryImage} />
                    <Text style={styles.categoryInnerText}>{item.name}</Text> {/* Inner text inside the circle */}
          {/* </View>
                </View>
              ))}
            </ScrollView>
          </View> */}


          {/* Categories Section */}
          <View style={styles.categoriesContainer}>
            <View style={styles.categoriesHeader}>
              <Text style={styles.categoriesTitle}>Shop by Occasions</Text>
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



        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },



  iconButtonfilter: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  filtericon: {
    width: 15,
    height: 15,
    borderRadius: 10,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    marginLeft: 8,
    marginTop: 10,
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
  bannerContainer: {
    width: width - 32,
    height: 150,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.background,
    elevation: 2,
  },
  bannerText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'DMSans-Bold',
  },
  bannerCard: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  Occasionbanner: {
    width: width - 32,
    height: 150,
    resizeMode: 'cover',
  },
  occasionoverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)', // Semi-transparent overlay for better text visibility
    width: '100%',
    alignItems: 'center',
    paddingVertical: 4,
  },

  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 12, // Match the gradient border radius if necessary
    overflow: 'hidden', // Ensures the image doesn't overflow the container

  },
  banner: {
    width: width - 32,
    height: 150,
    resizeMode: 'cover',
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    fontFamily: 'DMSans-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  rating: {
    fontSize: 14,
    color: '#444',
  },
  newSectionContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  newSectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  newSectionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
  },
  newSectionButtonSingle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  giftButton: {
    justifyContent: 'center',
  },
  newSectionIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  newSectionText: {
    fontSize: 14,
    color: '#666',
  },
  findGiftButton: {
    marginTop: 16,
    backgroundColor: 'linear-gradient(90deg, #FF7E5F, #FD3A84)',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  findGiftText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
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


  //Category Card
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
    fontFamily: 'DMSans-Bold',
  },
  categoriesSeeAll: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'DMSans-Light',
  },



  categoriesScrollView: {
    paddingVertical: 10, // Adds spacing vertically
  },

  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows wrapping to the next row
    justifyContent: 'space-between', // Ensures even horizontal spacing
    marginTop: 10,
    rowGap: 20, // Adds vertical spacing between rows
  },
  categoryCard: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15, // Adds space between each card horizontally
  },

  categoryImageContainer: {
    width: 80, // Circle width
    height: 80, // Circle height
    borderRadius: 40, // Makes it circular
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary, // Optional background color
    overflow: 'hidden', // Ensures no content spills over
    position: 'relative', // Allows absolute positioning for the text
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensures the image fits inside the circle
  },

  categoryInnerText: {
    position: 'absolute', // Places text at the bottom
    bottom: 5, // Adjust this to place text near the bottom edge
    fontSize: 12,
    fontFamily: 'DMSans-Light',
    color: '#FFF', // Contrast color for visibility
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better visibility
    paddingHorizontal: 5,
    borderRadius: 5,
  },

});

export default HomePage;
