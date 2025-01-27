import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import HeaderInner from '../../screens/components/Headerinner';
import Colors from '../components/Colors';


const occasions = [
  {
    id: '1',
    title: 'Happy Anniversary',
    image: require('../../assets/images/flower.png'),
  },
  {
    id: '2',
    title: 'Happy Birthday',
    image: require('../../assets/images/flower.png'),
  },
  {
    id: '3',
    title: 'Congratulations',
    image: require('../../assets/images/flower.png'),
  },
];

const MyOccasionsScreen = ({navigation}) => {
  const renderOccasion = ({ item }) => (
    <TouchableOpacity style={styles.occasionCard}>
      <Image source={item.image} style={styles.occasionImage} />
      <Text style={styles.occasionTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <HeaderInner
        title="Occasions"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={()=>navigation.navigate('CartPage')}
      />

      {/* Quick Add Section */}
      <View style={styles.quickAddSection}>
        <Text style={styles.quickAddTitle}>Quick add</Text>
        <Text style={styles.quickAddSubtitle}>
          Select an occasion to create a reminder
        </Text>
        <FlatList
          data={occasions}
          renderItem={renderOccasion}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.occasionList}
        />
      </View>

      {/* Empty State */}
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>No upcoming occasions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  quickAddSection: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
  },
  quickAddTitle: {
    fontSize: 16,
    fontFamily:'DMSans-Bold',
    color: '#333',
  },
  quickAddSubtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
    fontFamily:'DMSans-Regular',
  },
  occasionList: {
    marginTop: 10,
  },
  occasionCard: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    marginRight: 10,
  },
  occasionImage: {
    width: 60,
    height: 60,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  occasionTitle: {
    fontSize: 12,
    fontFamily:'DMSans-Bold',
    color: '#333',
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#555',
    fontFamily:'DMSans-Regular',
  },
});

export default MyOccasionsScreen;
