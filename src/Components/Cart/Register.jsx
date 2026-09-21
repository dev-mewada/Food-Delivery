import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register({ onClose, onLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate();


  // Register user
  const handleRegister = async (e) => {

    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    try {

      const userData = {
        name,
        email,
        password,
        address
      };


      const response = await axios.post(
        "http://localhost:5000/users",
        userData
      );


      alert(response.data.message);

      // OTP email sent
      setOtpSent(true);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };


  // Verify OTP
  const verifyOtp = async () => {

    if (!otp) {
      alert("Please enter OTP");
      return;
    }


    try {

      const response = await axios.post(
        "http://localhost:5000/users/verify-otp",
        {
          email: email,
          otp: otp
        }
      );


      alert(response.data.message);

      setOtpVerified(true);

      // OTP verification successful
      setOtp("");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "OTP verification failed"
      );
    }
  };


  return (
    <div className="login-overlay">

      <div className="login-modal">

        <Link to="/">
          <button
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </Link>


        <h2>Register</h2>


        <form onSubmit={handleRegister}>

          {/* Name */}

          <div className="form-group">

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>


          {/* Email */}

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          {/* Phone */}

          <div className="form-group">

            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

          </div>


          {/* Password */}

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          {/* Address */}

          <div className="form-group">

            <label>Address</label>

            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
            />

          </div>


          {/* Register Button */}

          {!otpSent && (

            <button
              type="submit"
              className="login-button"
            >
              Register
            </button>

          )}


          {/* OTP Section */}

          {otpSent && !otpVerified && (

            <div className="form-group">

              <label>Email OTP</label>

              <div className="otp-row">

                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  maxLength="6"
                  onChange={(e) =>
                    setOtp(e.target.value)
                  }
                />


                <button
                  type="button"
                  className="otp-button"
                  onClick={verifyOtp}
                >
                  Verify
                </button>

              </div>

            </div>
          )}


          {/* OTP Verified */}

          {otpVerified && (

            <>
              <p className="otp-success">
                ✓ Email Verified
              </p>

              <button
                type="button"
                className="login-button"
                onClick={() => navigate("/login")}
              >
                Go to Login
              </button>
            </>

          )}

        </form>


        <p className="login-text">

          Already have an account?

          <Link to="/Login">

            <button className="login-link">
              Login
            </button>

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;