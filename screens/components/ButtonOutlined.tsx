import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const ButtonOutlined = ({
  onPress,
  buttonText,
  buttonWidth = Dimensions.get('window').width * 0.8, // Default to 80% of the screen width
  buttonHeight = 50, // Default height
  fontSize = 16, // Default font size for the text
  borderColor = '#FD3A84', // Default border color
  textColor = '#FD3A84', // Default text color
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, { width: buttonWidth, height: buttonHeight, borderColor }]}
    >
      <Text style={[styles.buttonText, { fontSize, color: textColor }]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

ButtonOutlined.propTypes = {
  onPress: PropTypes.func.isRequired, // Function for navigation or action
  buttonText: PropTypes.string.isRequired, // Button label text
  buttonWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Width of the button
  buttonHeight: PropTypes.number, // Height of the button
  fontSize: PropTypes.number, // Font size for the button text
  borderColor: PropTypes.string, // Border color for the button
  textColor: PropTypes.string, // Text color for the button
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2, // Border thickness
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
    fontFamily:'DMSans-SemiBold',
  },
});

export default ButtonOutlined;
