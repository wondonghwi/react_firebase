import React, { useEffect, useState } from 'react';
import RouterComponent from './RouterComponent';
import { authService } from 'myfirebase';

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return <>{init ? <RouterComponent isLoggedIn={isLoggedIn} /> : 'Initializing....'}</>;
};

export default App;
