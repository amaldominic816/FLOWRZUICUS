import React, { useState } from 'react';
import { View, Text, FlatList,  StyleSheet } from 'react-native';
import SearchInner from '../../screens/components/SearchInner'; // Import SearchInner

const SearchProducts = ({ route, navigation }) => {
  // Get the passed searchQuery from HomePage
  const initialQuery = route.params?.query || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Handle changes to the search bar input
  const handleSearch = (text) => {
    setSearchQuery(text);
    // Implement search logic here (e.g., filter product list)
  };

  return (
    <View style={styles.container}>
      {/* SearchInner component */}
      <SearchInner
        showBackButton={true}
        onBackPress={() => navigation.goBack()} // Go back to previous screen
        onSearch={handleSearch} // Handle search input changes
        showCartIcon={true}
        showNotificationIcon={true}
        onCartPress={() => navigation.navigate('CartPage')}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
      />

      {/* Display the search query */}
      <Text style={styles.searchResultsText}>Results for: "{searchQuery}"</Text>

      {/* Product list (for demonstration purposes) */}
      <FlatList
        data={mockData.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Mock data for demonstration purposes
const mockData = [
  { id: 1, name: 'Red Roses' },
  { id: 2, name: 'Yellow Tulips' },
  { id: 3, name: 'White Lilies' },
  { id: 4, name: 'Orchids' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchResultsText: {
    fontSize: 16,
    padding: 10,
    color: '#333',
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
  },
});

export default SearchProducts;
