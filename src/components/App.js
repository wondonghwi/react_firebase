import React, { useEffect, useState } from 'react';
import RouterComponent from './RouterComponent';
import { authService } from 'myfirebase';

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return <>{init ? <RouterComponent isLoggedIn={isLoggedIn} userObj={userObj} /> : 'Initializing....'}</>;
};

export default App;
