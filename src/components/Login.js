import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

function Login({ auth, loggedIn, setLoggedIn, status, setStatus }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    <>
      <div className="inputs">
        <span>Email</span>
        <input type="url" autoComplete="type your email" value={email} onChange={(event) => {
                  setEmail(event.target.value);
                }} />
        <span>Password</span>
        <input type="url" autoComplete="off" value={password} onChange={(event) => {
                  setPassword(event.target.value);
                }} />
      </div>
      <div className="buttons">
        { !loggedIn && <button onClick={loginEmailPassword}>Login</button> }
        { !loggedIn && <button onClick={createAccount}>Signup</button> }
        {status.length ? <p>{status}</p> : null}
      </div>
    </>
  );
}

export default Login;
