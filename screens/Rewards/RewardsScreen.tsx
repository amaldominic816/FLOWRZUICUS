// RewardsScreen.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Header from '../../screens/components/Header';
import Colors from '../components/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStreakData } from '../redux/slices/streakSlice';

const { width } = Dimensions.get('window');

const RewardsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data: streakData, loading, error } = useSelector(state => state.streakData);


  useEffect(() => {
    dispatch(fetchStreakData());
  }, [dispatch]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  // Do not render card if data is not available
  if (!streakData) return null;

  const isCompleted = streakData.current_streak >= 5;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />

          {/* Header */}
          <Header
            title="Rewards"
            showCartIcon={true}
            showNotificationIcon={true}
            showProfileIcon={true}
            onCartPress={() => navigation.navigate('CartPage')}
            onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
            onProfilePress={() => navigation.navigate('ProfileScreen')}
            onOcPress={() => navigation.navigate('MyOccasionsScreen')}
          />

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* WALLET BALANCE CARD */}
            <View style={styles.walletCard}>
              <Text style={styles.walletTitle}>WALLET BALANCE</Text>
              <View style={styles.walletRow}>
                <Text style={styles.walletValue}>20,000</Text>
                <Text style={styles.walletCurrency}>AED</Text>
              </View>

              <View style={styles.limitBox}>
                <Text style={styles.limitText}>0/2000</Text>
              </View>
              <Text style={styles.limitSubText}>Transfer limits</Text>

              <View style={styles.progressBarBackground}>
                <View style={styles.progressBarFill} />
              </View>
            </View>

            {/* STREAK CARD */}
            {isCompleted ? (
              // Completed streak card: no store name, show redeem button and discount text
              <View style={styles.cardContainer}>
                <ImageBackground
                  source={require('../../assets/images/green_bg.png')}
                  style={styles.topSection}
                  imageStyle={styles.backgroundImage}
                >
                  <Image
                    source={require('../../assets/images/star_ribbon.png')}
                    style={styles.ribbonImage}
                  />
                </ImageBackground>
                <View style={styles.bottomSection}>
                  <Text style={styles.congratsText}>Congratulations!</Text>
                  <Text style={styles.discountText}>
                    You Go {streakData.progress_to_next_reward.percentage}% Discount
                  </Text>
                  <TouchableOpacity
                    style={styles.redeemButton}
                    onPress={() => navigation.navigate('StoreDiscountScreen')}
                  >
                    <Text style={styles.redeemButtonText}>Redeem</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // Normal streak card: store name removed
              <View style={styles.streaksCard}>
                <Text style={styles.streaksTitle}>Your Streaks</Text>
                <Image
                  source={require('../../assets/images/fire.png')}
                  style={styles.fireIcon}
                />
                <Text style={styles.streaksSubtitle}>
                  Make an order to kick off the streak
                </Text>
                <View style={styles.flowersRow}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <View key={index} style={styles.iconWrapper}>
                      <Image
                        source={
                          index < streakData.current_streak
                            ? require('../../assets/images/flower_active.png')
                            : require('../../assets/images/flower_non.png')
                        }
                        style={styles.streakIcon}
                      />
                      {index < 4 && (
                        <View
                          style={[
                            styles.progressLine,
                            {
                              backgroundColor:
                                index < streakData.current_streak - 1
                                  ? '#FD3A84'
                                  : '#FBCBC3',
                            },
                          ]}
                        />
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* OFFER REDEEMED TRANSACTIONS */}
            <View style={styles.transactionsContainer}>
              <Text style={styles.transactionsHeader}>Redeemed Offers</Text>
              {/* Redeemed transactions section remains unchanged */}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RewardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  /* WALLET CARD */
  walletCard: {
    backgroundColor: '#FFCBA4',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  walletTitle: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    color: '#333',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  walletValue: {
    fontSize: 26,
    fontFamily: 'DMSans-Bold',
    color: '#333',
  },
  walletCurrency: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: '#333',
    marginLeft: 5,
  },
  limitBox: {
    backgroundColor: '#FFD8B5',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  limitText: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    color: '#333',
  },
  limitSubText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontFamily: 'DMSans-Regular',
  },
  progressBarBackground: {
    width: '100%',
    height: 6,
    backgroundColor: '#FFE5D0',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressBarFill: {
    height: '100%',
    width: '50%',
    backgroundColor: '#fff',
  },

  /* NORMAL STREAK CARD */
  streaksCard: {
    backgroundColor: '#FCE9E8',
    borderRadius: 16,
    padding: 10,
    marginVertical: 16,
    width: width * 0.85,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  streaksTitle: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    color: '#333',
    alignSelf: 'flex-start',
  },
  streaksSubtitle: {
    fontSize: 10,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'DMSans-Regular',
  },
  fireIcon: {
    marginTop: 20,
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  flowersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  progressLine: {
    width: 28,
    height: 3,
    marginHorizontal: 3,
    borderRadius: 2,
  },

  /* COMPLETED STREAK CARD */
  cardContainer: {
    backgroundColor: '#FCE9E8',
    borderRadius: 16,
    marginVertical: 16,
    width: width * 0.85,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  topSection: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  ribbonImage: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 30,
  },
  bottomSection: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    color: '#333',
    marginVertical: 8,
    textAlign: 'center',
  },
  discountText: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  redeemButton: {
    backgroundColor: '#FE5993',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
  },
  redeemButtonText: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    color: '#fff',
  },

  /* TRANSACTIONS STYLES */
  transactionsContainer: {
    marginTop: 24,
  },
  transactionsHeader: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    color: '#333',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
