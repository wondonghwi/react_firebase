import React, { useCallback, useState } from 'react';
import { dbService } from '../myfirebase';

const Tweets = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = useCallback(async () => {
    const ok = window.confirm('Are you sure you want delete?');
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
    }
  }, [tweetObj.id]);

  const toggleEditing = useCallback(() => {
    setEditing(prev => !prev);
  }, []);

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      await dbService.doc(`tweets/${tweetObj.id}`).update({
        text: newTweet,
      });
      setEditing(prev => !prev);
    },
    [newTweet, tweetObj.id]
  );

  const onChange = useCallback(e => {
    const { value } = e.target;
    setNewTweet(value);
  }, []);

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="Edit your tweet" value={newTweet} required onChange={onChange} />
            <button type="submit">Update Tweet</button>
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} width="50px" height="50px" />}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Tweet</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweets;
