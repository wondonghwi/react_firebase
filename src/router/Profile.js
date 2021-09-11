import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, dbService } from 'myfirebase';

const Profile = ({ userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogoutClick = useCallback(() => {
    authService.signOut();
    history.push('/');
  }, [history]);

  const onChange = useCallback(e => {
    const { value } = e.target;
    setNewDisplayName(value);
  }, []);

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      if (userObj.displayName !== newDisplayName) {
        await userObj.updateProfile({
          displayName: newDisplayName,
        });
      }
    },
    [newDisplayName, userObj]
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={newDisplayName} placeholder="Display name" />
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={onLogoutClick}>Log Out</button>
    </>
  );
};

export default Profile;
