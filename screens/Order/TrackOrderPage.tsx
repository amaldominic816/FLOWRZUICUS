import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const OrderTracking = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton2}>
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Path d="M15 19l-7-7 7-7" stroke="#000" strokeWidth="2" fill="none" />
          </Svg>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Order Tracking</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.iconButtonn}>
            <Image source={require('../../assets/images/cart.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButtonn}>
            <Image source={require('../../assets/images/notification.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <Image
          source={require('../../assets/images/Map.png')} // Replace with your map image
          style={styles.mapImage}
        />
      </View>

      {/* Delivery Boy Section */}
      <View style={styles.deliveryBoyContainer}>
        <Image
          source={require('../../assets/images/deliveryboy.png')} // Replace with delivery boy image
          style={styles.deliveryBoyImage}
        />
        <View style={styles.deliveryBoyInfo}>
          <Text style={styles.deliveryBoyName}>Eko Sanchez</Text>
          <Text style={styles.deliveryBoyRole}>Delivery boy</Text>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Image
            source={require('../../assets/images/call.png')} // Replace with phone icon
            style={styles.callIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Delivery Info Section */}
      <View style={styles.deliveryInfoContainer}>
        <View style={styles.infoRow}>
          <Image
            source={require('../../assets/images/clock.png')} // Replace with clock icon
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>Delivery time: 30 Min</Text>
        </View>
        <View style={styles.infoRow}>
          <Image
            source={require('../../assets/images/deliveryod.png')} // Replace with address icon
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            Delivery address: 123 west 45th Street, Saudi Arab
          </Text>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <LinearGradient
          colors={['#FF7E5F', '#FD3A84']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.saveButtonGradient}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  iconButton2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE0C4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  iconImage: { width: 24, height: 24 },
  mapContainer: {
    margin: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  deliveryBoyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  deliveryBoyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  deliveryBoyInfo: {
    flex: 1,
  },
  deliveryBoyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  deliveryBoyRole: {
    fontSize: 14,
    color: '#7E7E7E',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE0C4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIcon: {
    width: 20,
    height: 20,
  },
  deliveryInfoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#000',
  },
  saveButton: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default OrderTracking;
