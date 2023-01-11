import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import Button from './Button';
import { useSelector } from 'react-redux';

const UserPopup = ({name, distance, token}) => {
    const data = useSelector(state => state.userData);
    const sendNotification = () => {
        fetch('https://350d-110-44-116-42.ngrok.io/send-notification', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name: data.name,
                token: token,
            })
        })
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                <Image style={styles.imageStyle} source={require('../../assets/Avatar.png')} />
                <View>
                    <Text style={styles.textStyle}>{name}</Text>
                    <Text>{distance} KM</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    text="Send Request"
                    buttonStyle={{width: 140, backgroundColor: 'rgb(50,205,50)', borderRadius: 20,
                     padding: 7, alignItems: 'center', marginTop: 5}}
                    textStyle={{color: 'black', fontSize: 16, fontWeight: 'bold'}}
                    onSubmit={sendNotification}
                />
                <Button 
                    text="Cancel"
                    buttonStyle={{width: 140, backgroundColor: 'rgb(206,38,1)', borderRadius: 20,
                     padding: 7, alignItems: 'center', marginTop: 5}}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(238, 238, 228)',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10
    },
    imageStyle: {
        height: 50,
        width: 50,
        marginHorizontal: 10,
    },
    textStyle: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default UserPopup;