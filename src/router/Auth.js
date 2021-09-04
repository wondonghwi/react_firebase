import React, { useCallback, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { authService, firebaseInstance } from '../myfirebase';

const Auth = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    newAccount: true,
  });
  const [error, setError] = useState('');

  const { email, password, newAccount } = inputs;

  const handleChange = useCallback(
    e => {
      const { name, value } = e.target;
      setInputs({ ...inputs, [name]: value });
    },
    [inputs]
  );

  const toggleAccount = useCallback(() => {
    setInputs({
      email: email,
      password: password,
      newAccount: !newAccount,
    });
  }, [email, newAccount, password]);

  const onSocialClick = async e => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === 'google') {
      //TODO GoogleAuthProvider
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      //TODO GithubAuthProvider
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  const onSubmit = async event => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="Email" required value={email} onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={handleChange}
        />
        {newAccount ? <input type="submit" value="Create Account" /> : <input type="submit" value="Log In" />}
      </form>
      <div>{error}</div>
      <span onClick={toggleAccount}>{newAccount ? 'Sign In' : 'Create Account'}</span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
