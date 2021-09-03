import React, { useCallback, useState } from 'react';

const Auth = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs({ [name]: value });
  }, []);

  const onSubmit = event => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={inputs.email || ''}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={inputs.password || ''}
          onChange={handleChange}
        />
        <input type="submit" value="LogIn" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
