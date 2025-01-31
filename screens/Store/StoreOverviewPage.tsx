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
  const [activeTab, setActiveTab] = useState('Products');
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

  const products = [
    { id: '1', name: 'Pink Tulips', price: '$130', image: require('../../assets/images/j1.png'), isNew: true },
    { id: '2', name: 'Yellow Tulips', price: '$150', image: require('../../assets/images/j1.png'), isNew: true },
    { id: '3', name: 'Pink Tulips', price: '$130', image: require('../../assets/images/in4.png'), isNew: false },
    { id: '4', name: 'Yellow Tulips', price: '$150', image: require('../../assets/images/j3.png'), isNew: true },
    { id: '5', name: 'Pink Tulips', price: '$130', image: require('../../assets/images/in2.png'), isNew: false },
    { id: '6', name: 'Yellow Tulips', price: '$150', image: require('../../assets/images/j1.png'), isNew: true },
    { id: '7', name: 'Pink Tulips', price: '$130', image: require('../../assets/images/j2.png'), isNew: false },
    { id: '8', name: 'Yellow Tulips', price: '$150', image: require('../../assets/images/j3.png'), isNew: true },
    { id: '9', name: 'Pink Tulips', price: '$130', image: require('../../assets/images/in3.png'), isNew: false },
    { id: '10', name: 'Yellow Tulips', price: '$150', image: require('../../assets/images/j1.png'), isNew: true },
    { id: '11', name: 'Yellow Tulips', price: '$150', image: require('../../assets/images/j3.png'), isNew: true },
    { id: '12', name: 'Pink Tulips', price: '$130', image: require('../../assets/images/j2.png'), isNew: false },
  ];

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
          useNativeDriver: false, // Changed to false
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
      useNativeDriver: false, // Changed to false
    }).start();
  };

  // Close Bottom Sheet and dismiss keyboard
  const closeBottomSheet = () => {
    Keyboard.dismiss(); // Dismiss keyboard
    Animated.timing(panY, {
      toValue: height,
      duration: 300,
      useNativeDriver: false, // Changed to false
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
            <Text style={styles.ratingText}>{rating} ({totalReviews})</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          {['Products', 'Contact'].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabButton}>
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              {activeTab === tab && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'Products' && (
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() => navigation.navigate('ProductOverview')}
              >
                <View style={styles.imageContainer}>
                  {item.isNew && <View style={styles.newTag}><Text style={styles.newText}>New</Text></View>}
                  <TouchableOpacity style={styles.wishlistButton}>
                    <Image source={require('../../assets/images/favourite.png')} style={styles.wishlistIcon} />
                  </TouchableOpacity>
                  <Image source={item.image} style={styles.productImage} />
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </ScrollView>

      {/* Floating Button with Gradient */}
      <TouchableOpacity onPress={openBottomSheet} style={styles.floatingButton}>
        <LinearGradient
          colors={gradientColors}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.floatingButtonText}>Customize Order</Text>
        </LinearGradient>
      </TouchableOpacity>

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
  onFocus={() => setIsTyping(true)}  // Disable gesture while typing
  onBlur={() => setIsTyping(false)}   // Re-enable gesture when done typing
  onChangeText={(text) => setNote(text)}
/>

        <TouchableOpacity style={styles.uploadContainer} onPress={selectImage}>
          <LinearGradient colors={['#ffe5e7', '#ffe5e7']} style={styles.gradientBackground}>
            <Image source={require('../../assets/images/upload-img.png')} style={styles.uploadIcon} />
            <Text style={styles.uploadText}>Click To Upload Or Drag And Drop</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.buttonWrapper}>
  <ButtonPrimary
    buttonText="Send my Order"
    onPress={() => navigation.navigate('CartPage')}
    buttonWidth={Dimensions.get('window').width * 0.7}
    buttonHeight={40}
    fontSize={18}
    gradientColors={['#DE8542', '#FE5993']} // Optional custom gradient
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
  storeInfoContainer: {
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  tabButton: {
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
    position: 'relative',
    shadowColor: '#000',
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
  newTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.Gradient2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    zIndex: 1,
  },
  newText: {
    fontSize: 12,
    fontFamily: 'DMSans-Bold',
    color: '#fff',
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
    alignItems: 'center',
    marginTop: 10,
  },
  productName: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'DMSans-SemiBold',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: 10, // Reduced size
    overflow: 'hidden', // Ensure gradient doesn't overflow
  },
  gradient: {
    paddingVertical: 12, // Reduced size
    paddingHorizontal: 24, // Reduced size
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 14, // Reduced font size
    fontFamily: 'DMSans-Bold',
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
    transform: [{ translateX: -Dimensions.get('window').width * 0.4 }], // Center the button horizontally
    alignItems: 'center',
  },

});

export default StoreOverviewPage;
