import React, { useState } from 'react';
import RouterComponent from './RouterComponent';
import { auth } from 'myfirebase';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  return <RouterComponent isLoggedIn={isLoggedIn} />;
};

export default App;
