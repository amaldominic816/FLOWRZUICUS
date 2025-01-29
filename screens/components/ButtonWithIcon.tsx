import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

const ButtonWithIcon = ({
  onPress,
  buttonText,
  iconSource, // New prop for the icon source
  buttonWidth = Dimensions.get('window').width * 0.8,
  buttonHeight = 50,
  fontSize = 18,
  gradientColors = ['#DE8542', '#FE5993'],
  iconSize = 24, // New prop for icon size
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, { width: buttonWidth, height: buttonHeight }]}>
        <Image
          source={iconSource}
          style={{ width: iconSize, height: iconSize, marginRight: 10 }} // Adjust icon size and spacing
        />
        <Text style={[styles.buttonText, { fontSize }]}>{buttonText}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

ButtonWithIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  iconSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired, // Expect a require() or an object
  buttonWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  buttonHeight: PropTypes.number,
  fontSize: PropTypes.number,
  gradientColors: PropTypes.arrayOf(PropTypes.string),
  iconSize: PropTypes.number, // Prop type for icon size
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
    flexDirection: 'row', // Align icon and text in a row
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
  },
});

export default ButtonWithIcon;