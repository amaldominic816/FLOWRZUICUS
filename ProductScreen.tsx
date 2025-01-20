import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
const screenWidth = Dimensions.get('window').width;
const ProductOverview = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton2}>
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Path
              d="M15 19l-7-7 7-7"
              stroke="#000"
              strokeWidth="2"
              fill="none"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerText}>Product Overview</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('./assets/images/cart.png')}
              style={styles.headerIconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('./assets/images/notification.png')}
              style={styles.headerIconImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Product Image */}
        <Image
          source={require('./assets/images/item-test.png')}
          style={styles.productImage}
        />

        {/* Product Details */}
        <View style={styles.detailsBox}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsTextContainer}>
              <Text style={styles.productName}>Yellow Tulips</Text>
              <Text style={styles.price}>$40</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={handleDecrease}
                style={styles.quantityButton}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity
                onPress={handleIncrease}
                style={styles.quantityButton}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Includes Section */}
        <View style={styles.includes}>
          <Text style={styles.sectionTitle}>Includes</Text>
          <View style={styles.includesImagesContainer}>
            <Image
              source={require('./assets/images/in1.png')}
              style={styles.includesImage}
            />
            <Image
              source={require('./assets/images/in2.png')}
              style={styles.includesImage}
            />
            <Image
              source={require('./assets/images/in3.png')}
              style={styles.includesImage}
            />
            <Image
              source={require('./assets/images/in4.png')}
              style={styles.includesImage}
            />
          </View>
        </View>

        {/* Tabs Section */}
        <View style={styles.tabContentBox}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'description' && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab('description')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'description' && styles.activeTabText,
                ]}>
                Description
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'cardTips' && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab('cardTips')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'cardTips' && styles.activeTabText,
                ]}>
                Card Tips
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'description' && (
            <Text style={styles.description}>
              Our collection of floral products is carefully curated to bring
              beauty, joy, and freshness to every moment. From vibrant bouquets
              to elegant arrangements, each product is crafted with precision
              and love.
            </Text>
          )}
          {activeTab === 'cardTips' && (
            <Text style={styles.description}>
              Our collection of floral products is carefully curated to bring
              beauty, joy, and freshness to every moment. From vibrant bouquets
              to elegant arrangements, each product is crafted with precision
              and love.
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footerButtons}>
       <TouchableOpacity onPress={() => navigation.navigate('RegistrationPage')}>
                       <LinearGradient
                           colors={['#DE8542', '#FE5993']} // Gradient colors
                           start={{ x: 0, y: 0 }} // Start of the gradient
                           end={{ x: 1, y: 0 }} // End of the gradient
                           style={[styles.addToCartButton, { width: screenWidth * 0.7 }]} // Set the width to 80% of screen width
                       >
                           <Text style={styles.buttonText}>ADD TO CART</Text>
                       </LinearGradient>
                   </TouchableOpacity>
        <View style={styles.buttonGap} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#FF6F61"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerIcons: {flexDirection: 'row'},
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  iconButton2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE0C4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 8,
  },

  headerText: {fontSize: 18, fontWeight: 'bold'},
  content: {padding: 16},
  productImage: {
    width: '80%',
    height: undefined,
    aspectRatio: 1.2, // Maintain the aspect ratio
    borderRadius: 20,
    alignSelf: 'center',
    resizeMode: 'contain', // Ensures the full image is displayed without cropping
  },
  detailsBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
  },

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {fontSize: 20, fontWeight: 'bold'},
  price: {fontSize: 18, color: '#000', marginTop: 4},
  quantityContainer: {flexDirection: 'row', alignItems: 'center'},
  quantityButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 8,
  },
  quantityText: {fontSize: 18},
  includes: {marginTop: 24},
  sectionTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 8},
  includesImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  includesImage: {width: 70, height: 70, borderRadius: 10},
  tabContentBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  tabButton: {flex: 1, alignItems: 'center', padding: 12},
  tabText: {color: '#777'},
  activeTabButton: {borderBottomWidth: 2, borderColor: '#FF6F61'},
  activeTabText: {color: '#FF6F61', fontWeight: 'bold'},
  description: {fontSize: 12, color: '#555', fontFamily: 'General Sans Regular'},

  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  addToCartButton: {
    borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom: 0,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
},
  buttonGap: {
    width: 16,
  },
  addToCartText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  favoriteButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductOverview;
