// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence} from 'firebase/auth/react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1pDNS2nTGggQwy8X5TgcWBGbWuMHVEuI",
  authDomain: "blood-donor-search-bfb28.firebaseapp.com",
  projectId: "blood-donor-search-bfb28",
  storageBucket: "blood-donor-search-bfb28.appspot.com",
  messagingSenderId: "800972865766",
  appId: "1:800972865766:web:77e905a1aa0a86a05d7b27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
    
export { auth };
