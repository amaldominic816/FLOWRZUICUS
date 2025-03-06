import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../components/Colors';
import ButtonOutlined from '../components/ButtonOutlined';

const OrderSuccessPage = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Main');
    }, 3000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Lottie Animation */}
        <LottieView
          source={require('../../assets/images/orderplaced.json')}
          autoPlay
          loop={false}
          style={styles.animation}
        />
        {/* Success Message */}
        <Text style={styles.message}>Your Order Placed Successfully</Text>
        {/* Button to manually navigate to MyOrdersScreen */}
        <View style={styles.buttonsContainer}>
          <ButtonOutlined
            buttonText="Go to Orders"
            onPress={() => navigation.navigate('MyOrdersScreen')}
            buttonWidth={Dimensions.get('window').width * 0.8}
            buttonHeight={50}
            fontSize={15}
            borderColor="#FF7E5F"
            textColor="#FF7E5F"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: Colors.textSecondary,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default OrderSuccessPage;
