// src/screens/StoreOverviewPage.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  Animated,
  PanResponder,
  Dimensions,
  TextInput,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderInner from '../components/Headerinner';
import Colors from '../components/Colors';
import { launchImageLibrary } from 'react-native-image-picker';
import ButtonPrimary from '../components/ButtonPrimary';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsByStoreId,
} from '../redux/slices/productsSlice';
import { fetchCategories } from '../redux/slices/categoriesSlice';
import {
  addItemToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from '../redux/slices/cartSlice';
import { fetchCartItems } from '../redux/slices/showCartSlice';

const { height } = Dimensions.get('window');

const StoreOverviewPage = ({ route, navigation }) => {
  const { storeId, storeName, storeLocation, storeImage, storeRating } = route.params;
  const dispatch = useDispatch();
  const { products, loading: loadingProducts, error: errorProducts } = useSelector((state) => state.products);
  const { categories, loading: loadingCategories, error: errorCategories } = useSelector((state) => state.categories);
  const { items: cartItems } = useSelector((state) => state.showCart); // Fetching from showCartSlice
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const panY = useRef(new Animated.Value(height)).current;
  const [note, setNote] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByStoreId(storeId));
    dispatch(fetchCategories());
    dispatch(fetchCartItems()); // Fetch cart items when the component mounts
  }, [dispatch, storeId]);

  const filteredProducts = activeCategory === 'All' ? products : products.filter((product) => product.category_name === activeCategory);

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
    Animated.timing(panY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeBottomSheet = () => {
    Keyboard.dismiss();
    Animated.timing(panY, {
      toValue: height,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setBottomSheetVisible(false));
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !isTyping,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeBottomSheet();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        console.log('Image selected:', selectedImage);
      }
    });
  };

  const handleAddToCart = async (item) => {
    const existingItem = cartItems.flatMap(cartItem => cartItem.items).find(cartItem => cartItem.product === item.id);
  
    if (existingItem) {
      dispatch(increaseItemQuantity(existingItem.id)); // Use existing item ID
    } else {
      const newItem = {
        product: item.id,
        quantity: 1,
      };
      await dispatch(addItemToCart(newItem));
    }
  
    console.log('Current Cart Items:', cartItems);
  };

  const handleIncrease = (id) => {
    dispatch(increaseItemQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseItemQuantity(id));
  };

  // Function to check if an item is in the cart
  const isItemInCart = (id) => {
    // Ensure cartItems is defined and is an array
    if (!Array.isArray(cartItems)) {
      console.warn('cartItems is not an array:', cartItems);
      return false;
    }
  
    // Check if any item in the cart matches the product ID
    return cartItems.some(item => item.product === id);
  };

  // Loading and error states
  if (loadingProducts || loadingCategories) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (errorProducts) {
    return <Text style={styles.errorText}>Error fetching products: {errorProducts}</Text>;
  }

  if (errorCategories) {
    return <Text style={styles.errorText}>Error fetching categories: {errorCategories}</Text>;
  }

  return (
    <View style={styles.container}>
      <HeaderInner
        title="Vendor Overview"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.storeInfoContainer}>
          <Text style={styles.storeName}>{storeName}</Text>
          <View style={styles.locationContainer}>
            <Image source={require('../../assets/images/location.png')} style={styles.icon} />
            <Text style={styles.locationText}>{storeLocation}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Image source={require('../../assets/images/star.png')} style={styles.icon} />
            <Text style={styles.ratingText}>{storeRating} ({storeRating})</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveCategory('All')} style={styles.tabButton}>
            <Text style={[styles.tabText, activeCategory === 'All' && styles.activeTabText]}>All</Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setActiveCategory(category.title)}
              style={styles.tabButton}
            >
              <Text
                style={[
                  styles.tabText,
                  activeCategory === category.title && styles.activeTabText,
                ]}
              >
                {category.title}
              </Text>
              {activeCategory === category.title && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>


<FlatList
  data={filteredProducts}
  numColumns={2}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => {
    const itemInCart = isItemInCart(item.id); // Check if the item is in the cart

    // Find the cart item
    const cartItem = cartItems.find(cartItem => cartItem.product === item.id);

    // Safeguard against undefined cartItem
    const itemQuantity = itemInCart && cartItem ? cartItem.quantity : 0; // Get the quantity if the item is in the cart

    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0; // Ensure price is a number

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => navigation.navigate('ProductOverview', {
          id: item.id,
          name: item.title,
          price: price,
          image: item.image,
        })}
      >
        <View style={styles.imageContainer}>
          {/* Wishlist button and product image */}
          <TouchableOpacity style={styles.wishlistButton}>
            <Image source={require('../../assets/images/favourite.png')} style={styles.wishlistIcon} />
          </TouchableOpacity>
          <Image source={{ uri: item.image }} style={styles.productImage} />
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.title}</Text>
          <Text style={styles.productPrice}>AED {price.toFixed(2)}</Text>
        </View>

        {/* Conditional Rendering */}
        {itemInCart ? (
          // Quantity Controls
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={() => handleDecrease(cartItem.id)} style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{itemQuantity}</Text>
            <TouchableOpacity onPress={() => handleIncrease(cartItem.id)} style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Plus Button
          <TouchableOpacity style={styles.plusButton} onPress={() => handleAddToCart(item)}>
            <Text style={styles.plusIcon}>+</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }}
  contentContainerStyle={styles.flatListContent}
