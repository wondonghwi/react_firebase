import React, { useCallback, useState } from 'react';
import { dbService, storageService } from 'myfirebase';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const onFileChange = e => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const { result } = finishedEvent.currentTarget;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment('');

  const onChange = useCallback(e => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  }, []);

  const onSubmit = useCallback(
    async e => {
      if (tweet === '') {
        return;
      }
      e.preventDefault();
      let attachmentUrl = '';
      if (attachment !== '') {
        const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, 'data_url');
        attachmentUrl = await response.ref.getDownloadURL();
      }
      const tweetObj = {
        text: tweet,
        createdAt: Date.now(),
        createId: userObj.uid,
        attachmentUrl,
      };
      await dbService.collection('tweets').add(tweetObj);
      setTweet('');
      setAttachment('');
    },
    [attachment, tweet, userObj.uid]
  );

  return (
    <div>
      <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={tweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <button type="submit" className="factoryInput__arrow">
            &rarr;
          </button>
        </div>
        <label htmlFor="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />
        {attachment && (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              style={{
                backgroundImage: attachment,
              }}
            />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TweetFactory;
