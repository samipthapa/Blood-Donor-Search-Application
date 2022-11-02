import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';

const Input = ({ title, isPassword, onChange, state }) => {
    return (
        <View style={title=="Phone" ? {flex:0.95, height: 60} : null}>
            <Text style={styles.textStyle}>{title}</Text>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                secureTextEntry={isPassword}
                value={state}
                onChangeText={value => onChange(value)}
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
    },
});

export default Input;