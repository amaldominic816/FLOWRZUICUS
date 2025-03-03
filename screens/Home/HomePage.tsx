import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
  ImageBackground,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native';
import Header from '../../screens/components/Header';
import Colors from '../components/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStores } from '../redux/slices/storesSlice';
import { fetchOccasionBanners } from '../redux/slices/occasionsSlice';
import { fetchCategories } from '../redux/slices/categoriesSlice'; // Import the fetchCategories action
import HeaderHome from '../components/HeaderHome';

const HomePage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  // Selecting states from the stores slice
  const { stores, loading: loadingStores, error: errorStores } = useSelector((state) => state.stores);

  // Selecting states from the occasion slice
  const { banners, loading: loadingBanners, error: errorBanners } = useSelector((state) => state.occasion);

  // Selecting categories from the categories slice
  const { categories, loading: loadingCategories, error: errorCategories } = useSelector((state) => state.categories);
  const storiesData = [
    {
      id: '1',
      image: require('../../assets/images/in1.png'),
      label: 'Logo1',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: '2',
      image: require('../../assets/images/in2.png'),
      label: 'Logo2',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: '3',
      image: require('../../assets/images/in3.png'),
      label: 'Logo3',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: '4',
      image: require('../../assets/images/in4.png'),
      label: 'Logo4',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: '5',
      image: require('../../assets/images/j1.png'),
      label: 'Logo5',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: '6',
      image: require('../../assets/images/j2.png'),
      label: 'Logo6',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  ];
  const handleStoryPress = (story) => {
    navigation.navigate('StoryViewer', { story });
  };
  // Load data initially on mount
  useEffect(() => {
    dispatch(fetchStores());
    dispatch(fetchOccasionBanners());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Combine loading states for better user experience
  const loading = loadingStores || loadingBanners || loadingCategories;
  const error = errorStores || errorBanners || errorCategories;

  // Handler for pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      dispatch(fetchStores()),
      dispatch(fetchOccasionBanners()),
      dispatch(fetchCategories())
    ]);
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return <Text>Loading...</Text>; // Show loading state
  }

  if (error) {
    return <Text>Error fetching data: {error}</Text>; // Show error state
  }

  const renderCategoryItem = ({ item }) => (
    <View key={item.id} style={styles.categoryCard}>
      <View style={styles.categoryImageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
        <Text style={styles.categoryInnerText}>{item.title}</Text> {/* Display category title */}
      </View>
    </View>
  );

  const ocbanners = [
    { id: '2', image: require('../../assets/images/banner.png') },
    { id: '3', image: require('../../assets/images/banner.png') },
  ];

  const renderPopularStoreItem = ({ item }) => (
    <TouchableOpacity
      style={styles.popularStoreCardSingle}
      onPress={() =>
        navigation.navigate('StoreOverviewPage', {
          storeId: item.id, // Pass store ID
          storeName: item.business_name,
          storeLocation: item.address,
          storeImage: item.logo,
          storeRating: item.rating,
        })
      }>
      <Image source={{ uri: item.logo }} style={styles.popularStoreImageSingle} />
      <View style={styles.popularStoreInfoSingle}>
        <Text style={styles.popularStoreNameSingle}>{item.business_name}</Text>
        <Text style={styles.popularStoreLocationSingle}>{item.address}</Text>
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
             <HeaderHome 
        userName="User"
        onProfilePress={() => navigation.navigate('ProfileScreen')}
        onCalendarPress={() => navigation.navigate('MyOccasionsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
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
{/* -- STORIES SECTION START -- */}
{/* -- STORIES SECTION START -- */}
<View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {storiesData.map((story) => (
              <TouchableOpacity
                key={story.id}
                style={styles.storyItem}
                onPress={() => handleStoryPress(story)}
              >
                <View style={styles.storyImageContainer}>
                  <Image source={story.image} style={styles.storyImage} />
                </View>
                <Text style={styles.storyText}>{story.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* -- STORIES SECTION END -- */}
          {/* -- STORIES SECTION END -- */}
          {/* Banner Section */}
          <View style={styles.bannerContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {ocbanners.map((banner) => (
                <Image key={banner.id} source={banner.image} style={styles.banner} />
              ))}
            </ScrollView>
          </View>
          {/* Categories Section */}
        
          {/* Occasions Section */}
          <View style={styles.categoriesContainer}>
            <View style={styles.categoriesHeader}>
              <Text style={styles.categoriesTitle}>Shop by Occasions</Text>
              <TouchableOpacity onPress={() => navigation.navigate('OccasionBannersPage')}>
                <Text style={styles.categoriesSeeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {banners.map((occasion) => (
                <View key={occasion.id} style={styles.bannerCard}>
                  <Image source={{ uri: occasion.imageUrl }} style={styles.Occasionbanner} />
                  <View style={styles.occasionoverlay}>
                    <Text style={styles.bannerText}>{occasion.title}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

 {/* Categories Section */}
 <View style={styles.categoriesContainer}>
  <View style={styles.categoriesHeader}>
    <Text style={styles.categoriesTitle}>Categories</Text>
    <TouchableOpacity onPress={() => navigation.navigate('CategoriesPage')}>
      <Text style={styles.categoriesSeeAll}>See all</Text>
    </TouchableOpacity>
  </View>
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScrollView}>
    {categories.map((item) => (
      <View key={item.id} style={styles.categoryCard}>
        <View style={styles.categoryImageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
        </View>
        <Text style={styles.categoryInnerText}>{item.title}</Text> {/* Display category title */}
      </View>
    ))}
  </ScrollView>
</View>

          {/* Popular Stores Section */}
          <View style={styles.popularStoresContainer}>
            <View style={styles.popularStoresHeader}>
              <Text style={styles.popularStoresTitle}>Stores</Text>
              <TouchableOpacity onPress={() => navigation.navigate('StoresPage')}>
                <Text style={styles.popularStoresSeeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            {loading ? (
              <Text>Loading stores...</Text>
            ) : error ? (
              <Text>Error fetching stores: {error}</Text>
            ) : (
              <FlatList
                data={stores}
                renderItem={renderPopularStoreItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
              />
            )}
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
  storiesContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  
  storyItem: {
    alignItems: 'center',
    marginRight: 15, // spacing between story circles
  },
  
  storyImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#F70082', // or any color for the "story ring"
  },
  storyImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  storyText: {
    marginTop: 4,
    fontSize: 10,
    color: '#000',
    fontFamily: 'DMSans-Regular',
    textAlign: 'center',
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
    // backgroundColor: 'rgba(0, 0, 0, 0)',
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
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
  },
  popularStoresSeeAll: {
    fontSize: 12,
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
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
  },
  categoriesSeeAll: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'DMSans-Light',
  },



  categoriesScrollView: {
    paddingVertical: 0, // Adds spacing vertically
  },

  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows wrapping to the next row
    justifyContent: 'space-between', // Ensures even horizontal spacing
    marginTop: 0,
    rowGap: 10, // Adds vertical spacing between rows
  },

  // Updated styles
categoryCard: {
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 15, // Adds space between each card horizontally
},

categoryImageContainer: {
  width: 60, // Circle width
  height: 60, // Circle height
  borderRadius: 30, // Makes it circular
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.secondary, // Optional background color
  overflow: 'hidden', // Ensures no content spills over
},

categoryImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover', // Ensures the image fits inside the circle
},

categoryInnerText: {
  marginTop: 5, // Adds space between the image and the text
  fontSize: 10,
  fontFamily: 'DMSans-Light',
  color: '#000', // Change to a color that contrasts with your background
  textAlign: 'center',
},

});

export default HomePage;
