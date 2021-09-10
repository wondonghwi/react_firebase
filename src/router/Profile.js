import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, dbService } from 'myfirebase';

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogoutClick = useCallback(() => {
    authService.signOut();
    history.push('/');
  }, [history]);

  const getMyTweets = useCallback(async () => {
    const tweets = await dbService
      .collection('tweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get();
    console.log(tweets.docs.map(doc => doc.data()));
  }, [userObj.uid]);

  useEffect(() => {
    getMyTweets();
  }, [getMyTweets]);

  return <button onClick={onLogoutClick}>Log Out</button>;
};

export default Profile;
