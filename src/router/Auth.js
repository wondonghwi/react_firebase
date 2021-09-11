import React from 'react';
import { authService, githubProvider, googleProvider } from 'myfirebase';
import AuthForm from 'components/AuthForm';

const Auth = () => {
  const onSocialClick = async e => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === 'google') {
      provider = new googleProvider();
    } else if (name === 'github') {
      provider = new githubProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <AuthForm />
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
