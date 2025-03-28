import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import SearchInner from '../../screens/components/SearchInner';
import { fetchProducts } from '../redux/slices/searchSlice'; // adjust path as needed

const { height } = Dimensions.get('window');

const SearchProducts = ({ route, navigation }) => {
  const initialQuery = route.params?.query || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.search);
  
  // Declare filter state only once
  const [isFilterSheetVisible, setFilterSheetVisible] = useState(false);
  const [activeFilterCategory, setActiveFilterCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});

  // Fetch products when the query changes
  useEffect(() => {
    dispatch(fetchProducts(searchQuery));
  }, [dispatch, searchQuery]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  // Debug Redux state if needed
  const state = useSelector((state) => state);
  console.log('Redux state:', state);

  const filterOptions = {
    Color: [
      { id: '1', name: 'Rose', count: 10 },
      { id: '2', name: 'Pink', count: 5 },
      { id: '3', name: 'Yellow', count: 7 },
    ],
    Occasion: [
      { id: '1', name: 'Wedding', count: 8 },
      { id: '2', name: 'Birthday', count: 12 },
      { id: '3', name: 'Anniversary', count: 4 },
    ],
    Category: [
      { id: '1', name: 'Bouquet', count: 6 },
      { id: '2', name: 'Arrangement', count: 9 },
      { id: '3', name: 'Bunch', count: 11 },
    ],
    Price: [
      { id: '1', name: 'Under $50', count: 3 },
      { id: '2', name: '$50-$100', count: 7 },
      { id: '3', name: 'Over $100', count: 5 },
    ],
  };

  const handleToggleFilterCategory = (category) => {
    setActiveFilterCategory(activeFilterCategory === category ? null : category);
  };

  const handleSelectFilter = (category, optionId) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category] === optionId ? null : optionId,
    }));
  };

  const closeFilterSheet = () => {
    setFilterSheetVisible(false);
    setActiveFilterCategory(null);
  };

  return (
    <View style={styles.container}>
      <SearchInner
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onSearch={handleSearch}
        showCartIcon={true}
        showNotificationIcon={true}
        onCartPress={() => navigation.navigate('CartPage')}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
      />
      <Text style={styles.searchResultsText}>
        Results for: "{searchQuery}"
      </Text>
      {loading && <Text style={styles.statusText}>Loading...</Text>}
      {error && <Text style={styles.statusText}>Error: {error}</Text>}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductOverview', { product: item })}
          >
            <View style={styles.imageContainer}>
              {Number(item.rating) >= 4 && (
                <View style={styles.newTag}>
                  <Text style={styles.newText}>New</Text>
                </View>
              )}
              <TouchableOpacity style={styles.wishlistButton}>
                <Image
                  source={require('../../assets/images/favourite.png')}
                  style={styles.wishlistIcon}
                />
              </TouchableOpacity>
              <Image
                source={{ uri: item.image_url }}
                style={styles.productImage}
              />
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.title_translated}</Text>
              <Text style={styles.vendorName}>By: {item.vendor_name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.filterFloatingButton}
        onPress={() => setFilterSheetVisible(true)}
      >
        <LinearGradient
          colors={['#DE8542', '#FE5993']}
          style={styles.filterGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.filterFloatingButtonText}>Filter</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Modal
        transparent
        visible={isFilterSheetVisible}
        animationType="slide"
        onRequestClose={closeFilterSheet}
      >
        <View style={styles.filterBottomSheetOverlay}>
          <View style={styles.filterBottomSheet}>
            <View style={styles.filterBottomSheetHeader}>
              <Text style={styles.filterBottomSheetTitle}>Filter Options</Text>
              <TouchableOpacity onPress={closeFilterSheet}>
                <Text style={styles.filterCloseButton}>Close</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {Object.keys(filterOptions).map((category) => (
                <View key={category}>
                  <TouchableOpacity
                    style={styles.filterCategory}
                    onPress={() => handleToggleFilterCategory(category)}
                  >
                    <Text style={styles.filterCategoryText}>{category}</Text>
                  </TouchableOpacity>
                  {activeFilterCategory === category && (
                    <View style={styles.filterOptionsList}>
                      {filterOptions[category].map((option) => (
                        <TouchableOpacity
                          key={option.id}
                          style={[
                            styles.filterOptionItem,
                            selectedFilters[category] === option.id &&
                              styles.selectedFilterOption,
                          ]}
                          onPress={() => handleSelectFilter(category, option.id)}
                        >
                          <Text style={styles.filterOptionText}>
                            {option.name} ({option.count})
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.applyFilterButton}
              onPress={closeFilterSheet}
            >
              <Text style={styles.applyFilterButtonText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchResultsText: { fontSize: 16, padding: 10, color: '#333' },
  statusText: { textAlign: 'center', marginVertical: 10 },
  flatListContent: { paddingBottom: 100 },
  productCard: {
    width: '45%',
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  newTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FE5993',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    zIndex: 1,
  },
  newText: { fontSize: 12, fontWeight: 'bold', color: '#fff' },
  wishlistButton: {
    position: 'absolute',
    top: 5,
    right: 2,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 15,
    elevation: 3,
    zIndex: 1,
  },
  wishlistIcon: { width: 20, height: 20, resizeMode: 'contain' },
  productInfo: { alignItems: 'center', marginTop: 10 },
  productName: { fontSize: 16, fontWeight: 'bold' },
  vendorName: { fontSize: 12, color: '#555', marginTop: 2 },
  productPrice: { fontSize: 14, color: '#666', fontWeight: '600' },
  filterFloatingButton: { position: 'absolute', bottom: 20, alignSelf: 'center' },
  filterGradient: {
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 5,
  },
  filterFloatingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filterBottomSheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  filterBottomSheet: {
    height: height * 0.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  filterBottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterBottomSheetTitle: { fontSize: 18, fontWeight: 'bold' },
  filterCloseButton: { fontSize: 16, color: '#FF5733' },
  filterCategory: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  filterCategoryText: { fontSize: 16, fontWeight: 'bold' },
  filterOptionsList: { marginLeft: 20, marginTop: 8 },
  filterOptionItem: { paddingVertical: 8 },
  filterOptionText: { fontSize: 14, color: '#333' },
  selectedFilterOption: { backgroundColor: '#ffe5e7', borderRadius: 5 },
  applyFilterButton: {
    marginTop: 20,
    backgroundColor: '#FE5993',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyFilterButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default SearchProducts;
