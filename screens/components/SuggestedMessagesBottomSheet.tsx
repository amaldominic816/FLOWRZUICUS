import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const SuggestedMessagesBottomSheet = ({ isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Suggested Messages</Text>
        <TouchableOpacity style={styles.messageItem}>
          <Text>Happy Birthday! 🎉</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageItem}>
          <Text>Wishing you a wonderful day! 🌟</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageItem}>
          <Text>Best wishes on your special day! 🎂</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  messageItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FF6F61',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SuggestedMessagesBottomSheet;