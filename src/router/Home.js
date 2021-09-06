import React, { useCallback, useEffect, useState } from 'react';
import { dbService } from '../myfirebase';

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState('');
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

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      await dbService.collection('tweets').add({
        text: tweet,
        createdAt: Date.now(),
        createId: userObj.uid,
      });
      setTweet('');
    },
    [tweet, userObj.uid]
  );
  const onChange = useCallback(e => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={tweet} onChange={onChange} placeholder="what's on your mind?" maxLength={120} />
        <button type="submit">tweet 버튼</button>
      </form>
      <div>
        {tweets.map(tweet => (
          <div key={tweet.id}>
            <h4>{tweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
