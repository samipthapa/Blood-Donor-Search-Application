import { database } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Haversine } from "../Haversine";
import { useState } from "react";

const useHaversine = (bloodGrp, location) => {
    const [data, setData] = useState(null);
    const blood = bloodGrp.slice(13);

    const userRef = collection(database, 'users');
    const locationRef = collection(database, 'location');

    const bloodQuery = query(userRef, where("bloodGroup", "==", blood));
    onSnapshot(bloodQuery, (data) => {
        const userArr = data.docs.map((item) => {
            return item.data();
        })
        console.log(userArr);

        for (let i=0; i<userArr.length; i++) {
            const locationQuery = query(locationRef, where("uid", "==", userArr[i]['uid']));
            onSnapshot(locationQuery, (data) => {
                const locationArr = data.docs.map((item) => {
                    return item.data();
                })
                const distance = Haversine({
                    lon1: locationArr[0]['longitude'],
                    lat1: locationArr[0]['latitude']
                }, {
                    lon2: location.longitude,
                    lat2: location.latitude
                })
                console.log(distance);
            })
        }
    })
}

export default useHaversine;