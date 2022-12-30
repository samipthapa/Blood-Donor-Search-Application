import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Fontisto } from '@expo/vector-icons'; 

const data = [
    { label: 'A+', value: '1' },
    { label: 'A-', value: '2' },
    { label: 'B+', value: '3' },
    { label: 'B-', value: '4' },
    { label: 'AB+', value: '5' },
    { label: 'AB-', value: '6' },
    { label: 'O+', value: '7' },
    { label: 'O-', value: '8' },
    { label: '-', value: '8' }
];

const DropdownComponent = ({ state, onChangeValue, myData, style1, style2 }) => {
    return (
        <View style={style2 ? [styles.container, style2] : styles.container}>
        <Text style={style1 ? [{color: 'rgb(105,105,105)', fontSize: 15}, style1] : {color: 'rgb(105,105,105)'}}>Blood Group</Text>
        <Dropdown
            style={styles.dropdown}
            iconStyle={styles.iconStyle}
            data={myData ? myData : data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={state ? state : '...'}
            value={state}
            onChange={item => onChangeValue(item.label)}
            renderLeftIcon={() => (
            <Fontisto 
                style={styles.icon}
                name="blood-drop" 
                size={24}
                color="red"
            />
            )}
        />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
container: {
    width: 105,
    height: 60,
},
dropdown: {
    height: 29,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(105,105,105)',
    paddingHorizontal: 8,
},
icon: {
    marginHorizontal: 10,
},
});