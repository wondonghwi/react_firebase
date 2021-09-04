import React, { useCallback, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../myfirebase';

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

  const onSubmit = async event => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
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
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
