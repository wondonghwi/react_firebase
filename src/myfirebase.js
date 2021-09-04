import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD8FuknfyzIOQPkULyexMjRcFUYYJ4_pW8',
  authDomain: 'react-firebase-8c9d8.firebaseapp.com',
  projectId: 'react-firebase-8c9d8',
  storageBucket: 'react-firebase-8c9d8.appspot.com',
  messagingSenderId: '612096016218',
  appId: '1:612096016218:web:f58f94f6235e9886bafd63',
};

//TODO .env파일로 지정하면 firebase에서 오류를 내서 일단 값 꺼내서 사용
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };

initializeApp(firebaseConfig);
export const auth = getAuth();
