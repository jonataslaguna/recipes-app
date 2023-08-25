import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import recipesIcon from '../../images/recipesIcon.svg';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function Login() {
  const [formLogin, setFormLogin] = useState(INITIAL_STATE);
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email } = formLogin;
    const userEmail = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(userEmail));
    navigate('/meals');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    setFormLogin({
      ...formLogin,
      [id]: value,
    });
  };

  return (
    <div className={ styles.loginContainer }>
      <div className={ styles.icons }>
        <img
          src={ recipesIcon }
          alt="logo"
        />
      </div>

      <form onSubmit={ handleSubmit } className={ styles.formLogin }>

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
    </div>
  );
}

export default Login;
