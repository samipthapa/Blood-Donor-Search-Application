import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const Button = ({ text, navigation }) => {
    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Map')}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: 'rgb(206,38,1)',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        marginVertical: '7%'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default Button;