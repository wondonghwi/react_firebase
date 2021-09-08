import React, { useCallback, useEffect, useState } from 'react';
import { dbService } from '../myfirebase';
import Tweets from '../components/Tweets';

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);

  const onFileChange = e => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      console.log(finishedEvent);
    };
    reader.readAsDataURL(theFile);
  };

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <button type="submit">tweet 버튼</button>
      </form>
      {tweets.map(tweet => (
        <Tweets key={tweet.id} tweetObj={tweet} isOwner={tweet.createId === userObj.uid} />
      ))}
    </div>
  );
};

export default Home;