/>
      </ScrollView>

      <View style={styles.floatingButtonContainer}>
        <ButtonPrimary
          buttonText="Customize Order"
          onPress={openBottomSheet}
          buttonWidth={Dimensions.get('window').width * 0.5}
          buttonHeight={40}
          fontSize={16}
          gradientColors={['#DE8542', '#FE5993']}
        />
      </View>

      <Modal
        transparent
        visible={isBottomSheetVisible}
        onRequestClose={closeBottomSheet}
        animationType="none"
      >
        <View style={styles.bottomSheetOverlay} pointerEvents="box-none">
          <Animated.View
            style={[
              styles.bottomSheet,
              {
                transform: [{ translateY: panY }],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Customize Order</Text>
              <TouchableOpacity onPress={closeBottomSheet}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.bottomSheetContent} keyboardShouldPersistTaps="handled">
              <TextInput
                style={styles.noteInput}
                placeholder="Add a few notes to help you later"
                placeholderTextColor="#999"
                multiline
                value={note}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                onChangeText={setNote}
              />

              <TouchableOpacity style={styles.uploadContainer} onPress={selectImage}>
                <LinearGradient colors={['#ffe5e7', '#ffe5e7']} style={styles.gradientBackground}>
                  <Image source={require('../../assets/images/upload-img.png')} style={styles.uploadIcon} />
                  <Text style={styles.uploadText}>Click To Upload</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.buttonWrapper}>
                <ButtonPrimary
                  buttonText="Send my Order"
                  onPress={() => navigation.navigate('CartPage')}
                  buttonWidth={Dimensions.get('window').width * 0.7}
                  buttonHeight={40}
                  fontSize={18}
                  gradientColors={['#DE8542', '#FE5993']}
                />
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  storeInfoContainer: {
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowRadius: 4,
    marginTop: 10,
  },
  storeName: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#666',
    fontFamily: 'DMSans-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#666',
    fontFamily: 'DMSans-Regular',
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  loadingText: {
    fontSize: 20, 
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tabButton: {
    marginRight: 15,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'DMSans-SemiBold',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#FF5733',
    fontFamily: 'DMSans-Bold',
  },
  activeIndicator: {
    height: 3,
    width: '100%',
    backgroundColor: '#FF5733',
    marginTop: 5,
  },
  productCard: {
    width: '45%',
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#E3D0CCFF',
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
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
  wishlistIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  productInfo: {
    width: '100%',
    marginTop: 10,
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
  },
  productPrice: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'DMSans-SemiBold',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  plusButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FE5993',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'DMSans-Bold',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  bottomSheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    height: height * 0.6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 16,
    color: '#FF5733',
    fontFamily: 'DMSans-SemiBold',
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  noteInput: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    color: '#333',
    height: 125,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#f9c9d9',
    borderRadius: 10,
    overflow: 'hidden',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe5e7',
  },
  uploadIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    tintColor: '#DE6070',
  },
  uploadText: {
    fontSize: 14,
    color: '#DE6070',
    fontFamily: 'DMSans-SemiBold',
    textAlign: 'center',
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: '58%',
    transform: [{ translateX: -Dimensions.get('window').width * 0.4 }],
    alignItems: 'center',
  },
});

export default StoreOverviewPage;