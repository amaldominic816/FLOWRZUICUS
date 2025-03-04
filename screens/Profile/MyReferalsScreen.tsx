import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderInner from '../components/Headerinner';

const ReferralScreen = () => {
  const navigation = useNavigation();
  // State to handle which tab is active: Refer or Earn
  const [activeTab, setActiveTab] = useState('Refer');

  const handleCopyCode = () => {
    // For actual copy functionality, you can use Clipboard.setString(referralCode)
    // or a library like expo-clipboard if you're using Expo.
    alert('Referral code copied!');
  };

  // Example data for the Earn tab if you want to show "claimed rewards"
  const claimedRewards = [
    { store: 'Awesome Store 1', discount: '20% off', amount: '$20' },
    { store: 'Awesome Store 2', discount: '10% off', amount: '$10' },
  ];

  return (
    <View style={styles.container}>
      <HeaderInner
        title="Referal"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
      />

      {/* Toggle Buttons (Refer / Earn) */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === 'Refer' && styles.activeToggleButton,
          ]}
          onPress={() => setActiveTab('Refer')}
        >
          <Text
            style={[
              styles.toggleText,
              activeTab === 'Refer' && styles.activeToggleText,
            ]}
          >
            Refer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === 'Earn' && styles.activeToggleButton,
          ]}
          onPress={() => setActiveTab('Earn')}
        >
          <Text
            style={[
              styles.toggleText,
              activeTab === 'Earn' && styles.activeToggleText,
            ]}
          >
            Earn
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'Refer' ? (
          /* Refer Tab Content */
          <View style={styles.referContainer}>
            {/* Gift Image */}
            <Image
              source={require('../../assets/images/referal.png')}
              style={styles.giftImage}
            />
            {/* Description */}
            <Text style={styles.bigTitle}>Share Pitch wallet with Friends</Text>
            <Text style={styles.description}>
              Refer a friend to Pitch wallet and earn $5 USD! When they sign up
              and make their first deposit, you'll both get a $5 bonus.
            </Text>

            {/* Referral Code */}
            <View style={styles.referralCodeContainer}>
              <Text style={styles.referralCode}>Pfranmy</Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={handleCopyCode}
              >
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>

            {/* Share Via */}
            <Text style={styles.shareLabel}>Share via:</Text>
            <View style={styles.shareOptions}>
              {/* WhatsApp */}
              <TouchableOpacity style={styles.shareOption}>
                <Image
                  style={styles.shareIcon}
                  source={require('../../assets/images/whatsapp.png')}
                />
                <Text style={styles.shareOptionText}>WhatsApp</Text>
              </TouchableOpacity>
              {/* Twitter */}
              <TouchableOpacity style={styles.shareOption}>
                <Image
                  style={styles.shareIcon}
                  source={require('../../assets/images/twitter.png')}
                />
                <Text style={styles.shareOptionText}>Twitter</Text>
              </TouchableOpacity>
              {/* Generic Share */}
              
              {/* Instagram */}
              <TouchableOpacity style={styles.shareOption}>
                <Image
                  style={styles.shareIcon}
                  source={require('../../assets/images/instagram.png')}
                />
                <Text style={styles.shareOptionText}>Instagram</Text>
              </TouchableOpacity>
              {/* Snapchat */}
              <TouchableOpacity style={styles.shareOption}>
                <Image
                  style={styles.shareIcon}
                  source={require('../../assets/images/snapchat.png')}
                />
                <Text style={styles.shareOptionText}>Snapchat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <Image
                  style={styles.shareIcon}
                  source={require('../../assets/images/share.png')}
                />
                <Text style={styles.shareOptionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* Earn Tab Content */
          <View style={styles.earnContainer}>
            <Text style={styles.earnTitle}>Claimed Rewards</Text>
            {claimedRewards.map((reward, index) => (
              <View key={index} style={styles.rewardRow}>
                <Image
                  source={require('../../assets/images/referal.png')}
                  style={styles.rewardImage}
                />
                <View style={styles.rewardDetails}>
                  <Text style={styles.storeText}>{reward.store}</Text>
                  <Text style={styles.discountText}>
                    claimed {reward.discount}
                  </Text>
                </View>
                <Text style={styles.amountText}>{reward.amount}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
  },
  scrollContent: {
    paddingBottom: 40,
  },
  /* Toggle Buttons */
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 30,
  },
  toggleText: {
    color: '#333',
    fontSize: 16,
    fontFamily:'DMSans-Regular',
  },
  activeToggleButton: {
    backgroundColor: '#FF7B3E',
  },
  activeToggleText: {
    color: '#fff',
    fontFamily:'DMSans-Bold',
  },
  /* Refer Tab */
  referContainer: {
    alignItems: 'center',
    padding: 20,
  },
  giftImage: {
    width: 120,
    height: 120,
    marginVertical: 20,
    resizeMode: 'contain',
  },
  bigTitle: {
    fontSize: 18,
    color: '#333',
    fontFamily:'DMSans-Bold',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    fontFamily:'DMSans-Regular',
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 10,
    lineHeight: 20,
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  referralCode: {
    flex: 1,
    fontSize: 16,
    fontFamily:'DMSans-Regular',
    color: '#000',
  },
  copyButton: {
    backgroundColor: '#FF7B3E',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  copyButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily:'DMSans-Bold',
  },
  shareLabel: {
    fontSize: 14,
    fontFamily:'DMSans-Regular',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  shareOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    flexWrap: 'wrap',
  },
  shareOption: {
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  shareIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  shareOptionText: {
    color: '#333',
    fontSize: 12,
    fontFamily:'DMSans-Regular',
  },
  /* Earn Tab */
  earnContainer: {
    padding: 20,
  },
  earnTitle: {
    fontSize: 18,
    color: '#333',
    fontFamily:'DMSans-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  rewardImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  rewardDetails: {
    flex: 1,
  },
  storeText: {
    fontSize: 16,
    color: '#FF5C39',
    fontFamily:'DMSans-Bold',
  },
  discountText: {
    fontSize: 12,
    fontFamily:'DMSans-Regular',
    color: '#777',
  },
  amountText: {
    fontSize: 16,
    fontFamily:'DMSans-Bold',
    color: '#FF5C39',
  },
});

export default ReferralScreen;
