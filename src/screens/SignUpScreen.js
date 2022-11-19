import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import DropdownComponent from '../components/Dropdown';
import { database } from '../../firebase';
import { collection, doc , setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase";

const SignUpScreen = ({ navigation }) => {
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        bloodGroup: '',
        location: {}
    });
    const collectionRef = collection(database, 'users');

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log("User created with: " + user.email);

                setDoc(doc(database, "users", user.uid), {
                    ...data,
                    uid: user.uid
                })
                .then(() => console.log('Data Added'))
                .catch(err => console.log(err.message))
            })
            .catch(err => console.log(err.message));
    }

    return (
        <View style={styles.container}>
            <View style={{marginBottom: '16%'}}>
                <Text>looks like you're new here.</Text>
                <Text style={styles.header}>Sign Up Now</Text> 
            </View>

            <Input 
                title='Full Name' 
                state={data.name}
                onChange={value => {setData(prev => ({...prev, name: value}))}}
            />

            <Input 
                title='Email'
                state={data.email}
                onChange={value => {setData(prev => ({...prev, email: value}))}}
            />

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> 
                <Input 
                    title='Phone'
                    state={data.phone}
                    onChange={value => {setData(prev => ({...prev, phone: value}))}}
                />
                <DropdownComponent 
                    state={data.bloodGroup}
                    onChangeValue={value => {setData(prev => ({...prev, bloodGroup: value}))}}
                />
            </View>

            <Input 
                title='Password' 
                isPassword={true}
                state={data.password}
                onChange={value => {setData(prev => ({...prev, password: value}))}}
            />

            <Input 
                title='Confirm Password' 
                isPassword={true}
                state={data.confirmPassword}
                onChange={value => {setData(prev => ({...prev, confirmPassword: value}))}}
            />
            <Button 
                text="Sign Up" 
                onSubmit={handleSignUp}
            />
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