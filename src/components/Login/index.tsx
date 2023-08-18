function Login() {
  return (
    <form>
      <input
        data-testid="email-input"
        type="email"
        id="email"
      />
      <input
        data-testid="password-input"
        type="password"
        id="password"
      />
      <button
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
