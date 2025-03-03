import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ReferralScreen = () => {
    const claimedRewards = [
        { store: "Awesome Store 1", discount: "20% off", amount: "$20" },
        { store: "Awesome Store 1", discount: "10% off", amount: "$10" },
        { store: "Awesome Store 1", discount: "20% off", amount: "$20" },
        { store: "Awesome Store 1", discount: "10% off", amount: "$10" },
    ];

    return (
        <LinearGradient colors={['#FF7B3E', '#FF3E7B']} style={styles.container}>
            <ScrollView>
                {/* Header Section */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <Text style={styles.backText}>{'\u2B05'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Referral & Earn</Text>
                    <TouchableOpacity style={styles.helpButton}>
                        <Text style={styles.helpText}>{'\u003F'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Banner Section */}
                <View style={styles.banner}>
                    <Image source={require('../../assets/images/referal.png')} style={styles.giftImage} />
                    <Text style={styles.subtitle}>Refer & Earn $20,000</Text>
                </View>

                {/* Referral Code Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Code"
                        placeholderTextColor="#777"
                        defaultValue="SAM001"
                    />
                    <TouchableOpacity style={styles.applyButton}>
                        <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                </View>

                {/* Claimed Rewards Section */}
                <Text style={styles.claimedTitle}>Claimed</Text>
                {claimedRewards.map((reward, index) => (
                    <View key={index} style={styles.rewardRow}>
                        <Image source={require('../../assets/images/referal.png')} style={styles.rewardImage} />
                        <View style={styles.rewardDetails}>
                            <Text style={styles.storeText}>{reward.store}</Text>
                            <Text style={styles.discountText}>claimed {reward.discount}</Text>
                        </View>
                        <Text style={styles.amountText}>{reward.amount}</Text>
                    </View>
                ))}
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    backButton: {
        padding: 5,
    },
    backText: {
        fontSize: 20,
        color: '#FFF',
    },
    title: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    helpButton: {
        padding: 5,
    },
    helpText: {
        fontSize: 18,
        color: '#FFF',
    },
    banner: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    giftImage: {
        width: 100,
        height: 100,
    },
    subtitle: {
        fontSize: 18,
        color: '#FFF',
        marginTop: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        borderRadius: 25,
        padding: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 15,
        fontSize: 16,
        borderRadius: 25,
    },
    applyButton: {
        backgroundColor: '#FF947A',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginRight: 5,
    },
    applyButtonText: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: 'bold',
    },
    claimedTitle: {
        fontSize: 16,
        color: '#FFF',
        margin: 20,
    },
    rewardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    rewardImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    rewardDetails: {
        flex: 1,
    },
    storeText: {
        fontSize: 16,
        color: '#FF5C39',
        fontWeight: 'bold',
    },
    discountText: {
        fontSize: 12,
        color: '#777',
    },
    amountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF5C39',
    },
});

export default ReferralScreen;
