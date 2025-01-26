import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const OrderTracking = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Transparent Status Bar */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Map Background */}
      <MapView
        style={StyleSheet.absoluteFillObject} // Makes the map fill the background
        initialRegion={{
          latitude: 37.78825, // Replace with actual coordinates
          longitude: -122.4324, // Replace with actual coordinates
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Example Marker */}
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Delivery Location"
          description="Your order will be delivered here."
        />
      </MapView>

      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton2} onPress={() => navigation.goBack()}>
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

      <View style={styles.bottomContainer}>
  {/* Dashed Line */}
  <View style={styles.dashedLineContainer}></View>

  {/* Delivery Time */}
  <View style={styles.deliveryInfoContainer}>
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Image
          source={require('../../assets/images/clock.png')}
          style={{ width: 24, height: 24 }}
        />
      </View>
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoLabel}>Delivery time</Text>
        <Text style={styles.infoValue}>30 Min</Text>
      </View>
    </View>

    {/* Delivery Address */}
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Image
          source={require('../../assets/images/deliveryod.png')}
          style={{ width: 24, height: 24 }}
        />
      </View>
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoLabel}>Delivery address</Text>
        <Text style={styles.infoValue}>123 west 45th Street, Saudi Arab</Text>
      </View>
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
      <Text style={styles.saveButtonText}>Done</Text>
    </LinearGradient>
  </TouchableOpacity>
</View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  iconImage: { width: 24, height: 24 },
  deliveryBoyContainer: {
    position: 'absolute',
    bottom: 230, // Position it above the bottom container
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    zIndex: 10,
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
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  deliveryInfoContainer: {
    marginBottom: 16,
    position: 'relative', // Relative position for dashed line alignment
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16, // Space between rows
  },
  infoIcon: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 10, // Rounded icon background
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  infoLabel: {
    fontSize: 14,
    color: '#7E7E7E',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  dashedLineContainer: {
    position: 'absolute',
    left: 20, // Aligns with the icons
    top: 44, // Positions between the first and second row
    bottom: 0,
    width: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#FF8A80',
  },
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
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
