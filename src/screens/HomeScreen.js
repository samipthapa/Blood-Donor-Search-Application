import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapComponent from "../components/MapComponent";
import { query, where, collection, onSnapshot } from 'firebase/firestore';
import { database } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const uid = useSelector(state => state.uid); 
    const collectionRef = collection(database, 'users');
    const userQuery = query(collectionRef, where("uid", "==", uid));

    onSnapshot(userQuery, (data) => {
        const dataArr =data.docs.map((item) => {
            return item.data();
        })
        dispatch({type: 'userData', payload: dataArr[0]});
    })
    return (
        <MapComponent />
    );
};

const styles = StyleSheet.create({

});

export default HomeScreen;