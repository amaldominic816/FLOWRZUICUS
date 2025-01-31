import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

const ButtonPrimary = ({
  onPress,
  buttonText,
  buttonWidth = Dimensions.get('window').width * 0.8, // Default to 80% of the screen width
  buttonHeight = 50, // Default height
  fontSize = 18, // Default font size for the text
  gradientColors = ['#DE8542', '#FE5993 '], // Default gradient colors
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, { width: buttonWidth, height: buttonHeight }]}>
        <Text style={[styles.buttonText, { fontSize }]}>{buttonText}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

ButtonPrimary.propTypes = {
  onPress: PropTypes.func.isRequired, // Function for navigation or action
  buttonText: PropTypes.string.isRequired, // Button label text
  buttonWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Width of the button
  buttonHeight: PropTypes.number, // Height of the button
  fontSize: PropTypes.number, // Font size for the button text
  gradientColors: PropTypes.arrayOf(PropTypes.string), // Array of gradient colors
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily:'DMSans-Bold',
    textAlign: 'center',
  },
});

export default ButtonPrimary;
