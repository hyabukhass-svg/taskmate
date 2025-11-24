export default function Login({ onLoginSuccess, onSwitchToSignup }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login Page</h2>
      <button onClick={onLoginSuccess}>Login</button>
      <p>
        Don't have an account? <button onClick={onSwitchToSignup}>Signup</button>
      </p>
    </div>
  );
}
