import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import DropdownComponent from '../components/Dropdown';

const SignUpScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={{marginBottom: '16%'}}>
                <Text>looks like you're new here.</Text>
                <Text style={styles.header}>Sign Up Now</Text> 
            </View>
            <Input title='Full Name' />
            <Input title='Email' />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> 
                <Input title='Phone'/>
                <DropdownComponent />
            </View>
            <Input title='Password' isPassword={true}/>
            <Input title='Confirm Password' isPassword={true}/>
            <Button text="Sign Up" />
            <View style={styles.newUser}>
                <Text style={{fontSize: 16}}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signUp}>Login here</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
        height: '85%',
        justifyContent: 'center'
    },
    header: {
        color: 'rgb(206,38,1)',
        fontSize: 30,
        fontWeight: 'bold'
    },
    newUser: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    signUp: {
        fontWeight: 'bold',
        color: 'rgb(206,38,1)',
        fontSize: 16
    },
});

export default SignUpScreen;