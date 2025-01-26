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
  Dimensions,
} from 'react-native';
import ButtonOutlined from '../components/ButtonOutlined';
import ButtonPrimary from '../components/ButtonPrimary';
import HeaderInner from '../components/Headerinner';

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

      <HeaderInner
        title="Giftcard&Message"
        showBackButton={true}
        showNotificationIcon={true}
        showCartIcon={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('PushNotificationsScreen')}
        onCartPress={() => navigation.navigate('CartPage')}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
        <View style={styles.content}>
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
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Type your message and express your..."
                placeholderTextColor="#888"
                multiline
                numberOfLines={4}
              />
              <Text style={styles.characterLimitText}>180 Characters Left</Text>

              <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsText}>Not sure what to say?</Text>
                <TouchableOpacity>
                  <Text style={styles.suggestionsLink}>Try Suggested Messages</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.pasteLinkContainer, { height: 40 }]}>
                <Image
                  source={require('../../assets/images/paste.png')}
                  style={styles.pasteIcon}
                />
                <TextInput
                  style={styles.pasteInput}
                  placeholder="Paste your link"
                  placeholderTextColor="#888"
                />
              </View>

              <TextInput
                style={[styles.input, { height: 40 }]}
                placeholder="To: Optional"
                placeholderTextColor="#888"
              />

              <View style={[styles.fromContainer, { height: 50 }]}>
                <TextInput
                  style={styles.fromInput}
                  placeholder="From: Optional"
                  placeholderTextColor="#888"
                />
                <TouchableOpacity style={styles.signatureButton}>
                  <Image
                    source={require('../../assets/images/sign.png')}
                    style={styles.signatureIcon}
                  />
                  <Text style={styles.signatureText}>Signature</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <ButtonOutlined
          buttonText="Preview"
          onPress={() => navigation.navigate('')}
          buttonWidth={Dimensions.get('window').width * 0.4}
          buttonHeight={40}
          fontSize={12}
          borderColor="#FF7E5F"
          textColor="#FF7E5F"
        />
        <ButtonPrimary
          buttonText="Save & Continue"
          onPress={() => navigation.navigate('RegistrationPage')}
          buttonWidth={Dimensions.get('window').width * 0.4}
          buttonHeight={40}
          fontSize={12}
          gradientColors={['#DE8542', '#FE5993']}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  pasteLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    marginTop: 16,
  },
  pasteIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#888',
  },
  pasteInput: {
    flex: 1,
    color: '#000',
    fontSize: 14,
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
    paddingHorizontal: 16,
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
    marginTop: 10,
    marginBottom:10,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9F9F9',
    color: '#000',
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
  fromContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  fromInput: {
    flex: 1,
    marginRight: 16,
    fontSize: 14,
    color: '#333',
  },
  signatureButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signatureIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#333',
  },
  signatureText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  bottomContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
});

export default GiftCardScreenDetail;
