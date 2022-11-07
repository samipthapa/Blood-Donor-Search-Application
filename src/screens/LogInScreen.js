import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Button from "../components/Button";
import Input from "../components/Input";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LogInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log("Logged in with: " + user.email);
                navigation.navigate('Map');
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
            })
    }
    
    return (
        <View style={styles.container}>
            <Image 
                style={styles.imageStyle}
                source={require('../../assets/Blood.png')}
            />

            <Input
                title='Email'
                state={email}
                onChange={value => setEmail(value)}
            />

            <Input 
                title='Password' 
                isPassword={true}
                state={password}
                onChange={passwd => setPassword(passwd)} 
            />

            <Button 
                text="Login"
                onSubmit={handleLogin}
                navigation={navigation}
            />

            <View style={styles.newUser}>
                <Text style={{fontSize: 16}}>New user? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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