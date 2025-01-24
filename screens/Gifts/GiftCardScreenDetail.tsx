import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const giftCards = [
  {
    id: '1',
    image: 'https://via.placeholder.com/150',
    title: 'Flower Card',
    price: 'Free',
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/150',
    title: 'Flower Card',
    price: 'Free',
  },
  {
    id: '3',
    image: 'https://via.placeholder.com/150',
    title: 'Flower Card',
    price: 'Free',
  },
];

const GiftCardScreenDetail = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('selectCard');
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSelectCard = (id) => setSelectedCard(id);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton2} onPress={() => navigation.goBack()}>
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Path d="M15 19l-7-7 7-7" stroke="#000" strokeWidth="2" fill="none" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerText}>Gift Card & Message</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('CartPage')}>
            <Image source={require('../../assets/images/cart.png')} style={styles.headerIconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../../assets/images/notification.png')} style={styles.headerIconImage} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'selectCard' && styles.activeTabButton]}
          onPress={() => setActiveTab('selectCard')}
        >
          <Text style={[styles.tabText, activeTab === 'selectCard' && styles.activeTabText]}>Select Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'addMessage' && styles.activeTabButton]}
          onPress={() => setActiveTab('addMessage')}
        >
          <Text style={[styles.tabText, activeTab === 'addMessage' && styles.activeTabText]}>Add a Message</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'selectCard' && (
          <FlatList
            data={giftCards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.cardContainer, selectedCard === item.id && styles.selectedCard]}
                onPress={() => handleSelectCard(item.id)}
              >
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardPrice}>{item.price}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.cardList}
          />
        )}
        {activeTab === 'addMessage' && (
  <View style={styles.addMessageContainer}>
    {/* To Field */}
    <TextInput
      style={styles.input}
      placeholder="To: Optional"
      placeholderTextColor="#888"
    />

    {/* Message Input */}
    <TextInput
      style={[styles.input, styles.messageInput]}
      placeholder="Type your message and express your..."
      placeholderTextColor="#888"
      multiline
      numberOfLines={4}
    />
    <Text style={styles.characterLimitText}>180 Characters Left</Text>

    {/* Suggested Messages */}
    <View style={styles.suggestionsContainer}>
      <Text style={styles.suggestionsText}>Not sure what to say?</Text>
      <TouchableOpacity>
        <Text style={styles.suggestionsLink}>Try Suggested Messages</Text>
      </TouchableOpacity>
    </View>

    {/* From and Signature */}
    <View style={styles.row}>
      <TextInput
        style={[styles.input, styles.flexInput]}
        placeholder="From: Optional"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.signatureButton}>
        <Image
          source={require('../../assets/images/sign.png')} // Replace with actual PNG path
          style={styles.signatureImage}
        />
      </TouchableOpacity>
    </View>

    {/* Video and Link Options */}
    <View style={styles.optionsRow}>
      <TouchableOpacity style={styles.optionButton}>
        <Image
          source={require('../../assets/images/camera.png')} // Replace with actual PNG path
          style={styles.optionIcon}
        />
        <Text style={styles.optionText}>Record video</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or</Text>
      <TouchableOpacity style={styles.optionButton}>
        <Image
          source={require('../../assets/images/paste.png')} // Replace with actual PNG path
          style={styles.optionIcon}
        />
        <Text style={styles.optionText}>Paste a Link</Text>
      </TouchableOpacity>
    </View>
  </View>
)}

      </ScrollView>

      {/* Bottom Button Container */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.previewButton} onPress={() => console.log('Preview')}>
          <Text style={styles.previewButtonText}>Preview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Save & Continue')}>
          <LinearGradient
            colors={['#FF7E5F', '#FD3A84']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveButtonGradient}
          >
            <Text style={styles.saveButtonText}>Save & Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconButton2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE0C4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: {
    color: '#777',
    fontSize: 16,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderColor: '#FF6F61',
  },
  activeTabText: {
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 70, // Add space to accommodate the fixed button container
  },
  cardList: {
    paddingVertical: 8,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    alignItems: 'center',
    padding: 16,
  },
  selectedCard: {
    borderColor: '#FF6F61',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },

  messageText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  previewButton: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#FF7E5F',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  previewButtonText: {
    color: '#FF7E5F',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
  },
  saveButtonGradient: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

    addMessageContainer: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 10,
      marginTop: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      backgroundColor: '#F9F9F9',
    },
    messageInput: {
      height: 100,
      textAlignVertical: 'top',
    },
    characterLimitText: {
      color: '#888',
      fontSize: 12,
      textAlign: 'right',
      marginBottom: 16,
    },
    suggestionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    suggestionsText: {
      fontSize: 14,
      color: '#555',
    },
    suggestionsLink: {
      fontSize: 14,
      color: '#FF6F61',
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    flexInput: {
      flex: 1,
      marginRight: 8,
    },
    signatureButton: {
      backgroundColor: '#F9F9F9',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 8,
    },
    signatureImage: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
    },
    optionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginTop: 16,
    },
    optionButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
    },
    optionIcon: {
      width: 10,
      height: 10,
      marginBottom: 4,
    },
    optionText: {
      fontSize: 12,
      color: '#555',
    },
    orText: {
      marginHorizontal: 8,
      color: '#888',
      fontSize: 14,
    },

});

export default GiftCardScreenDetail;
