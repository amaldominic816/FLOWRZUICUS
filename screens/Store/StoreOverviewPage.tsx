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
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';

import HeaderInner from '../components/Headerinner';
import Colors from '../components/Colors';
import ButtonPrimary from '../components/ButtonPrimary';

import {
  fetchProductsByStoreId,
} from '../redux/slices/productsSlice';
import {
  fetchCategories,
} from '../redux/slices/categoriesSlice';
import {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  fetchCart,
} from '../redux/slices/cartSlice';
import HeaderinnerStore from '../components/Headerinnerstore';

const { height, width } = Dimensions.get('window');

const StoreOverviewPage = ({ route, navigation }) => {
  const { storeId, storeName, storeLocation, storeImage, storeRating } = route.params;

  const dispatch = useDispatch();

  // Redux state
  const { products, loading: loadingProducts, error: errorProducts } = useSelector(
    (state) => state.products
  );
  const { categories, loading: loadingCategories, error: errorCategories } = useSelector(
    (state) => state.categories
  );
  const { cart, loading: loadingCart, error: errorCart } = useSelector((state) => state.cart);

  const cartItems = cart?.items ?? [];
  const cartCount = cartItems.length;

  // Category filter
  const [activeCategory, setActiveCategory] = useState('All');

  // Bottom sheet for "Customize Order"
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const panY = useRef(new Animated.Value(height)).current;
  const [note, setNote] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Bottom sheet for category list
  const [isCategorySheetVisible, setCategorySheetVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByStoreId(storeId));
    dispatch(fetchCategories());
    dispatch(fetchCart());
  }, [dispatch, storeId]);

  // Filtered products by active category
  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category_name === activeCategory);

  // --- Bottom Sheet (Customize Order) ---
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

  // --- Bottom Sheet (Categories) ---
  const openCategorySheet = () => {
    setCategorySheetVisible(true);
  };

  const closeCategorySheet = () => {
    setCategorySheetVisible(false);
  };

  // Image picker for the "Customize Order" bottom sheet
  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        console.log('Image selected:', selectedImage);
      }
    });
  };

  // Cart operations
  const handleAddToCart = async (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.product === item.id);
    if (existingItem) {
      dispatch(increaseQuantity(existingItem.id));
    } else if (cart && cart.id) {
      const payload = {
        cartId: cart.id,
        productId: item.id,
        quantity: 1,
      };
      await dispatch(addItem(payload));
    }
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemove = (itemId) => {
    dispatch(removeItem({ cartId: cart.id, itemId }));
  };

  const isItemInCart = (id) => {
    return cartItems.some((cartItem) => cartItem.product === id);
  };

  if (loadingProducts || loadingCategories || (!cart && loadingCart)) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }
  if (errorProducts) {
    return <Text style={styles.errorText}>Error fetching products: {errorProducts}</Text>;
  }
  if (errorCategories) {
    return <Text style={styles.errorText}>Error fetching categories: {errorCategories}</Text>;
  }
  if (errorCart) {
    return <Text style={styles.errorText}>Error fetching cart: {errorCart}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <HeaderinnerStore
        title="Vendor Overview"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Banner with store info */}
        <ImageBackground
source={
  storeImage
    ? { uri: storeImage }
    : require('../../assets/images/flower.png')
}
style={styles.headerBackground}
>
<View style={styles.overlay}>
  <Image
    source={require('../../assets/images/ocbg1.jpg')}
    style={styles.logo}
  />
  <View style={styles.storeDetailsContainer}>
    <Text style={styles.storeName}>{storeName}</Text>
    <Text style={styles.storeLocation}>{storeLocation}</Text>
    <View style={styles.ratingRow}>
      <Image
        source={require('../../assets/images/star.png')}
        style={styles.starIcon}
      />
      <Text style={styles.ratingText}>
        {storeRating} ({storeRating})
      </Text>
    </View>
  </View>
