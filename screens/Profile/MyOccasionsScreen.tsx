import React, { useState, useEffect } from 'react';
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
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import HeaderInner from '../../screens/components/Headerinner';
import Colors from '../components/Colors';
import ReminderSvg from '../../assets/images/Reminder.svg';
import ReminderBell from '../../assets/images/reminder-bell.svg';
import ButtonPrimary from '../components/ButtonPrimary';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReminders, addReminder, updateReminder, deleteReminder } from '../redux/slices/remiderSlice';

const initialQuickAddOptions = [
  {
    id: 'q1',
    title: 'Anniversary',
    image: require('../../assets/images/flower.png'),
  },
  {
    id: 'q2',
    title: 'Birthday',
    image: require('../../assets/images/flower.png'),
  },
  {
    id: 'q3',
    title: 'Congratulations',
    image: require('../../assets/images/flower.png'),
  },
];

const MyOccasionsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // Use API data from redux (using API response field names)
  const reminders = useSelector((state) => state.reminders.reminders);
  
  const [quickAddOptions, setQuickAddOptions] = useState(initialQuickAddOptions);
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentOccasion, setCurrentOccasion] = useState(null);
  const [occasionType, setOccasionType] = useState('Happy Anniversary');
  const [customOccasion, setCustomOccasion] = useState('');
  const [personName, setPersonName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState(null);

  useEffect(() => {
    dispatch(fetchReminders());
  }, [dispatch]);

  const formatDate = (dateObj) => {
    return dateObj ? dateObj.toISOString().split('T')[0] : 'Select Date';
  };

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

  const handleEditOccasion = (item) => {
    setIsEditing(true);
    setCurrentOccasion(item);
    setOccasionType(item.occasionType || item.title);
    setCustomOccasion(item.occasionType === 'Other' ? item.title : '');
    // API returns "person_name" so we update accordingly
    setPersonName(item.person_name);
    setRelationship(item.relationship);
    // Use next_birthday to display the date
    setDate(item.next_birthday ? new Date(item.next_birthday) : new Date());
    setModalVisible(true);
  };

  const handleFilter = (type) => {
    setFilter(type);
  };

  const handleSave = () => {
    const finalOccasionType = occasionType === 'Other' ? customOccasion : occasionType;
    const newOccasion = {
      id: isEditing && currentOccasion ? currentOccasion.id : Date.now().toString(),
      occasionType: finalOccasionType,
      // Use personName from API (but when saving locally, we can stick with our naming)
      personName,
      relationship,
      date,
      image: require('../../assets/images/flower.png'),
      title: finalOccasionType,
    };

    if (isEditing) {
      dispatch(updateReminder(newOccasion));
    } else {
      dispatch(addReminder(newOccasion));
    }

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

  const handleOptionsPress = (item) => {
    setSelectedOccasion(item);
    setOptionsModalVisible(true);
  };

  const handleEdit = () => {
    if (selectedOccasion) {
      handleEditOccasion(selectedOccasion);
      setOptionsModalVisible(false);
    }
  };

  const handleDelete = () => {
    if (selectedOccasion) {
      Alert.alert(
        "Delete Occasion",
        "Are you sure you want to delete this occasion?",
        [
          { text: "Cancel", onPress: () => setOptionsModalVisible(false), style: "cancel" },
          { text: "Delete", onPress: () => {
              dispatch(deleteReminder(selectedOccasion.id));
              setOptionsModalVisible(false);
            }
          }
        ]
      );
    }
  };

  const renderQuickAddCard = ({ item }) => (
    <TouchableOpacity style={styles.quickAddCard} onPress={() => handleFilter(item.title)}>
      <Image source={item.image} style={styles.occasionImage} />
      <Text style={styles.occasionTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderOccasionListCard = ({ item }) => {
    // Using API field names: person_name and next_birthday
    return (
      <View style={styles.card} >
        <View style={styles.header}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{new Date(item.next_birthday).getDate()}</Text>
            <Text style={styles.month}>
              {new Date(item.next_birthday).toLocaleString("en-US", { month: "short" })}
            </Text>
          </View>
          <Text style={styles.name}>{item.person_name}</Text>
          <TouchableOpacity style={styles.menuButton} onPress={() => handleOptionsPress(item)}>
            <Text style={styles.menuText}>...</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Occasion:</Text>
            <View style={styles.occasionContainer}>
              <Text style={styles.occasion}>{item.occasionType || item.title}</Text>
            </View>
          </View>
          {item.relationship && (
            <View style={styles.infoItem}>
              <Text style={styles.label}>Relationship:</Text>
              <Text style={styles.relationship}>{item.relationship}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const filteredReminders = filter
    ? reminders.filter((item) => item.occasionType === filter)
    : reminders;

  return (
    <View style={styles.container}>
      <HeaderInner
        title="Reminders"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
      />

      {!filter && (
        <View style={styles.reminderSection}>
          <ReminderSvg width={140} height={70} style={styles.reminderSvg} />
          <View style={styles.reminderContent}>
            <ReminderBell width={40} height={40} style={styles.reminderImage} />
            <Text style={styles.reminderSubtitle}>
              Never miss loved ones' special days with our reminders, tailor-made offers & personalised gifts
            </Text>
          </View>
        </View>
      )}

      {filter && (
        <View style={styles.filterHeader}>
          <Text style={styles.filterHeaderText}>Filtered by: {filter}</Text>
          <TouchableOpacity onPress={() => setFilter('')}>
            <Text style={styles.clearFilterText}>Clear Filter</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.listSection}>
        <FlatList
          data={filteredReminders}
          renderItem={renderOccasionListCard}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.emptyText}>No reminders added.</Text>}
        />
      </View>

      <View style={styles.addButtonWrapper}>
        <ButtonPrimary
          buttonText="Add a Reminder"
          onPress={handleAddPress}
          buttonWidth={Dimensions.get('window').width * 0.9}
          buttonHeight={50}
          fontSize={16}
          gradientColors={[Colors.Gradient1, Colors.Gradient2]}
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {isEditing ? 'Edit Occasion' : 'Add Occasion'}
            </Text>

            <Text style={styles.inputLabel}>Select Occasion</Text>
            <View style={styles.pickerContainer}>
              {['Anniversary', 'Birthday', 'Congratulations', 'Other'].map(
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

            <Text style={styles.inputLabel}>Person Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter person's name"
              value={personName}
              onChangeText={setPersonName}
            />

            <Text style={styles.inputLabel}>Relationship</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter relationship"
              value={relationship}
              onChangeText={setRelationship}
            />

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

      {/* Options Modal */}
      <Modal visible={optionsModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Options</Text>
            <TouchableOpacity onPress={handleEdit} style={styles.optionButton}>
              <Text style={styles.optionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.optionButton}>
              <Text style={styles.optionText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOptionsModalVisible(false)} style={styles.optionButton}>
              <Text style={styles.optionText}>Cancel</Text>
            </TouchableOpacity>
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
    left: 20,
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
  emptyText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'DMSans-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  date: {
    fontSize: 22,
    fontFamily: 'DMSans-Bold',
  },
  month: {
    fontSize: 14,
    color: "gray",
    fontFamily: 'DMSans-Regular',
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    marginLeft: 10,
  },
  menuButton: {
    padding: 5,
  },
  menuText: {
    fontSize: 20,
    fontFamily: 'DMSans-Regular',
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  infoItem: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "gray",
  },
  occasionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  occasion: {
    fontSize: 16,
    fontWeight: "bold",
  },
  relationship: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  reminderSection: {
    padding: 10,
  },
  reminderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  reminderSubtitle: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  reminderSvg: {
    marginBottom: 0,
    marginLeft: 0,
  },
  optionButton: {
    padding: 15,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default MyOccasionsScreen;
