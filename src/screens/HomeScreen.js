import React from 'react';
import { StyleSheet } from 'react-native';
import MapComponent from "../components/MapComponent";
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import store from '../store';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const uid = useSelector(state => state.uid);
    const token = store.getState().fcmToken;

    firestore()
        .collection('users')
        .doc(uid)
        .update({
            fcmToken: token
        })

    firestore()
        .collection('users')
        .where('uid', '==', uid)
        .get()
        .then(querySnapshot => {
            const dataArr = querySnapshot.docs.map((item) => {
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