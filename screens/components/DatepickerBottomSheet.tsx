import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import Colors from '../components/Colors';

const BottomSheet = ({ show, onClose, onDateSelect, onTimeSlotSelect, selectedDate }) => {
  const [selectedOption, setSelectedOption] = useState('today'); // Default option
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const timeSlots = [
    { time: '5:00pm - 11:59pm', available: true },
    { time: '11:00am - 5:00pm', available: false },
  ];

  const handleDateSelection = (option) => {
    setSelectedOption(option);
    if (option === 'pick') {
      onDateSelect(); // Show DatePicker when 'Pick a Date' is selected
    }
  };

  return (
    <Modal
      isVisible={show}
      onBackdropPress={onClose}
      style={styles.bottomSheet}
    >
      <View style={styles.sheetContent}>
        <Text style={styles.sheetTitle}>Another Time</Text>

        <View style={styles.dateOptions}>
          <TouchableOpacity
            style={[styles.dateBox, selectedOption === 'today' && styles.selectedBox]}
            onPress={() => handleDateSelection('today')}
          >
            <Image source={require('../../assets/images/j1.png')} style={styles.dateIcon} />
            <Text style={styles.dateText}>Today</Text>
            <Text style={styles.dateSubText}>{selectedDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dateBox, selectedOption === 'tomorrow' && styles.selectedBox]}
            onPress={() => handleDateSelection('tomorrow')}
          >
            <Image source={require('../../assets/images/j2.png')} style={styles.dateIcon} />
            <Text style={styles.dateText}>Tomorrow</Text>
            <Text style={styles.dateSubText}>{new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dateBox, selectedOption === 'pick' && styles.selectedBox]}
            onPress={() => handleDateSelection('pick')}
          >
            <Image source={require('../../assets/images/j2.png')} style={styles.dateIcon} />
            <Text style={styles.dateText}>Pick a date</Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Time Section */}
        <Text style={styles.deliveryTimeTitle}>Select Delivery Time</Text>
        {timeSlots.map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.timeSlotBox, !slot.available && styles.disabledSlot, selectedTimeSlot === slot.time && styles.selectedTimeSlot]}
            onPress={() => slot.available && setSelectedTimeSlot(slot.time)}
            disabled={!slot.available}
          >
            <Text style={styles.timeSlotText}>{slot.time}</Text>
            {!slot.available && <Text style={styles.fullyBookedText}>Fully Booked</Text>}
          </TouchableOpacity>
        ))}

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sheetContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateBox: {
    width: '30%',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  selectedBox: {
    backgroundColor: '#E0F7FA',
    borderColor: Colors.primary,
  },
  dateIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateSubText: {
    fontSize: 12,
    color: '#666',
  },
  deliveryTimeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  timeSlotBox: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#F8F8F8',
    marginBottom: 10,
  },
  disabledSlot: {
    backgroundColor: '#E0E0E0',
  },
  selectedTimeSlot: {
    borderColor: Colors.primary,
    backgroundColor: '#E0F7FA',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
  },
  fullyBookedText: {
    fontSize: 12,
    color: '#999',
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BottomSheet;
