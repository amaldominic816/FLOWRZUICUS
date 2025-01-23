import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, FlatList, TouchableOpacity, StatusBar, Dimensions, ScrollView,ImageBackground  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HomePage = ({navigation}) => {
  const data = [
    {
      id: '1',
      title: 'Yellow Roses',
      address: '123 west 45th Street, Saudi Arab, Madinah',
      rating: 4.9,
      reviews: 73,
      image: require('../../assets/images/flower.png'),
    },
    {
        id: '2',
        title: 'Yellow Roses',
        address: '123 west 45th Street, Saudi Arab, Madinah',
        rating: 4.9,
        reviews: 73,
        image: require('../../assets/images/flower.png'),
      },
      {
        id: '4',
        title: 'Yellow Roses',
        address: '123 west 45th Street, Saudi Arab, Madinah',
        rating: 4.9,
        reviews: 73,
        image: require('../../assets/images/flower.png'),
      },
      {
          id: '5',
          title: 'Yellow Roses',
          address: '123 west 45th Street, Saudi Arab, Madinah',
          rating: 4.9,
          reviews: 73,
          image: require('../../assets/images/flower.png'),
        },
        {
          id: '6',
          title: 'Yellow Roses',
          address: '123 west 45th Street, Saudi Arab, Madinah',
          rating: 4.9,
          reviews: 73,
          image: require('../../assets/images/flower.png'),
        },
  
        {
          id: '7',
          title: 'Yellow Roses',
          address: '123 west 45th Street, Saudi Arab, Madinah',
          rating: 4.9,
          reviews: 73,
          image: require('../../assets/images/flower.png'),
        },
        {
          id: '8',
          title: 'Yellow Roses',
          address: '123 west 45th Street, Saudi Arab, Madinah',
          rating: 4.9,
          reviews: 73,
          image: require('../../assets/images/flower.png'),
        },
  
        {
          id: '9',
          title: 'Yellow Roses',
          address: '123 west 45th Street, Saudi Arab, Madinah',
          rating: 4.9,
          reviews: 73,
          image: require('../../assets/images/flower.png'),
        },
        {
          id: '10',
          title: 'Yellow Roses',
          address: '123 west 45th Street, Saudi Arab, Madinah',
          rating: 4.9,
          reviews: 73,
          image: require('../../assets/images/flower.png'),
        },
  ];

  const banners = [
    { id: '1', image: require('../../assets/images/banner.png') },
    { id: '2', image: require('../../assets/images/banner.png') },
    { id: '3', image: require('../../assets/images/banner.png') },
  ];

  const categories = [
    { id: '1', name: 'Dahlia', image: require('../../assets/images/j1.png') },
    { id: '2', name: 'Tulips', image: require('../../assets/images/j1.png') },
    { id: '3', name: 'Rose', image: require('../../assets/images/j1.png') },
    { id: '4', name: 'Teleflor', image: require('../../assets/images/j1.png')},
  ];

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
        <View style={styles.iconButton}>
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


      {/* List Section */}
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false} // Disable FlatList scrolling
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
  headerIcon: {
    width: 24,
    height: 24,
    borderRadius: 10,
  },
  filtericon: {
    width: 25,
    height: 25,
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
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
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
});

export default HomePage;
