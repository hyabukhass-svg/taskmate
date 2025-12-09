export default function Signup({ onLoginSuccess, onSwitchToLogin }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Signup Page</h2>
      <button onClick={onLoginSuccess}>Signup & Login</button>
      <p>
        Already have an account? <button onClick={onSwitchToLogin}>Login</button>
      </p>
    </div>
  );
}
