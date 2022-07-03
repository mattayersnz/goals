import React from 'react';
import Logout from './components/Logout';
import Goals from './components/Goals';

function App({ auth, setLoggedIn, userId }) {

  return (
    <>
      <Goals auth={auth} userId={userId} />
      <Logout auth={auth} setLoggedIn={setLoggedIn} />
    </>
  );
}

export default App;
