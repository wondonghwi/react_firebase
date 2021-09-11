import React, { useEffect, useState } from 'react';
import { dbService } from 'myfirebase';
import Tweets from 'components/Tweets';
import TweetFactory from 'components/TweetFactory';

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService.collection('tweets').onSnapshot(snapshot => {
      const tweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  return (
    <div>
      <TweetFactory userObj={userObj} />
      <div>
        {tweets.map(tweet => (
          <Tweets key={tweet.id} tweetObj={tweet} isOwner={tweet.createId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
