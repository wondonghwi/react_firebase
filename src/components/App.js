import React, { useEffect, useState } from 'react';
import RouterComponent from './RouterComponent';
import { authService } from 'myfirebase';

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setUserObj(user);
      } else {
      }
      setInit(true);
    });
  }, []);
  return <>{init ? <RouterComponent isLoggedIn={!!userObj} userObj={userObj} /> : 'Initializing....'}</>;
};

export default App;
