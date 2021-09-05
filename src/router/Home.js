import React, { useCallback, useState } from 'react';
import { dbService } from '../myfirebase';

const Home = () => {
  const [tweet, setTweet] = useState('');
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
    </div>
  );
};

export default Home;
