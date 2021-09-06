import React, { useCallback, useEffect, useState } from 'react';
import { dbService } from '../myfirebase';

const Home = () => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);

  const getTweets = useCallback(async () => {
    const dbTweets = await dbService.collection('tweets').get();
    dbTweets.forEach(document => {
      const tweetObject = {
        ...document.data(),
        id: document.id,
      };
      setTweets(prev => [tweetObject, ...prev]);
    });
  }, []);

  useEffect(() => {
    getTweets();
  }, [getTweets]);

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      await dbService.collection('tweets').add({
        tweet,
        createdAt: Date.now(),
      });
      setTweet('');
    },
    [tweet]
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
            <h4>{tweet.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
