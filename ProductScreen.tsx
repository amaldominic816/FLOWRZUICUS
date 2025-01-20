import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const ProductOverview = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Products Overview</Text>
        <TouchableOpacity>
          <Text style={styles.cartButton}>🛒</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Image
          source={require('./assets/images/item-test.png')}
          style={styles.productImage}
        />

        <View style={styles.detailsBox}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsTextContainer}>
              <Text style={styles.productName}>Yellow Tulips</Text>
              <Text style={styles.price}>$40</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.includes}>
          <Text style={styles.sectionTitle}>Includes</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.includesImage}
          />
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'description' && styles.activeTabButton]}
            onPress={() => setActiveTab('description')}
          >
            <Text style={[styles.tabText, activeTab === 'description' && styles.activeTabText]}>Description</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'cardTips' && styles.activeTabButton]}
            onPress={() => setActiveTab('cardTips')}
          >
            <Text style={[styles.tabText, activeTab === 'cardTips' && styles.activeTabText]}>Card Tips</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'description' && (
          <Text style={styles.description}>
            Our collection of floral products is carefully curated to bring beauty, joy, and freshness to every moment. From vibrant bouquets to elegant arrangements, each product is crafted with precision and love.
          </Text>
        )}
        {activeTab === 'cardTips' && (
          <Text style={styles.description}>
            Keep the flowers in a cool place, change the water daily, and trim the stems for longevity.
          </Text>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    fontSize: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartButton: {
    fontSize: 20,
  },
  content: {
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 400,
    borderRadius: 20,
    alignItems: 'center',
  },
  detailsBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsTextContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  price: {
    fontSize: 18,
    color: '#000',
    textAlign: 'left',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 18,
  },
  quantity: {
    fontSize: 18,
  },
  includes: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  includesImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 24,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  tabText: {
    color: '#777',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderColor: '#ff6f61',
  },
  activeTabText: {
    color: '#ff6f61',
    fontWeight: 'bold',
  },
  description: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
  addToCartButton: {
    backgroundColor: '#ff6f61',
    padding: 16,
    alignItems: 'center',
    borderRadius: 10,
    margin: 16,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductOverview;
