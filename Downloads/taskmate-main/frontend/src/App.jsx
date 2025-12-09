import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TaskApp from "./TaskApp";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div>
      {loggedIn ? (
        <>
          {/* Logout button */}
          <button
            onClick={() => setLoggedIn(false)}
            style={{
              margin: "20px",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>

          {/* TaskApp only shows when logged in */}
          <TaskApp />
        </>
      ) : showSignup ? (
        <Signup
          onLoginSuccess={() => setLoggedIn(true)}
          onSwitchToLogin={() => setShowSignup(false)}
        />
      ) : (
        <Login
          onLoginSuccess={() => setLoggedIn(true)}
          onSwitchToSignup={() => setShowSignup(true)}
        />
      )}
    </div>
  );
}

export default App;
