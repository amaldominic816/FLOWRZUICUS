import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/slices/categoriesSlice'; // Import the fetchCategories action
import HeaderInner from '../components/Headerinner';
import Colors from '../components/Colors';

const CategoriesPage = ({navigation}) => {
  const dispatch = useDispatch();

  // Selecting categories from the categories slice
  const { categories, loading, error } = useSelector((state) => state.categories);

  // Load data initially on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const renderCategoryItem = ({ item }) => (
    <View key={item.id} style={styles.categoryCard}>
      <View style={styles.categoryImageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
        <Text style={styles.categoryInnerText}>{item.title}</Text>
      </View>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>; // Show loading state
  }

  if (error) {
    return <Text>Error fetching data: {error}</Text>; // Show error state
  }

  return (
    <View style={styles.container}>
         <HeaderInner
        title="Categories"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={()=>navigation.navigate('CartPage')}
      />
      
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4} // Display 4 items per row
        columnWrapperStyle={styles.categoriesGrid} // Apply grid style
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

  categoriesGrid: {
    padding:20,
    marginTop:20,
    justifyContent: 'space-between', // Ensures even horizontal spacing
    marginBottom: 5, // Adds vertical spacing between rows
  },
  categoryCard: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0, // Adds space between each card vertically
    flex: 1, // Ensures each item takes equal space
  },
  categoryImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryInnerText: {
    position: 'absolute',
    bottom: 5,
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
});

export default CategoriesPage;
