import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, FlatList, TouchableOpacity, StatusBar, Dimensions, ScrollView, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';



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
    { id: '1', image: require('../../assets/images/mothersday.png') },
    { id: '2', image: require('../../assets/images/banner.png') },
    { id: '3', image: require('../../assets/images/banner.png') },
  ];

  const categories = [
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
    // Add more stores
  ];
  const renderPopularStoreItem = ({ item }) => (
    <TouchableOpacity style={styles.popularStoreCard}>
      <Image source={item.image} style={styles.popularStoreImage} />
      <View style={styles.popularStoreInfo}>
        {/* Row for Store Name and Rating */}
        <View style={styles.popularStoreHeader}>
          <Text style={styles.popularStoreName}>{item.name}</Text>
          <View style={styles.popularStoreRatingContainer}>
            <Image
              source={require('../../assets/images/star.png')}
              style={styles.ratingIcon}
            />
            <Text style={styles.popularStoreRating}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.popularStoreLocation}>{item.location}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Image
          source={require('../../assets/images/favourite.png')}
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <View style={styles.ratingContainer}>
          <Image
            source={require('../../assets/images/location.png')}
            style={styles.icon}
          />
          <Text style={styles.rating}>{item.rating} ({item.reviews})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>FLOWRZ</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('CartPage')}>
            <Image
              source={require('../../assets/images/cart.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('PushNotificationsScreen')}>
            <Image
              source={require('../../assets/images/notification.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/profile-picture.png')}
            style={styles.profileIcon}
          />
        </View>
      </View>

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

      {/* <View style={styles.newSectionContainer}>
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
        <TouchableOpacity
                style={styles.trackButton}
                onPress={() => navigation.navigate('OrderTracking')} // Move the onPress here
              >
                <LinearGradient
                  colors={["#FF7E5F", "#FD3A84"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.trackButtonGradient}
                >
                  <View style={styles.trackButtonContent}>
                    <Text style={styles.trackButtonText}>Send a gift now</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
      </View> */}

    {/* Categories Section */}
    <View style={styles.categoriesContainer}>
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.categoriesSeeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item) => (
            <LinearGradient
              key={item.id}
              colors={['#DE8542', '#FE5993']} // Pink gradient colors
              style={styles.gradientBorder}
            >
              <TouchableOpacity style={styles.categoryCard}>
                <ImageBackground source={item.image} style={styles.categoryImage}>
                  <View style={styles.overlay}>
                    <Text style={styles.categoryText}>{item.name}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </LinearGradient>
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
    data={popularStoresData} // Replace with your data array
    renderItem={renderPopularStoreItem}
    keyExtractor={(item) => item.id}
    numColumns={2} // Ensures 2 items per row
    columnWrapperStyle={styles.columnWrapper} // Space between rows
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.popularStoresList}
  />
</View>



    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
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
  headerIcon: {
    width: 24,
    height: 24,
    borderRadius: 10,
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
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  trackButton: {
    marginVertical: 8,
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
    fontSize: 10,
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
  gradientBorder: {
    borderRadius: 14, // Slightly larger than categoryCard
    padding: 2, // Space for the gradient border
    marginRight: 16,
  },

  categoryCard: {
    width: 100,
    height: 125, // Make the card square
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%', // Full width of the container
    height: '100%', // Full height of the container
    justifyContent: 'flex-end', // Place text at the bottom
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)', // Semi-transparent overlay for better text visibility
    width: '100%',
    alignItems: 'center',
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 12, // Match the gradient border radius if necessary
    overflow: 'hidden', // Ensures the image doesn't overflow the container

  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#FE5993', // Pink background
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 8,
    overflow: 'hidden',
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
  popularStoresList: {
    paddingVertical: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Space between two items in a row
    marginBottom: 16, // Space between rows
  },
  popularStoreCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  popularStoreImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover', // Optional: Add rounded corners to the image
  },
  popularStoreInfo: {
    marginTop: 8,
  },
  popularStoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Push the rating to the right
    alignItems: 'center',
    marginBottom: 4, // Add spacing below the row
  },
  popularStoreName: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    marginLeft:10,
  },
  popularStoreRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  popularStoreRating: {
    fontSize: 14,
    color: '#444',
    marginRight:10,
  },
  popularStoreLocation: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginLeft:10,
    marginRight:10,
    marginBottom:4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 5,
    width: 22,
    height: 22,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    width: 15,
    height: 15,
    resizeMode:'contain',
  },
});

export default HomePage;
