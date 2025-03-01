import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOccasionBanners } from '../redux/slices/occasionsSlice'; // Import the fetchOccasionBanners action
import HeaderInner from '../components/Headerinner';
import Colors from '../components/Colors';
import Loader from '../components/Loader';

const OccasionBannersPage = ({ navigation }) => {
  const dispatch = useDispatch();

  // Selecting states from the occasion slice
  const { banners, loading, error } = useSelector((state) => state.occasion);

  // Load data initially on mount
  useEffect(() => {
    dispatch(fetchOccasionBanners());
  }, [dispatch]);

  const renderOccasionBannerItem = ({ item }) => (
    <View key={item.id} style={styles.bannerCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} />
      <Text style={styles.bannerText}>{item.title}</Text>
    </View>
  );

  if (loading) {
    return <Loader/>; // Show loading state// Show loading state
  }

  if (error) {
    return <Text>Error fetching data: {error}</Text>; // Show error state
  }

  return (

    <View style={styles.container}>
        <HeaderInner
        title="Occasions"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={()=>navigation.navigate('CartPage')}
      />
      <FlatList
        data={banners}
        renderItem={renderOccasionBannerItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.background,
      },

  bannerCard: {
    marginBottom: 16,
    marginTop:20,
    padding:20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFFFF',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode:'cover',
    borderRadius: 10,
  },
  bannerText: {
    padding: 8,
    fontSize: 18,
    fontFamily:'DMSans-Bold',
  },
});

export default OccasionBannersPage;
