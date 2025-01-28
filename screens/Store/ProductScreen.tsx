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
import ButtonPrimary from '../components/ButtonPrimary';
import HeaderInner from '../components/Headerinner';
import Colors from '../components/Colors';
const screenWidth = Dimensions.get('window').width;
const ProductOverview = ({navigation}) => {
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
      <HeaderInner
        title="Product OverView"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={()=>navigation.navigate('CartPage')}
      />

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Product Image */}
        <Image
          source={require('../../assets/images/item-test.png')}
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
              source={require('../../assets/images/in1.png')}
              style={styles.includesImage}
            />
            <Image
              source={require('../../assets/images/in2.png')}
              style={styles.includesImage}
            />
            <Image
              source={require('../../assets/images/in3.png')}
              style={styles.includesImage}
            />
            <Image
              source={require('../../assets/images/in4.png')}
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
                activeTab === 'careTips' && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab('careTips')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'careTips' && styles.activeTabText,
                ]}>
                Care Tips
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'description' && (
            <Text style={styles.description}>
           Yellow tulips are a vibrant and cheerful variety of tulips that radiate positivity and warmth. Their bright golden-yellow petals are reminiscent of sunshine, making them a popular choice for spreading happiness and lifting spirits. Symbolizing joy, friendship, and new beginnings, yellow tulips are perfect for celebrating special moments or simply brightening someone’s day.

These stunning flowers bloom in the spring, often standing tall with strong green stems and a delicate cup-shaped bloom. Whether arranged in a bouquet or planted in a garden, yellow tulips add a touch of elegance and a splash of color to any setting. Their timeless beauty and uplifting hue make them a favorite among flower enthusiasts and a perfect representation of hope and optimism. 🌞🌷
            </Text>
          )}
          {activeTab === 'careTips' && (
            <Text style={styles.description}>
              ✂️ Trim Stems: Cut stems at a 45° angle for better water absorption.{'\n'}
💧 Fresh Water: Change vase water every 2-3 days to keep it clean.{'\n'}
🥤 Flower Food: Add flower food or a DIY mix of sugar, bleach, and lemon juice.{'\n'}
🍃 Remove Leaves: Take off leaves below the waterline to avoid rotting.{'\n'}
🌤️ Avoid Sunlight: Keep flowers away from direct sun and heat.{'\n'}
🌬️ No Drafts: Avoid placing flowers near fans, ACs, or vents.{'\n'}
🌡️ Cool Storage: Refrigerate flowers overnight to prolong freshness.{'\n'}
💦 Mist Daily: Spray petals lightly to keep them hydrated.{'\n'}
🥀 Remove Wilted Blooms: Take out dying flowers to protect the fresh ones.{'\n'}
🍎 Keep Away from Fruits: Avoid placing flowers near ripening fruits.{'\n'}
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footerButtons}>
      <ButtonPrimary
          buttonText="Add to Cart"
          onPress={() => navigation.navigate('CartPage')}
          buttonWidth={Dimensions.get('window').width * 0.7} // Set width to 80% of the screen width
          buttonHeight={50}
          fontSize={20}
          gradientColors={['#DE8542', '#FE5993']} // Optional custom gradient
        />
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
  container: {flex: 1, backgroundColor: Colors.background},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },


  content: {padding: 16},
  productImage: {
    width: '80%',
    height: undefined,
    aspectRatio: 1.2,
    borderRadius: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  detailsBox: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
  },

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {fontSize: 20, fontFamily:'DMSans-Bold'},
  price: {fontSize: 18, color: '#000', marginTop: 4,fontFamily:'DMSans-Regular'},
  quantityContainer: {flexDirection: 'row', alignItems: 'center'},
  quantityButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 8,
  },
  quantityText: {fontSize: 18,fontFamily:'DMSans-Regular'},
  includes: {marginTop: 24},
  sectionTitle: {fontSize: 18, fontFamily:'DMSans-Bold', marginBottom: 8},
  includesImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  includesImage: {width: 70, height: 70, borderRadius: 10},
  tabContentBox: {
    backgroundColor: Colors.secondary,
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
  activeTabText: {color: '#FF6F61', fontFamily:'DMSans-Bold'},
  description: {fontSize: 12, color: '#555', fontFamily:'DMSans-Regular'},

  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },


  buttonGap: {
    width: 16,
  },
  favoriteButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductOverview;
