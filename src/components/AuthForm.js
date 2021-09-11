import React, { useCallback, useState } from 'react';
import { authService } from 'myfirebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthForm = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    newAccount: true,
    error: '',
  });

  const { email, password, newAccount, error } = inputs;

  const handleChange = useCallback(
    e => {
      const { name, value } = e.target;
      setInputs({ ...inputs, [name]: value });
    },
    [inputs]
  );

  const toggleAccount = useCallback(() => {
    setInputs({
      ...inputs,
      newAccount: !newAccount,
    });
  }, [inputs, newAccount]);

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
      setInputs({
        ...inputs,
        error: error.message,
      });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={handleChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={handleChange}
          className="authInput"
        />
        <input type="submit" className="authInput authSubmit" value={newAccount ? 'Create Account' : 'Sign In'} />
      </form>
      {error && <span className="authError">{error}</span>}
      <span onClick={toggleAccount}>{newAccount ? 'Sign In' : 'Create Account'}</span>
    </div>
  );
};

export default AuthForm;
