import React, { useCallback, useEffect, useState } from 'react';
import { authService } from 'myfirebase';
import RouterComponent from 'components/RouterComponent';

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: args => user.updateProfile(args),
        });
      } else {
      }
      setInit(true);
    });
  }, []);
  const refreshUser = useCallback(() => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: args => user.updateProfile(args),
    });
  }, []);
  return (
    <>
      {init ? (
        <RouterComponent refreshUser={refreshUser} isLoggedIn={!!userObj} userObj={userObj} />
      ) : (
        'Initializing....'
      )}
    </>
  );
};

export default App;
