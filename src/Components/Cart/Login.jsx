import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
function Login({ onClose, onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = (e) => {
  e.preventDefault();

  if (!username || !password) {
    alert("Please enter email and password");
    return;
  }

  alert("Login successful");

  onClose();
};


  return (
    <div className="login-overlay">

      <div className="login-modal">

        <button
          className="close-button"
          onClick={onClose}
        >
          ×
        </button>


        <h2>Login</h2>


        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>Username / Email</label>

            <input
              type="text"
              placeholder="Enter username or email"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>


        <p className="register-text">

          New user?
         <Link to="/register">Register</Link>
          {/* <button
            className="register-link"
            onClick={onRegister}
          >
            Register
          </button> */}

        </p>

      </div>

    </div>
  );
}


export default Login;