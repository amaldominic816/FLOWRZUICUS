import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, FlatList, TouchableOpacity, StatusBar, Dimensions, ScrollView, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView, Platform } from 'react-native';
import Header from '../../screens/components/Header';
import ButtonPrimary from '../components/ButtonPrimary';




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
          <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />

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
                placeholderTextColor="#aaa"
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

          <View style={styles.newSectionContainer}>
            <TouchableOpacity style={styles.newSectionButtonSingle}>
              <Image source={require('../../assets/images/location.png')} style={styles.newSectionIcon} />
              <Text style={styles.newSectionText}>Where</Text>
            </TouchableOpacity>
            <View style={styles.newSectionRow}>
              <TouchableOpacity style={styles.newSectionButton}>
                <Image source={require('../../assets/images/calender.png')} style={styles.newSectionIcon} />
                <Text style={styles.newSectionText}>Delivery Date</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.newSectionButton, styles.giftButton]}>
                <Image source={require('../../assets/images/giftgrey.png')} style={styles.newSectionIcon} />
                <Text style={styles.newSectionText}>Gift Selection</Text>
              </TouchableOpacity>
            </View>
            <ButtonPrimary
              buttonText="Send Gift Now"
              onPress={() => navigation.navigate('')}
              buttonWidth={Dimensions.get('window').width * 0.8} // Set width to 80% of the screen width
              buttonHeight={40}
              fontSize={18}
              gradientColors={['#DE8542', '#FE5993']} // Optional custom gradient
            />
          </View>

          {/* Categories Section */}
          <View style={styles.categoriesContainer}>
  <View style={styles.categoriesHeader}>
    <Text style={styles.categoriesTitle}>Occasions</Text>
    <TouchableOpacity>
      <Text style={styles.categoriesSeeAll}>See all</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.categoriesGrid}>
    {categories.map((item) => (
      <View key={item.id} style={styles.categoryCard}>
  <View style={styles.categoryImageContainer}>
    <Image source={item.image} style={styles.categoryImage} />
  </View>
  <Text style={styles.categoryText}>{item.name}</Text> {/* Text outside the circle */}
</View>

    ))}
  </View>
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
    backgroundColor: '#F5F5F5',
  },



  iconButtonfilter: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#fff',
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
    backgroundColor: '#ddd',
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
    backgroundColor: '#fff',
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

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
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
    fontWeight: 'bold',
  },
  popularStoresSeeAll: {
    fontSize: 14,
    color: '#000',
  },
  popularStoreCardSingle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
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
  },
  popularStoreNameSingle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  popularStoreLocationSingle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
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
    fontWeight: 'bold',
  },
  categoriesSeeAll: {
    fontSize: 14,
    color: '#000',
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
    marginHorizontal: 5, // Space between items
  },
  categoryImageContainer: {
    width: 65, // Set the circle width
    height: 65, // Set the circle height
    borderRadius: 35, // Makes it perfectly circular
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Optional background color for the circle
    overflow: 'hidden', // Ensures the content doesn't overflow
  },
  categoryImage: {
    width: '100%', // Make the image fill the circle
    height: '100%',
    resizeMode: 'cover', // Ensures the image maintains its aspect ratio
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginTop: 8, // Space between the circle and the text
  },


});

export default HomePage;
