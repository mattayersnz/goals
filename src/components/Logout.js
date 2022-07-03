import React from 'react';
import { signOut } from "firebase/auth";

function Logout({ auth, setLoggedIn }) {

  const logout = async () => {
    await signOut(auth);
    setLoggedIn(false);
  }

  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Logout;
