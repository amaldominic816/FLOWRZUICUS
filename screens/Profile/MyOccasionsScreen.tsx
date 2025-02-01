import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import HeaderInner from '../../screens/components/Headerinner';
import Colors from '../components/Colors';
// Import ButtonPrimary component
import ButtonPrimary from '../components/ButtonPrimary';

const initialQuickAddOptions = [
  {
    id: 'q1',
    title: 'Happy Anniversary',
    image: require('../../assets/images/flower.png'),
  },
  {
    id: 'q2',
    title: 'Happy Birthday',
    image: require('../../assets/images/flower.png'),
  },
  {
    id: 'q3',
    title: 'Congratulations',
    image: require('../../assets/images/flower.png'),
  },
];

const MyOccasionsScreen = ({ navigation }) => {
  // Vertical list for added occasions and horizontal quick add options
  const [occasionsList, setOccasionsList] = useState([]); // Initially empty
  const [quickAddOptions, setQuickAddOptions] = useState(initialQuickAddOptions);

  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentOccasion, setCurrentOccasion] = useState(null);

  // Form fields
  const [occasionType, setOccasionType] = useState('Happy Anniversary');
  const [customOccasion, setCustomOccasion] = useState('');
  const [personName, setPersonName] = useState('');
  const [relationship, setRelationship] = useState('');
  // Store date as a Date object; default to current date
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Helper to format the date as YYYY-MM-DD
  const formatDate = (dateObj) => {
    return dateObj ? dateObj.toISOString().split('T')[0] : 'Select Date';
  };

  // Open modal to add a new occasion
  const handleAddPress = () => {
    setIsEditing(false);
    setCurrentOccasion(null);
    setOccasionType('Happy Anniversary');
    setCustomOccasion('');
    setPersonName('');
    setRelationship('');
    setDate(new Date());
    setModalVisible(true);
  };

  // Open modal in edit mode when an occasion card is pressed
  const handleEditOccasion = (item) => {
    setIsEditing(true);
    setCurrentOccasion(item);
    setOccasionType(item.occasionType || item.title);
    setCustomOccasion(item.occasionType === 'Other' ? item.title : '');
    setPersonName(item.personName);
    setRelationship(item.relationship);
    setDate(item.date ? new Date(item.date) : new Date());
    setModalVisible(true);
  };

  // Set filter based on the selected quick add option
  const handleFilter = (type) => {
    setFilter(type);
  };

  // Save a new or edited occasion
  const handleSave = () => {
    // If "Other" is selected then use the custom input as the occasion name
    const finalOccasionType = occasionType === 'Other' ? customOccasion : occasionType;
    const newOccasion = {
      id: isEditing && currentOccasion ? currentOccasion.id : Date.now().toString(),
      occasionType: finalOccasionType,
      personName,
      relationship,
      date, // Date stored as a Date object
      image: require('../../assets/images/flower.png'),
    };
    newOccasion.title = finalOccasionType; // For display purposes

    if (isEditing) {
      // Update existing occasion
      const updatedList = occasionsList.map((item) =>
        item.id === currentOccasion.id ? newOccasion : item
      );
      setOccasionsList(updatedList);
    } else {
      // Add new occasion to vertical list
      setOccasionsList([...occasionsList, newOccasion]);
    }

    // If adding a custom occasion, check if a quick add card exists and add if not
    if (occasionType === 'Other' && customOccasion.trim() !== '') {
      const exists = quickAddOptions.find(
        (option) => option.title.toLowerCase() === customOccasion.trim().toLowerCase()
      );
      if (!exists) {
        setQuickAddOptions([
          ...quickAddOptions,
          {
            id: 'q' + Date.now().toString(),
            title: customOccasion.trim(),
            image: require('../../assets/images/flower.png'),
          },
        ]);
      }
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  // Render a quick add card (horizontal list)
  const renderQuickAddCard = ({ item }) => (
    <TouchableOpacity style={styles.quickAddCard} onPress={() => handleFilter(item.title)}>
      <Image source={item.image} style={styles.occasionImage} />
      <Text style={styles.occasionTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  // Render an occasion card for the vertical list of added occasions
  const renderOccasionListCard = ({ item }) => (
    <TouchableOpacity style={styles.occasionListCard} onPress={() => handleEditOccasion(item)}>
      <Text style={styles.occasionListCardText}>Name: {item.personName}</Text>
      <Text style={styles.occasionListCardText}>Date: {formatDate(new Date(item.date))}</Text>
      <Text style={styles.occasionListCardText}>Occasion: {item.occasionType}</Text>
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
        onCartPress={() => navigation.navigate('CartPage')}
      />

      {/* Quick Add Section is displayed only when no filter is active */}
      {!filter && (
        <View style={styles.quickAddSection}>
          <Text style={styles.quickAddTitle}>Quick add</Text>
          <Text style={styles.quickAddSubtitle}>Select an occasion to create reminder</Text>
          <FlatList
            data={quickAddOptions}
            renderItem={renderQuickAddCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.occasionList}
          />
        </View>
      )}

      {/* If a filter is active, show a header with the filter and a clear option */}
      {filter && (
        <View style={styles.filterHeader}>
          <Text style={styles.filterHeaderText}>Filtered by: {filter}</Text>
          <TouchableOpacity onPress={() => setFilter('')}>
            <Text style={styles.clearFilterText}>Clear Filter</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Vertical List of Added Occasions */}
      <View style={styles.listSection}>
        <FlatList
          data={
            filter
              ? occasionsList.filter((item) => item.occasionType === filter)
              : occasionsList
          }
          renderItem={renderOccasionListCard}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>No occasions added.</Text>}
        />
      </View>

      {/* Floating "Add Occasion" Button using ButtonPrimary */}
      <View style={styles.addButtonWrapper}>
        <ButtonPrimary
          buttonText="Add Occasion"
          onPress={handleAddPress}
          // Adjust these values as needed for your design
          buttonWidth={120}
          buttonHeight={40}
          fontSize={16}
          gradientColors={[Colors.Gradient1, Colors.Gradient2]}
        />
      </View>

      {/* Modal Popup Form */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {isEditing ? 'Edit Occasion' : 'Add Occasion'}
            </Text>

            {/* Occasion Type Picker */}
            <Text style={styles.inputLabel}>Select Occasion</Text>
            <View style={styles.pickerContainer}>
              {['Happy Anniversary', 'Happy Birthday', 'Congratulations', 'Other'].map(
                (type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setOccasionType(type)}
                    style={[
                      styles.pickerOption,
                      occasionType === type && styles.pickerOptionSelected,
                    ]}
                  >
                    <Text>{type}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
            {occasionType === 'Other' && (
              <TextInput
                style={styles.input}
                placeholder="Enter custom occasion"
                value={customOccasion}
                onChangeText={setCustomOccasion}
              />
            )}

            {/* Person Name */}
            <Text style={styles.inputLabel}>Person Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter person's name"
              value={personName}
              onChangeText={setPersonName}
            />

            {/* Relationship */}
            <Text style={styles.inputLabel}>Relationship</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter relationship"
              value={relationship}
              onChangeText={setRelationship}
            />

            {/* Date Picker using react-native-date-picker */}
            <Text style={styles.inputLabel}>Date</Text>
            <TouchableOpacity
              style={[styles.input, { justifyContent: 'center' }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{formatDate(date)}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={showDatePicker}
              date={date}
              mode="date"
              onConfirm={(selectedDate) => {
                setShowDatePicker(false);
                setDate(selectedDate);
              }}
              onCancel={() => {
                setShowDatePicker(false);
              }}
            />

            {/* Modal Buttons using ButtonPrimary */}
            <View style={styles.modalButtons}>
              <View style={styles.modalButtonWrapper}>
                <ButtonPrimary
                  buttonText="Cancel"
                  onPress={handleCancel}
                  buttonWidth="100%"
                  buttonHeight={40}
                  fontSize={14}
                  gradientColors={[Colors.Gradient1, Colors.Gradient2]}
                />
              </View>
              <View style={styles.modalButtonWrapper}>
                <ButtonPrimary
                  buttonText="Save"
                  onPress={handleSave}
                  buttonWidth="100%"
                  buttonHeight={40}
                  fontSize={14}
                  gradientColors={[Colors.Gradient1, Colors.Gradient2]}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
    fontFamily: 'DMSans-Bold',
    color: '#333',
  },
  quickAddSubtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
    fontFamily: 'DMSans-Regular',
  },
  occasionList: {
    marginTop: 10,
  },
  quickAddCard: {
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
    fontFamily: 'DMSans-Bold',
    color: '#333',
    textAlign: 'center',
  },
  filterHeader: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  filterHeaderText: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    color: '#333',
  },
  clearFilterText: {
    color: Colors.Gradient2,
    fontFamily: 'DMSans-Bold',
  },
  listSection: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  occasionListCard: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  occasionListCardText: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#333',
  },
  addButtonWrapper: {
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
  // These styles were used by the old button implementations.
  addButton: {
    padding: 15,
    borderRadius: 30,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    color: '#fff',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    marginTop: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  pickerOption: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  pickerOptionSelected: {
    backgroundColor: Colors.Gradient2,
    borderColor: Colors.Gradient2,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButtonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonText: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    color: '#fff',
  },
  emptyText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'DMSans-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyOccasionsScreen;
