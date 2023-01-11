import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { CheckBox } from '@rneui/themed';
import Dropdown from  "../components/Dropdown";
import ButtonComponent from '../components/Button';
import { useSelector } from 'react-redux';
import { Haversine } from '../Haversine';
import UserPopup from '../components/UserPopup';
import firestore from '@react-native-firebase/firestore';

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

const Button = (props) => {
    const { label, onPress, highlightedButton, index, clearHighlight, style } = props;
    const [highlighted, setHighlighted] = useState(highlightedButton === index);

    useEffect(() => {
        if (highlightedButton !== index) {
            setHighlighted(false);
        }
    }, [highlightedButton, index])

    return (
        <TouchableOpacity 
            style={highlighted ? styles.btnPress : styles.btnNormal }
            onPress={() => {
                clearHighlight();
                setHighlighted(true);
                onPress(index);
            }}
        >
                <Text style={highlighted ? styles.textPress : null}>{label}</Text>
        </TouchableOpacity>
    )
}

const RequestScreen = () => {
    const [blood, setBlood] = useState(false);
    const [bloodGrp, setBloodGrp] = useState(data[0].label);
    const [platelets, setPlatelets] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [highlightedButton, setHighlightedButton] = useState(null);

    const currentUser = useSelector(state => state.uid);

    const clearHighlight = () => {
        setHighlightedButton(null);
    }

    const getCurrentDate=(add)=>{
 
        var date = new Date().getDate() + add;
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        if (month === 1) month = 'January';
        else if (month === 2) month = 'February';
        else if (month === 3) month = 'March';
        else if (month === 4) month = 'April';
        else if (month === 5) month = 'May';
        else if (month === 6) month = 'June';
        else if (month === 7) month = 'July';
        else if (month === 8) month = 'August';
        else if (month === 9) month = 'September';
        else if (month === 10) month = 'October';
        else if (month === 11) month = 'November';
        else if (month === 12) month = 'December';
   
        return `${date} ${month}, ${year}`;
  }

    const handleSubmit = () => {
        setUserInfo([]);
        const blood = bloodGrp.slice(13);
        
        ( async () => {

            const myLocationSnap = await firestore().collection('location').doc(currentUser).get();
            const myLocation = {
                lon1: myLocationSnap.data().longitude,
                lat1: myLocationSnap.data().latitude
            }

            const bloodSnapshot = await firestore().collection('users').where('bloodGroup', '==', blood).get();

            bloodSnapshot.forEach((user) => {
                const uid = user.id;
                ( async () => {
                    
                    const locationSnapshot = await firestore().collection('location').where("uid", "==", uid).get();

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
                                    token: user.data().fcmToken,
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
            <Text style={{ color: 'rgb(105,105,105)', fontSize:15}}>Type</Text>
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
                style1={{marginBottom: 15}}
                style2={{width: '100%'}}
                state={bloodGrp}
                onChangeValue={value => {
                    setBloodGrp(value);
                }}
                myData={data}
            />
            <Text style={styles.textStyle}>Blood Units Required</Text>
            <TextInput 
                placeholder='Blood Units'
                placeholderTextColor="black"
                style={styles.inputStyle}
            />

            <Text style={styles.textStyle}>Required Upto</Text>

            <Button
                label='Till Tomorrow'
                highlightedButton={highlightedButton}
                index={1}
                onPress={(index) => {
                    setHighlightedButton(index);
                }}
                clearHighlight={clearHighlight}
            />

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: '49%'}}>
                    <Button
                        label={getCurrentDate(2)}
                        highlightedButton={highlightedButton}
                        index={2}
                        onPress={(index) => {
                            setHighlightedButton(index);
                        }}
                        clearHighlight={clearHighlight}
                    />
                </View>
                
                <View style={{width: '49%'}}>
                    <Button
                        label={getCurrentDate(3)}
                        highlightedButton={highlightedButton}
                        index={3}
                        onPress={(index) => {
                            setHighlightedButton(index);
                        }}
                        clearHighlight={clearHighlight}
                    />
                </View>
            </View>

            <ButtonComponent 
                text="Submit"
                onSubmit={handleSubmit}
            />

            <FlatList
                data={userInfo}
                keyExtractor={item => item.uid}
                renderItem={({item}) => {
                    return <UserPopup name={item.name} distance={item.distance} token={item.token}/>
                }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: 30,
        flex: 1
    },
    dropdown: {
        width: '100%'
    },
    inputStyle: {
        backgroundColor: 'rgb(220,220,220)',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 5
    },
    type: {
        flexDirection: 'row'
    },
    thumb: {
        height: 25,
        width: 25,
        borderRadius: 20,
    },
    textStyle: {
        marginTop: 30,
        color: 'rgb(105,105,105)',
        marginBottom: 15,
        fontSize:15
    },
    btnNormal: {
        borderColor: 'rgb(105,105,105)',
        borderWidth: 1,
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
        marginBottom: 5
    },
    btnPress : {
        backgroundColor: 'rgb(206,38,1)',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
        marginBottom: 5
    },
    textPress: {
        color: 'white'
    }
});

export default RequestScreen;