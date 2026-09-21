import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ onClose, onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Forgot Password states
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  //verify - otp
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  //for forgot new passwords
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/users/verify-reset-otp",
        {
          email: forgotEmail,
          otp: otp,
        },
      );

      alert(response.data.message);

      setOtpVerified(true);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "OTP verification failed");
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      alert("Please enter both passwords");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/users/reset-password",
        {
          email: forgotEmail,
          password: newPassword,
        },
      );

      alert(response.data.message);

      setPasswordReset(true);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Password reset failed");
    }
  };
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email: username,
        password: password,
      });

      console.log(response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isLoggedIn", "true");

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Login failed");
    }
  };

  // Send Forgot Password OTP
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!forgotEmail) {
      alert("Please enter your email");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/users/forgot-password",
        {
          email: forgotEmail,
        },
      );

      alert(response.data.message);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <button className="close-button" onClick={() => navigate("/")}>
          ×
        </button>

        {!forgotPassword ? (
          <>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Username / Email</label>

                <input
                  type="text"
                  placeholder="Enter username or email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Password</label>

                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="login-button">
                Login
              </button>
            </form>

            <button
              type="button"
              className="forgot-password-button"
              onClick={() => setForgotPassword(true)}
            >
              Forgot Password?
            </button>

            <p className="register-text">
              New user?
              <Link to="/register">
                <button className="register-link">Register</button>
              </Link>
            </p>
          </>
        ) : (
          <>
            <h2>Forgot Password</h2>

            {!otpVerified ? (
              <>
                <form onSubmit={handleForgotPassword}>
                  <div className="form-group">
                    <label>Email</label>

                    <input
                      type="email"
                      placeholder="Enter your registered email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="login-button">
                    Send OTP
                  </button>
                </form>

                <form onSubmit={handleVerifyOTP}>
                  <div className="form-group">
                    <label>OTP</label>

                    <input
                      type="text"
                      placeholder="Enter OTP"
                      maxLength="6"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="login-button">
                    Verify OTP
                  </button>
                </form>
              </>
            ) : !passwordReset ? (
              <form onSubmit={handleResetPassword}>
                <div className="form-group">
                  <label>New Password</label>

                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>

                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="login-button">
                  Reset Password
                </button>
              </form>
            ) : (
              <>
                <p className="otp-success">✓ Password Reset Successfully</p>

                <button
                  type="button"
                  className="login-button"
                  onClick={() => {
                    setForgotPassword(false);
                    setOtp("");
                    setOtpVerified(false);
                    setForgotEmail("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setPasswordReset(false);
                  }}
                >
                  Go to Login
                </button>
              </>
            )}

            <button
              type="button"
              className="back-login-button"
              onClick={() => {
                setForgotPassword(false);
                setOtp("");
                setOtpVerified(false);
              }}
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
