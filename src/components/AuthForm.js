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
    </div>
  );
};

export default AuthForm;
