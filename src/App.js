import React from 'react';
import Logout from './components/Logout';
import Goals from './components/Goals';

function App({ auth, setLoggedIn }) {

  return (
    <>
      <Goals auth={auth} />
      <Logout auth={auth} setLoggedIn={setLoggedIn} />
    </>
  );
}

export default App;
