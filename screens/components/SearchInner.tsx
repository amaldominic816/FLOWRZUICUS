import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Platform,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Colors from './Colors';

const SearchInner = ({
    showBackButton = true, // Show or hide the back button
    showNotificationIcon = true, // Show or hide the notification icon
    showCartIcon = true, // Show or hide the cart icon
    onBackPress, // Function for back button press
    onNotificationPress, // Function for notification icon press
    onCartPress, // Function for cart icon press
    onSearch, // Function to handle search input changes
}) => {
    const [searchText, setSearchText] = useState('');

    // Dynamically calculate padding for Android
    const getHeaderPaddingTop = () => {
        if (Platform.OS === 'android') {
            return (StatusBar.currentHeight ?? 0) + -20;
        }
        return 0; // SafeAreaView handles iOS
    };

    const handleSearchChange = (text) => {
        setSearchText(text);
        if (onSearch) {
            onSearch(text);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.header, { paddingTop: getHeaderPaddingTop() }]}>
                {/* Back Button */}
                {showBackButton && (
                    <TouchableOpacity
                        style={[styles.iconButton, styles.backButton]}
                        onPress={onBackPress}
                    >
                        <Svg width="24" height="24" viewBox="0 0 24 24">
                            <Path
                                d="M15 19l-7-7 7-7"
                                stroke="#000"
                                strokeWidth="2"
                                fill="none"
                            />
                        </Svg>
                    </TouchableOpacity>
                )}

                {/* Search Bar */}
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search..."
                    placeholderTextColor="#999"
                    value={searchText} // Display current search query
                    onChangeText={handleSearchChange} // Handle input changes
                />


                {/* Icons */}
                <View style={styles.iconsContainer}>
                    {showCartIcon && (
                        <TouchableOpacity style={styles.iconButton} onPress={onCartPress}>
                            <Image
                                source={require('../../assets/images/cart.png')}
                                style={styles.iconImage}
                            />
                        </TouchableOpacity>
                    )}
                    {showNotificationIcon && (
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={onNotificationPress}
                        >
                            <Image
                                source={require('../../assets/images/notification.png')}
                                style={styles.iconImage}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: Colors.secondary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: Colors.background,
    },
    searchBar: {
        flex: 1,
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 12,
        fontSize: 16,
        marginLeft: 8,
        marginRight: 8,
        color: '#000',
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    backButton: {
        backgroundColor: Colors.backbutton,
    },
    iconImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});

export default SearchInner;
