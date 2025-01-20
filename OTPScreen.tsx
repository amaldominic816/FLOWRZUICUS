import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const OTPScreen = ({ navigation }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputs = useRef([]);

    const handleChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputs.current[index + 1]?.focus();
        }

        if (!value && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const enteredOtp = otp.join('');
        console.log('OTP Entered:', enteredOtp);

        // Navigate to Product Overview Screen
        navigation.navigate('ProductOverview');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>FLOWRZ</Text>
            <Text style={styles.subtitle}>Verify your phone number</Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(el) => (inputs.current[index] = el)}
                        style={[
                            styles.input,
                            digit ? styles.inputFilled : null,
                        ]}
                        value={digit}
                        onChangeText={(value) => handleChange(value, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
                                inputs.current[index - 1]?.focus();
                            }
                        }}
                    />
                ))}
            </View>

            <TouchableOpacity onPress={handleVerify}>
                <LinearGradient
                    colors={['#DE8542', '#FE5993']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.button, { width: screenWidth * 0.8 }]}
                >
                    <Text style={styles.buttonText}>SUBMIT OTP</Text>
                </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.resendText}>
                Don't get your otp, <Text style={styles.tryAgain}>try again</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    logo: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FF7A78',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    input: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
        backgroundColor: '#fff',
    },
    inputFilled: {
        borderColor: '#00C851',
    },
    button: {
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom: 0,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    resendText: {
        marginTop: 20,
        fontSize: 14,
        color: '#666',
    },
    tryAgain: {
        color: '#FF7A78',
        fontWeight: 'bold',
    },
});

export default OTPScreen;
