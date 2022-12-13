import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBJWgDB26-MqT53nU9udyMpaSmv6mVzf28",
  authDomain: "chat-app-83361.firebaseapp.com",
  projectId: "chat-app-83361",
  storageBucket: "chat-app-83361.appspot.com",
  messagingSenderId: "443560164614",
  appId: "1:443560164614:web:25803ba4f2e68d567ef287",
  measurementId: "G-BF6JPRB6R9"
};


export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db_App = getFirestore(app)