import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, FlatList, Pressable } from 'react-native';
import { CheckBox } from '@rneui/themed';
import Dropdown from  "../components/Dropdown";
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { query, where, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { database } from '../../firebase';
import { Haversine } from '../Haversine';
import UserPopup from '../components/UserPopup';

const data = [
    { label: 'Blood Group: A+', value: '1' },
    { label: 'Blood Group: A-', value: '2' },
    { label: 'Blood Group: B+', value: '3' },
    { label: 'Blood Group: B-', value: '4' },
    { label: 'Blood Group: AB+', value: '5' },
    { label: 'Blood Group: AB-', value: '6' },
    { label: 'Blood Group: O+', value: '7' },
    { label: 'Blood Group: O-', value: '8' },
];

const RequestScreen = () => {
    const [blood, setBlood] = useState(false);
    const [bloodGrp, setBloodGrp] = useState(data[0].label);
    const [platelets, setPlatelets] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const currentUser = useSelector(state => state.uid);

    const handleSubmit = () => {
        setUserInfo([]);
        const blood = bloodGrp.slice(13);
        
        ( async () => {
            const myLocationRef = doc(database, "location", currentUser);
            const myLocationSnap = await getDoc(myLocationRef);
            const myLocation = {
                lon1: myLocationSnap.data().longitude,
                lat1: myLocationSnap.data().latitude
            }

            const bloodQuery = query(collection(database, "users"), where('bloodGroup', '==', blood));
            const bloodSnapshot = await getDocs(bloodQuery);

            bloodSnapshot.forEach((user) => {
                const uid = user.id;
                ( async () => {
                    const locationQuery = query(collection(database, "location"), where("uid", "==", uid));
                    const locationSnapshot = await getDocs(locationQuery);
                    locationSnapshot.forEach((location) => {
                        const distance = Haversine(myLocation, {
                            lon2: location.data().longitude,
                            lat2: location.data().latitude
                        })
                        if (currentUser != uid && !isNaN(distance)) {
                            setUserInfo(prev => [
                                ...prev,
                                {
                                    uid: uid,
                                    name: user.data().name,
                                    phone: user.data().phone,
                                    distance: distance
                                }
                            ])
                        }
                    })
                })();
            })
        })();
    }

    return (
        <View style={styles.container}>
            <Text>Kindly fill below details accourately to help you better</Text>
            <Text style={{marginTop: 20, color: 'rgb(105,105,105)'}}>Type</Text>
            <View style={styles.type}>
                <CheckBox
                    title="Blood"
                    center
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={blood}
                    onPress={() => {
                        setBlood(true);
                        setPlatelets(false);
                    }}
                />
                <CheckBox
                    title="Platelets"
                    center
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={platelets}
                    onPress={() => {
                        setBlood(false);
                        setPlatelets(true);
                    }}
                />
            </View>
            <Dropdown
                style1={{marginTop: 10, marginBottom: 5 }}
                style2={{width: '100%'}}
                state={bloodGrp}
                onChangeValue={value => {
                    setBloodGrp(value);
                }}
                myData={data}
            />
            <Text style={{marginTop: 30, color: 'rgb(105,105,105)'}}>Blood Units Required</Text>
            <TextInput 
                placeholder='Blood Units'
                placeholderTextColor="black"
                style={styles.inputStyle}
            />
            <Button 
                text="Submit"
                onSubmit={handleSubmit}
            />
            <FlatList
                data={userInfo}
                keyExtractor={item => item.uid}
                renderItem={({item}) => {
                    return <UserPopup name={item.name} distance={item.distance} />
                }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        marginHorizontal: 30,
        flex: 1
    },
    dropdown: {
        width: '100%'
    },
    inputStyle: {
        backgroundColor: 'rgb(220,220,220)',
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 5
    },
    type: {
        flexDirection: 'row'
    }
});

export default RequestScreen;