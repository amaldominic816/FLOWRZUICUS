import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventProducts } from '../redux/slices/eventProductsSlice'; // Import the fetchEventProducts action
import Colors from '../components/Colors';
import HeaderInner from '../components/Headerinner';

const EventStoreOverviewPage = ({navigation}) => {
  const route = useRoute();
  const { storeId, storeName, storeImage, storeLocation, storeRating } = route.params;

  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.eventProducts);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchEventProducts());
  }, [dispatch]);

  useEffect(() => {
    const filtered = products.filter(product => product.vendor_name === storeName);
    setFilteredProducts(filtered);
  }, [products, storeName]);

  if (status === 'loading') {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }
  if (status === 'failed') {
    return <Text style={styles.errorText}>Error fetching products: {error}</Text>;
  }

  const handleProductClick = (product) => {
    navigation.navigate('EventsProductOverview', {
      id: product.id,
      name: product.name,
      price: product.daily_rate,
      image: product.image,
      description: product.description,
      quantityAvailable: product.quantity_available,
      isAvailable: product.is_available,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Store Information */}
       <HeaderInner
              title="Store Overview"
              showBackButton={true}
              showNotificationIcon={true}
              showCartIcon={true}
              onBackPress={() => navigation.goBack()}
              onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
              onCartPress={() => navigation.navigate('CartPage')}
            />
      <ImageBackground
        source={{ uri: storeImage }}
        style={styles.headerBackground}
      >
        <View style={styles.overlay}>
          <Image source={{ uri: storeImage }} style={styles.logo} />
          <View style={styles.storeDetailsContainer}>
            <Text style={styles.storeName}>{storeName}</Text>
            <Text style={styles.storeLocation}>{storeLocation}</Text>
            <Text style={styles.storeRating}>Rating: {storeRating}</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Product Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => handleProductClick(item)}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>AED {item.daily_rate} (Per/Day)</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
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
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 20,
  },
  storeDetailsContainer: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    color: '#000',
  },
  storeLocation: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#000',
  },
  storeRating: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#000',
  },
  productCard: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  productName: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    color: '#000',
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'DMSans-SemiBold',
    color: '#444',
  },
  flatListContent: {
    paddingBottom: 20,
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
});

export default EventStoreOverviewPage;
