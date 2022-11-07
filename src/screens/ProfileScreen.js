import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AccountInfo from '../components/AccountInfo';
import { AntDesign, Ionicons, Fontisto, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <LinearGradient 
                style={styles.header}
                colors={["#ee0979", "#ff6a00"]}>

                    <View>
                        <Image style={styles.imageStyle}source={require('../../assets/Avatar.png')}/>
                        <Text style={styles.headerText}>Samip Bikram Thapa</Text>
                        <Text style={{color: 'white', fontSize: 16, alignSelf: 'center'}}>samipthapa99@gmail.com</Text>
                    </View>
            </LinearGradient>

            <View style={styles.body}>
                <Text style={styles.heading}>Account Info</Text>
                <AccountInfo 
                    icon={<Ionicons style={styles.icon} name="person" size={35} color="black" />}
                    heading="Name"
                    subheading="Samip Bikram Thapa"
                />

                <AccountInfo
                    icon={<AntDesign style={styles.icon} name="mobile1" size={35} color="black" />}
                    heading="Mobile"
                    subheading="9844054821"
                />

                <AccountInfo
                    icon={<Fontisto style={styles.icon} name="blood-drop" size={35} color="black" />}
                    heading="Blood Group"
                    subheading="AB+"
                />

                <AccountInfo
                    icon={<Entypo style={styles.icon} name="mail" size={35} color="black" />}
                    heading="Email"
                    subheading="samipthapa99@gmail.com"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    header: {
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    body: {
        padding: 30,
        margin: 10,
    },
    heading: {
        fontSize: 23,
        fontWeight: 'bold'
    },
    icon: {
        marginHorizontal: 5,
        width: 35,
        textAlign: 'center'
    },
    imageStyle: {
        width: 96,
        height: 96,
        alignSelf: 'center'
    },
    backIcon: {
        marginLeft: 10,
        marginTop: 30
    }
});

export default ProfileScreen;