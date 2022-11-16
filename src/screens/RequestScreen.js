import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { CheckBox } from '@rneui/themed';
import Dropdown from  "../components/Dropdown";
import Button from '../components/Button';

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
                    console.log(value);
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
            <Button text="Submit" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '70%',
        width: '80%',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center'
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