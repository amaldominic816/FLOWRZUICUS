import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStores } from '../redux/slices/storesSlice'; // Import the fetchStores action
import Colors from '../components/Colors';
import HeaderInner from '../components/Headerinner';
import Loader from '../components/Loader';

const StoresPage = ({ navigation }) => {
  const dispatch = useDispatch();

  // Selecting states from the stores slice
  const { stores, loading, error } = useSelector((state) => state.stores);

  // Load data initially on mount
  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  const renderStoreItem = ({ item }) => (
    <TouchableOpacity
      style={styles.popularStoreCardSingle}
      onPress={() =>
        navigation.navigate('StoreOverviewPage', {
          storeId: item.id,
          storeName: item.business_name,
          storeLocation: item.address,
          storeImage: item.logo,
          storeRating: item.rating,
        })
      }
    >
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

  if (loading) {
    return (
        <Loader />
    );
  }

  if (error) {
    return <Text>Error fetching data: {error}</Text>; // Show error state
  }

  return (
    <View style={styles.container}>
      <HeaderInner
        title="All Stores"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
      />
      <FlatList
        data={stores}
        renderItem={renderStoreItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  listContentContainer: {
    paddingTop: 20,
    padding: 10,
  },
  popularStoreCardSingle: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
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
  popularStoreRatingSingle : {
    fontSize: 14,
    color: '#444',
    fontFamily: 'DMSans-Medium',
  },
});

export default StoresPage;
