import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import HeaderInner from '../components/Headerinner';
import Colors from '../components/Colors';

const StoreOverviewPage = ({ navigation }) => {
  const storeName = 'Yellow Roses';
  const location = '123 west 45th Street, Saudi Arab, Madinah';
  const rating = 4.9;
  const totalReviews = 73;
  const [activeTab, setActiveTab] = useState('Products');

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 20, // To allow some space at the bottom
  },
  storeName: {
    fontSize: 18,
    fontFamily:'DMSans-Bold',
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
    fontFamily:'DMSans-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#666',
    fontFamily:'DMSans-Regular',
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
    fontFamily:'DMSans-SemiBold',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#FF5733',
    fontFamily:'DMSans-Bold',
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
    fontFamily:'DMSans-Bold',
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
    fontFamily:'DMSans-Bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    fontFamily:'DMSans-SemiBold',
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default StoreOverviewPage;
