import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   query,
//   collection,
//   onSnapshot
// } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

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
// const firestore = getFirestore();


function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setLoggedIn(true)
        setStatus('');
      }
    })
  }

  const logout = async () => {
    await signOut(auth);
    setLoggedIn(false);
  }

  monitorAuthState();

  const showLoginError = (error) => {
    if (error.code === 'auth/invalid-email') {
      setStatus('Invalid email, please try again')
    }
    else if (error.code === 'auth/wrong-password') {
      setStatus('Wrong password, please try again')
    }
    else if (error.code === 'auth/weak-password') {
      setStatus('That password is too weak sorry, please try again')
    }
    else {
      setStatus(error.code)
    }
  }

  const loginEmailPassword = async () => {
    const loginEmail = email
    const loginPassword = password
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      setEmail('')
      setPassword('')
    }
    catch(error) {
      console.log(error);
      showLoginError(error);
    }
  }

  const createAccount = async () => {
    const signupEmail = email
    const signupPassword = password
    try {
      await createUserWithEmailAndPassword (auth, signupEmail, signupPassword)
      setEmail('')
      setPassword('')
    }
    catch(error) {
      console.log(error);
      showLoginError(error);
    }
  }

  return (
    <div className="GoalsApp">
      <h1 className="title">Goals🔥</h1>

      { !loggedIn && <div className="inputs">
        <span>Email</span>
        <input type="url" autoComplete="type your email" value={email} onChange={(event) => {
                  setEmail(event.target.value);
                }} />
        <span>Password</span>
        <input type="url" autoComplete="off" value={password} onChange={(event) => {
                  setPassword(event.target.value);
                }} />
      </div>}
      <div className="buttons">
        { !loggedIn && <button onClick={loginEmailPassword}>Login</button> }
        { !loggedIn && <button onClick={createAccount}>Signup</button> }
        <button onClick={logout}>Logout</button>
      </div>
      {status.length ? <p>{status}</p> : null}
    </div>
  );
}

export default App;
