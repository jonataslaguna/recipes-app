import { useState } from 'react';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function Login() {
  const [formLogin, setFormLogin] = useState(INITIAL_STATE);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email } = formLogin;
    const userEmail = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(userEmail));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    setFormLogin({
      ...formLogin,
      [id]: value,
    });
  };

  return (
    <form onSubmit={ handleSubmit }>

      <h1>Login</h1>

      <input
        data-testid="email-input"
        type="email"
        id="email"
        placeholder="E-mail"
        value={ formLogin.email }
        onChange={ handleChange }
      />
      <input
        data-testid="password-input"
        type="password"
        id="password"
        placeholder="Password"
        value={ formLogin.password }
        onChange={ handleChange }
      />
      <button
        data-testid="login-submit-btn"
        disabled={ !emailRegex.test(formLogin.email) || formLogin.password.length < 7 }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
