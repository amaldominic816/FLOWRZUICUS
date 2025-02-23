import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    Platform,
    StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../components/Colors';

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
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
        });
    };

    const safeAreaStyle = {
        paddingTop:
            Platform.OS === 'android'
                ? (StatusBar.currentHeight ?? 0) + 20
                : 0,
    };

    return (
        <SafeAreaView style={[styles.safeArea, safeAreaStyle]}>
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
                            onChangeText={(value) =>
                                handleChange(value, index)
                            }
                            keyboardType="number-pad"
                            maxLength={1}
                            onKeyPress={({ nativeEvent }) => {
                                if (
                                    nativeEvent.key === 'Backspace' &&
                                    !digit &&
                                    index > 0
                                ) {
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
                    Don't get your otp,{' '}
                    <Text style={styles.tryAgain}>try again</Text>
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    logo: {
        fontSize: 36,
        fontFamily: 'DMSans-Bold', marginBottom: 20,
        color: '#FF7A78',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'DMSans-Regular',
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
        fontFamily: 'DMSans-Regular',
        color: '#000',
        backgroundColor: '#fff',
    },
    inputFilled: {
        borderColor: '#00C851',
    },
    buttonWrapper: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 40,
    },
    button: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: '80%',
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    resendText: {
        marginTop: 20,
        fontSize: 14,
        color: '#666',
        fontFamily: 'DMSans-Regular',
    },
    tryAgain: {
        color: '#FF7A78',
        fontFamily: 'DMSans-Bold',
    },
});

export default OTPScreen;
