import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Header from '../../screens/components/Header';
import Colors from '../components/Colors';

const { width } = Dimensions.get('window');

// Sample data for multiple streak cards
const streakCardsData = [
  {
    id: 1,
    storeName: 'Awesome Store 1',
    storeLogo: require('../../assets/images/flower.png'),
    completedStreaks: 3,
  },
  {
    id: 2,
    storeName: 'Super Store 2',
    storeLogo: require('../../assets/images/flower.png'),
    completedStreaks: 1,
  },
  {
    id: 3,
    storeName: 'Mega Store 3',
    storeLogo: require('../../assets/images/flower.png'),
    completedStreaks: 5,
  },
];

const RewardsScreen = ({ navigation }) => {
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
        onNotificationPress={() =>
          navigation.navigate('PushNotificationsScreen')
        }
        onProfilePress={() => navigation.navigate('ProfileScreen')}
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

        {/* STREAK CARDS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.streaksCardsContainer}
        >
          {streakCardsData.map((card) => (
            <View key={card.id} style={styles.streaksCard}>
              <Text style={styles.streaksTitle}>Your Streaks</Text>

              <Image
                source={require('../../assets/images/fire.png')}
                style={styles.fireIcon}
              />

              <Text style={styles.streaksSubtitle}>Make an order to kick off the streak</Text>

              <View style={styles.flowersRow}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <View key={index} style={styles.iconWrapper}>
                    <Image
                      source={
                        index < card.completedStreaks
                          ? require('../../assets/images/flower_active.png')
                          : require('../../assets/images/flower_non.png')
                      }
                      style={styles.streakIcon}
                    />

                    {/* Progress Line */}
                    {index < 4 && (
                      <View
                        style={[
                          styles.progressLine,
                          {
                            backgroundColor:
                              index < card.completedStreaks - 1
                                ? '#FD3A84'
                                : '#FBCBC3',
                          },
                        ]}
                      />
                    )}
                  </View>
                ))}
              </View>

              <View style={styles.storeInfoContainer}>
                <Image source={card.storeLogo} style={styles.storeLogo} />
                <Text style={styles.storeName}>{card.storeName}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
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
    fontFamily:'DMSans-Bold',
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
    fontFamily:'DMSans-Bold',
    color: '#333',
  },
  walletCurrency: {
    fontSize: 16,
    fontFamily:'DMSans-SemiBold',
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
    fontFamily:'DMSans-Bold',
    color: '#333',
  },
  limitSubText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontFamily:'DMSans-Regular',
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

  /* STREAK CARDS CONTAINER */
  streaksCardsContainer: {
    marginTop: 16,
    paddingRight: 16,
  },

  /* STREAKS CARD */
  streaksCard: {
    backgroundColor: '#FCE9E8',
    borderRadius: 16,
    padding: 10,
    marginRight: 16,
    width: width * 0.85,
    overflow: 'hidden',
  },
  streaksTitle: {
    fontSize: 14,
    fontFamily:'DMSans-Bold',
    color: '#333',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  streaksSubtitle: {
    fontSize: 10,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    fontFamily:'DMSans-Regular',
  },
  storeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  storeLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 8,
  },
  storeName: {
    fontSize: 12,
    fontFamily:'DMSans-Bold',
    color: '#333',
  },

  /* FIRE ICON */
  fireIcon: {
    marginTop:20,
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  /* FLOWER ICONS ROW */
  flowersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
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
  checkIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 6,
  },
});
