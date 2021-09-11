import React, { useCallback, useState } from 'react';
import { dbService, storageService } from 'myfirebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Tweets = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = useCallback(async () => {
    const ok = window.confirm('Are you sure you want delete?');
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  }, [tweetObj.attachmentUrl, tweetObj.id]);

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
    <div className="tweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container tweetEdit">
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              required
              onChange={onChange}
              autoFocus
              className="formInput"
            />
            <button type="submit" className="formBtn">
              Update Tweet
            </button>
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="tweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweets;
