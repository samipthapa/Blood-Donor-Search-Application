import React from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Button from "../components/Button";
import Input from "../components/Input";

const LogInScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.imageStyle}
                source={require('../../assets/Blood.png')}
            />
            <Input title='Email' />
            <Input title='Password' isPassword={true}/>
            <Button text="Login" navigation={navigation}/>
            <View style={styles.newUser}>
                <Text style={{fontSize: 16}}>New user? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signUp}>Sign Up</Text>
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
    imageStyle: {
        height: 92,
        width: 56,
        alignSelf: 'center',
        marginBottom: '10%'
    },
    signUp: {
        fontWeight: 'bold',
        color: 'rgb(206,38,1)',
        fontSize: 16
    },
    newUser: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
});

export default LogInScreen;