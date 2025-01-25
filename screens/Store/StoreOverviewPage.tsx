import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const StoreOverviewPage = () => {
  const storeName = 'Yellow Roses';
  const storeImage = require('../../assets/images/flower.png');
  const location = '123 west 45th Street, Saudi Arab, Madinah';
  const rating = 4.9;
  const openingHours = '7:00am - 11:45pm';

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'} </Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vendor Overview</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/cart.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/notification.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Store Info Section */}
      <View style={styles.storeInfoContainer}>
        <Image source={storeImage} style={styles.storeImage} />
        <View style={styles.storeDetailsContainer}>
          <Text style={styles.storeName}>{storeName}</Text>
          <Text style={styles.storeLocation}>{location}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.storeRating}>⭐ {rating} (73)</Text>
          </View>
          <View style={styles.openingHoursContainer}>
            <Text style={styles.openStatus}>Open</Text>
            <Text style={styles.openingHoursText}> ({openingHours})</Text>
            <TouchableOpacity>
              <Text style={styles.moreDetails}>More details {'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#374151',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  storeInfoContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 16,
    elevation: 2,
  },
  storeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  storeDetailsContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  storeLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeRating: {
    fontSize: 14,
    color: '#111827',
  },
  openingHoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'nowrap',
  },
  openingHoursText: {
    fontSize: 14,
    color: '#6B7280',
    marginHorizontal: 4,
  },
  openStatus: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 14,
  },
  moreDetails: {
    fontSize: 14,
    color: '#3B82F6',
    marginLeft: 8,
  },
});

export default StoreOverviewPage;
