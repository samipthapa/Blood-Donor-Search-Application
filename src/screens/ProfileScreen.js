import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AccountInfo from '../components/AccountInfo';
import { AntDesign, Ionicons, Fontisto, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { query, where, collection, onSnapshot } from 'firebase/firestore';
import { database } from '../../firebase';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
    const uid = useSelector(state => state.uid);
    const [data, setData] = useState(null);

    const collectionRef = collection(database, 'users');

   const userQuery = query(collectionRef, where("uid", "==", uid));

   onSnapshot(userQuery, (data) => {
    const dataArr =data.docs.map((item) => {
        return item.data();
    })
    setData(dataArr[0]);
   })

   if(!data) return null;

    return (
        <View style={styles.container}>
            <LinearGradient 
                style={styles.header}
                colors={["#ee0979", "#ff6a00"]}>

                    <View>
                        <Image style={styles.imageStyle}source={require('../../assets/Avatar.png')}/>
                        <Text style={styles.headerText}>{data.name}</Text>
                        <Text style={{color: 'white', alignSelf: 'center'}}>{data.email}</Text>
                    </View>
            </LinearGradient>

            <View style={styles.body}>
                <Text style={styles.heading}>Account Info</Text>
                <AccountInfo 
                    icon={<Ionicons style={styles.icon} name="person" size={35} color="black" />}
                    heading="Name"
                    subheading={data.name}
                />

                <AccountInfo
                    icon={<AntDesign style={styles.icon} name="mobile1" size={35} color="black" />}
                    heading="Mobile"
                    subheading={data.phone}
                />

                <AccountInfo
                    icon={<Fontisto style={styles.icon} name="blood-drop" size={35} color="black" />}
                    heading="Blood Group"
                    subheading={data.bloodGroup}
                />

                <AccountInfo
                    icon={<Entypo style={styles.icon} name="mail" size={35} color="black" />}
                    heading="Email"
                    subheading={data.email}
                />

                <TouchableOpacity
                    style={styles.logout}
                    onPress={() => {
                        setUser({loggedIn: false})
                    }}
                >
                    <AntDesign name="logout" size={25} color="white" style={{marginHorizontal: 4}}/>
                    <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    header: {
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        color: 'white',
        fontSize: 22,
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
        width: 90,
        height: 90,
        alignSelf: 'center'
    },
    backIcon: {
        marginLeft: 10,
        marginTop: 30
    },
    logout: {
        flexDirection: 'row',
        backgroundColor: 'rgb(219,63,64)',
        width: '35%',
        padding: 7,
        borderRadius: 20,
        marginTop: 10,
        marginLeft: 'auto',
        alignItems: 'center'
    }
});

export default ProfileScreen;