import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";
import Login from './components/Login';
import App from './App';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg3KYj9kegfhPzAmhYQVLPJAZ_WfZwc7A",
  authDomain: "goals-14c40.firebaseapp.com",
  projectId: "goals-14c40",
  storageBucket: "goals-14c40.appspot.com",
  messagingSenderId: "501449235566",
  appId: "1:501449235566:web:1aa2d55ff4374444361a7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Features
const auth = getAuth(app);


function Auth() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [status, setStatus] = useState('')

  const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setLoggedIn(true)
        setStatus('');
      }
    })
  }

  monitorAuthState();

  // If Authenticated
  if (loggedIn) {
    return <App
            auth={auth}
            setLoggedIn={setLoggedIn}
            />
  }

  else {
    return (
    <>
      <Login
        auth={auth}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        status={status}
        setStatus={setStatus}
        />
    </>
  )};
}

export default Auth;
