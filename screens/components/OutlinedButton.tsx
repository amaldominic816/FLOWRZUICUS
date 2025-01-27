import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

const OutlinedButton = ({ title, icon, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.contentContainer}>
        {icon && <Image source={icon} style={styles.icon} />}
        {title && <Text style={styles.text}>{title}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#e94e77',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 30,
  },
  text: {
    fontSize: 16,
    color: '#e94e77',
    fontFamily:'DMSans-SemiBold',
  },
});

export default OutlinedButton;