</View>
</ImageBackground>


        {/* Row: Open now / Distance / Rating */}
        <View style={styles.storeStatusRow}>
          <View style={styles.storeStatusItem}>
            <Text style={styles.statusLabelOpen}>Open now</Text>
            <Text style={styles.statusValue}>02:00 AM</Text>
          </View>
          <View style={styles.storeStatusItem}>
            <Text style={styles.statusLabel}>Distance</Text>
            <Text style={styles.statusValue}>1.5 km</Text>
          </View>
          <View style={styles.storeStatusItem}>
            <Text style={styles.statusLabel}>Rating</Text>
            <Text style={styles.statusValue}>4.4 (1500)</Text>
          </View>
        </View>

        {/* Categories Row (first item is icon -> opens bottom sheet) */}
        <View style={styles.categoriesRow}>
          <TouchableOpacity style={styles.categoryIconContainer} onPress={openCategorySheet}>
            <Image
              source={require('../../assets/images/grid-icon.png')} // your grid icon asset
              style={styles.categoryIcon}
            />
          </TouchableOpacity>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
          >
            {/* "All" Category */}
            <TouchableOpacity onPress={() => setActiveCategory('All')} style={styles.categoryButton}>
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === 'All' && styles.activeCategoryText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>

            {/* Other categories */}
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setActiveCategory(category.title)}
                style={styles.categoryButton}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === category.title && styles.activeCategoryText,
                  ]}
                >
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Grid */}
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const itemInCart = isItemInCart(item.id);
            const cartItem = cartItems.find((cartItem) => cartItem.product === item.id);
            const itemQuantity = itemInCart && cartItem ? cartItem.quantity : 0;
            const price =
              typeof item.price === 'number'
                ? item.price
                : parseFloat(item.price) || 0;

            return (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate('ProductOverview', {
                    product: item,
                  })
                }
              >
                <View style={styles.imageContainer}>
                  <TouchableOpacity style={styles.wishlistButton}>
                    <Image
                      source={require('../../assets/images/favourite.png')}
                      style={styles.wishlistIcon}
                    />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                  />
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.title}</Text>
                  <Text style={styles.productPrice}>AED {price.toFixed(2)}</Text>
                </View>

                {/* Cart Buttons */}
                {itemInCart ? (
                  <View style={styles.quantityControls}>
                    {cartItem.quantity > 1 ? (
                      <TouchableOpacity
                        onPress={() => handleDecrease(cartItem.id)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityText}>-</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => handleRemove(cartItem.id)}
                        style={styles.quantityButton}
                      >
                        <Image
                          source={require('../../assets/images/delete.png')}
                          style={styles.deleteIcon}
                        />
                      </TouchableOpacity>
                    )}
                    <Text style={styles.quantity}>{itemQuantity}</Text>
                    <TouchableOpacity
                      onPress={() => handleIncrease(cartItem.id)}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.plusButton}
                    onPress={() => handleAddToCart(item)}
                  >
                    <Text style={styles.plusIcon}>+</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.flatListContent}
        />
      </ScrollView>

      {/* Floating "Customize Order" Button */}
      <View style={[styles.floatingButtonContainer, { bottom: cartCount > 0 ? 80 : 20 }]}>
        <ButtonPrimary
          buttonText="Customize Order"
          onPress={openBottomSheet}
          buttonWidth={width * 0.5}
          buttonHeight={40}
          fontSize={16}
          gradientColors={['#DE8542', '#FE5993']}
        />
      </View>

      {/* Cart summary strip at bottom if items in cart */}
      {cartCount > 0 && (
        <LinearGradient
          colors={['#DE8542', '#FE5993']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.cartSummaryBottomSheet}
        >
          <Text style={styles.cartSummaryText}>
            {cartCount === 1 ? '1 Item Added' : `${cartCount} Items Added`}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CartPage')}>
            <Text style={styles.cartSummaryText}>View Cart &gt;</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}

      {/* Bottom Sheet for Customize Order */}
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

            <ScrollView
              contentContainerStyle={styles.bottomSheetContent}
              keyboardShouldPersistTaps="handled"
            >
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
                <LinearGradient
                  colors={['#ffe5e7', '#ffe5e7']}
                  style={styles.gradientBackground}
                >
                  <Image
                    source={require('../../assets/images/upload-img.png')}
                    style={styles.uploadIcon}
                  />
                  <Text style={styles.uploadText}>Click To Upload</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.buttonWrapper}>
                <ButtonPrimary
                  buttonText="Send my Order"
                  onPress={() => {
                    closeBottomSheet();
                    navigation.navigate('CartPage');
                  }}
                  buttonWidth={width * 0.7}
                  buttonHeight={40}
                  fontSize={18}
                  gradientColors={['#DE8542', '#FE5993']}
                />
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>

      {/* Bottom Sheet for Category List */}
      <Modal
        transparent
        visible={isCategorySheetVisible}
        onRequestClose={closeCategorySheet}
        animationType="slide"
      >
        <View style={styles.bottomSheetOverlay}>
          <View style={styles.categoryBottomSheet}>
            <Text style={styles.categorySheetTitle}>All Categories</Text>
            <ScrollView>
              {/* “All” option */}
              <TouchableOpacity
                style={styles.categorySheetItem}
                onPress={() => {
                  setActiveCategory('All');
                  closeCategorySheet();
                }}
              >
                <Text style={styles.categorySheetItemText}>All</Text>
              </TouchableOpacity>

              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.categorySheetItem}
                  onPress={() => {
                    setActiveCategory(cat.title);
                    closeCategorySheet();
                  }}
                >
                  <Text style={styles.categorySheetItemText}>{cat.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={closeCategorySheet} style={styles.categoryCloseButton}>
              <Text style={styles.categoryCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 110,
  },

  // Loading / Error
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
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
    resizeMode: 'cover',
    borderRadius:20,
  },
  // Container for store details
  storeDetailsContainer: {
    flex: 1,
  },
  // Top banner
  headerBackground: {
    width: '100%',
    height: 180,
    justifyContent: 'flex-end',
  },
  overlay: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    
  },
  storeName: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    color: '#000',
    marginBottom: 5,
  },
  storeLocation: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#000',
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
    tintColor: '#FFD700',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#000',
  },

  // Store status row (Open now / Distance / Rating)
  storeStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginTop: -15, // pull up over the banner
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
  },
  storeStatusItem: {
    alignItems: 'center',
  },
  statusLabelOpen: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    color: 'green',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 14,
    fontFamily: 'DMSans-SemiBold',
    color: '#444',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: '#666',
  },

  // Categories Row (with grid icon)
  categoriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    elevation: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryButton: {
    marginRight: 15,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'DMSans-SemiBold',
  },
  activeCategoryText: {
    color: '#FE5993',
    fontFamily: 'DMSans-Bold',
  },

  // Product cards
  productCard: {
    width: '45%',
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  wishlistButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 15,
    elevation: 3,
    zIndex: 1,
  },
  wishlistIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  productInfo: {
    alignSelf: 'flex-start',
  },
  productName: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'DMSans-SemiBold',
  },
  flatListContent: {
    paddingBottom: 20,
  },

  // Plus/Quantity buttons
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
    marginTop: 5,
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
    fontFamily: 'DMSans-Bold',
  },
  deleteIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },

  // Floating "Customize Order" button
  floatingButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 999,
  },

  // Cart summary at bottom
  cartSummaryBottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  cartSummaryText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
  },

  // Bottom Sheet (Customize Order)
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
    marginBottom: 20,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  uploadIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    tintColor: '#DE6070',
    resizeMode: 'contain',
  },
  uploadText: {
    fontSize: 14,
    color: '#DE6070',
    fontFamily: 'DMSans-SemiBold',
    textAlign: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
  },

  // Bottom Sheet (Category List)
  categoryBottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.6,
    padding: 20,
    alignItems: 'stretch',
  },
  categorySheetTitle: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    marginBottom: 10,
  },
  categorySheetItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categorySheetItemText: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
  },
  categoryCloseButton: {
    marginTop: 15,
    alignSelf: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  categoryCloseButtonText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'DMSans-SemiBold',
  },
});

export default StoreOverviewPage;
