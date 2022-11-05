import React from "react";
import { View, StyleSheet, Text } from 'react-native';

const AccountInfo = ({ icon, heading, subheading}) => {
    return (
        <View style={styles.container}>
            <View>
                {icon}
            </View>
            <View>
                <Text style={styles.name}>{heading}</Text>
                <Text style={styles.subHeading}>{subheading}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(105,105,105)',
        flexDirection: 'row',
        marginVertical: 10,
        paddingVertical: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    subHeading: {
        fontWeight: 'bold',
        color: 'rgb(105,105,105)',
        fontSize: 14,
    },
});

export default AccountInfo;