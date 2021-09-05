import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from '../myfirebase';

const Profile = () => {
  const history = useHistory();
  const onLogoutClick = useCallback(() => {
    authService.signOut();
    history.push('/');
  }, [history]);

  return <button onClick={onLogoutClick}>Log Out</button>;
};

export default Profile;
