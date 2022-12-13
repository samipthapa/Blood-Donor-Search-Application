import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ text, onSubmit, buttonStyle, textStyle }) => {
    return (
        <TouchableOpacity 
            style={buttonStyle ? buttonStyle : styles.buttonStyle} 
            onPress={onSubmit}>
            <Text style={textStyle ? textStyle : styles.buttonText}>{text}</Text>
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