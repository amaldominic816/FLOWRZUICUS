import React, { useState, useRef } from 'react';
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
import LinearGradient from 'react-native-linear-gradient'; // For gradient button
import HeaderInner from '../components/Headerinner';
import Colors from '../components/Colors';
import { launchImageLibrary } from 'react-native-image-picker';
import ButtonPrimary from '../components/ButtonPrimary';

const { height } = Dimensions.get('window'); // Get screen height

const StoreOverviewPage = ({ navigation }) => {
  const storeName = 'Yellow Roses';
  const location = '123 west 45th Street, Saudi Arab, Madinah';
  const rating = 4.9;
  const totalReviews = 73;

  // Define the categories as provided
  const categories = ['All', 'Flowers', 'Cakes', 'Gift Card', 'Envelop', 'Others'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const panY = useRef(new Animated.Value(height)).current; // Start off-screen

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        console.log('Image selected:', selectedImage);
        // Handle the selected image (e.g., display it or upload it)
      }
    });
  };

  const [isTyping, setIsTyping] = useState(false); // Track if typing in TextInput

  // Updated products array with a 'category' property and sample names
  const products = [
    {
      id: '1',
      name: 'Pink Tulips',
      price: '$130',
      image: require('../../assets/images/j1.png'),
      category: 'Flowers',
    },
    {
      id: '2',
      name: 'Yellow Tulips',
      price: '$150',
      image: require('../../assets/images/j1.png'),
      category: 'Flowers',
    },
    {
      id: '3',
      name: 'Chocolate Cake',
      price: '$200',
      image: require('../../assets/images/in4.png'),
      category: 'Cakes',
    },
    {
      id: '4',
      name: 'Vanilla Cake',
      price: '$220',
      image: require('../../assets/images/j3.png'),
      category: 'Cakes',
    },
    {
      id: '5',
      name: 'Birthday Gift Card',
      price: '$50',
      image: require('../../assets/images/in2.png'),
      category: 'Gift Card',
    },
    {
      id: '6',
      name: 'Anniversary Gift Card',
      price: '$60',
      image: require('../../assets/images/j1.png'),
      category: 'Gift Card',
    },
    {
      id: '7',
      name: 'Fancy Envelope',
      price: '$10',
      image: require('../../assets/images/j2.png'),
      category: 'Envelop',
    },
    {
      id: '8',
      name: 'Classic Envelope',
      price: '$12',
      image: require('../../assets/images/j3.png'),
      category: 'Envelop',
    },
    {
      id: '9',
      name: 'Exotic Bouquet',
      price: '$140',
      image: require('../../assets/images/in3.png'),
      category: 'Flowers',
    },
    {
      id: '10',
      name: 'Special Flowers',
      price: '$160',
      image: require('../../assets/images/j1.png'),
      category: 'Flowers',
    },
    {
      id: '11',
      name: 'Custom Order',
      price: '$180',
      image: require('../../assets/images/j3.png'),
      category: 'Others',
    },
    {
      id: '12',
      name: 'Unique Design',
      price: '$190',
      image: require('../../assets/images/j2.png'),
      category: 'Others',
    },
  ];

  // Filter products based on the active category. "All" shows every product.
  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory);

  const gradientColors = ['#DE8542', '#FE5993']; // Gradient colors for the button
  const [note, setNote] = useState('');

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !isTyping, // Disable gesture if typing
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
  });

  // Open Bottom Sheet
  const openBottomSheet = () => {
    setBottomSheetVisible(true);
    Animated.timing(panY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Close Bottom Sheet and dismiss keyboard
  const closeBottomSheet = () => {
    Keyboard.dismiss(); // Dismiss keyboard
    Animated.timing(panY, {
      toValue: height,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setBottomSheetVisible(false));
  };

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
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Image source={require('../../assets/images/star.png')} style={styles.icon} />
            <Text style={styles.ratingText}>
              {rating} ({totalReviews})
            </Text>
          </View>
        </View>

        {/* Horizontally Scrollable Categories Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setActiveCategory(category)}
              style={styles.tabButton}
            >
              <Text
                style={[
                  styles.tabText,
                  activeCategory === category && styles.activeTabText,
                ]}
              >
                {category}
              </Text>
              {activeCategory === category && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products Grid (filtered based on category) */}
        <FlatList
  data={filteredProducts}
  numColumns={2}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductOverview')}
    >
      {/* Image & Wishlist Button */}
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.wishlistButton}>
          <Image
            source={require('../../assets/images/favourite.png')}
            style={styles.wishlistIcon}
          />
        </TouchableOpacity>
        <Image source={item.image} style={styles.productImage} />
      </View>

      {/* Product Name & Price */}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>

      {/* Plus Button */}
      <TouchableOpacity style={styles.plusButton} onPress={() => {/* handle plus press */}}>
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )}
  contentContainerStyle={styles.flatListContent}
/>

      </ScrollView>

      {/* Floating Button with Gradient */}
      <View style={styles.floatingButtonContainer}>
        <ButtonPrimary
          buttonText="Customize Order"
          onPress={openBottomSheet}
          buttonWidth={Dimensions.get('window').width * 0.5}
          buttonHeight={40}
          fontSize={16}
          gradientColors={gradientColors}
        />
      </View>

      {/* Bottom Sheet */}
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
                onFocus={() => setIsTyping(true)} // Disable gesture while typing
                onBlur={() => setIsTyping(false)} // Re-enable gesture when done typing
                onChangeText={(text) => setNote(text)}
              />

              <TouchableOpacity style={styles.uploadContainer} onPress={selectImage}>
                <LinearGradient colors={['#ffe5e7', '#ffe5e7']} style={styles.gradientBackground}>
                  <Image source={require('../../assets/images/upload-img.png')} style={styles.uploadIcon} />
                  <Text style={styles.uploadText}>Click To Upload     </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.buttonWrapper}>
                <ButtonPrimary
                  buttonText="Send my Order"
                  onPress={() => navigation.navigate('CartPage')}
                  buttonWidth={Dimensions.get('window').width * 0.7}
                  buttonHeight={40}
                  fontSize={18}
                  gradientColors={gradientColors}
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
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
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
  // Updated container style for the tabs
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
    position: 'relative', // important for absolutely-positioned children
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
    alignItems: 'flex-start', // Align content to the left
  },
  productName: {
    fontSize: 10,
    fontFamily: 'DMSans-Bold',
    alignContent:'space-between',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
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
    borderRadius: 15,    // half of 40 -> perfectly round
    backgroundColor: '#FE5993',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    color: '#fff',
    fontSize:20
    ,        // reduce if you want more padding
    textAlign: 'center', // ensure horizontal centering
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
