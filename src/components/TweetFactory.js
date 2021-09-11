import React, { useCallback, useState } from 'react';
import { dbService, storageService } from 'myfirebase';
import { v4 as uuidv4 } from 'uuid';

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

  const onClearAttatchment = () => setAttachment(null);

  const onChange = useCallback(e => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  }, []);

  const onSubmit = useCallback(
    async e => {
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
      <form onSubmit={onSubmit}>
        <input type="text" value={tweet} onChange={onChange} placeholder="what's on your mind?" maxLength={120} />
        <button type="submit">tweet 버튼</button>
        <br />
        <input type="file" accept="image/*" onChange={onFileChange} />
        {attachment && (
          <div>
            <img src={attachment} alt="사진" width="50px" height="50px" />
            <button onClick={onClearAttatchment}>Clear</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default TweetFactory;
