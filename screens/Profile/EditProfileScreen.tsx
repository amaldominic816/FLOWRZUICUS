import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import HeaderInner from '../components/Headerinner';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleEditProfilePicture = () => {
    // Logic to handle editing the profile picture
    console.log('Edit Profile Picture');
  };

  const handleDeleteAccount = () => {
    // Logic to handle account deletion
    console.log('Delete Account');
  };

  return (
    <View style={styles.container}>
      <HeaderInner
        title="Edit Profile"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
      />

      <View style={styles.content}>
        <TouchableOpacity style={styles.profilePictureContainer} onPress={handleEditProfilePicture}>
          <Image
           source={profilePicture ? { uri: profilePicture } : require('../../assets/images/profile-picture.png')}
            style={styles.profilePicture}
          />
          <Text style={styles.editPictureText}>Edit Profile Picture</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity onPress={handleDeleteAccount}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  editPictureText: {
    color: '#007BFF',
    fontSize: 16,
    fontFamily:'DMSans-Regular',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    fontFamily:'DMSans-Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  deleteText: {
    marginTop: 24,
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily:'DMSans-light',
  },
});

export default EditProfileScreen;
