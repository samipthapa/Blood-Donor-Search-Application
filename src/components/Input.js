import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';

const Input = ({ title, isPassword }) => {
    return (
        <View>
            <Text style={styles.textStyle}>{title}</Text>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                secureTextEntry={isPassword}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(105,105,105)',
        marginBottom: '5%',
    },
    textStyle: {
        color: 'rgb(105,105,105)',
    }
});

export default Input;