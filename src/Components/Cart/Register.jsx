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


  //new
  const sendOtp = async () => {

    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {

      const response = await axios.post(

      
        `${import.meta.env.VITE_API_URL}/users/send-otp`,

        {
          email: email
        }
      );

      alert(response.data.message);

      // NEW CODE: OTP section show hoga
      setOtpSent(true);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to send OTP"
      );
    }
  };


 
  //  OLD CODE: Register user
  
  /*
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
        "https://food-delivery-backend-32tm.onrender.com/users",
        userData
      );

      alert(response.data.message);

      setOtpSent(true);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };
  */


  // =====================================================
  
  // OTP verify hone ke baad hi ye function chalega
  // =====================================================

  const handleRegister = async (e) => {

    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    // 🟢 NEW CODE: OTP verification check
    if (!otpVerified) {
      alert("Please verify your email first");
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

        // 🟢 NEW CODE: Actual registration API
        `${import.meta.env.VITE_API_URL}/users`,

        userData
      );

      alert(response.data.message);

      // 🟢 NEW CODE: Registration successful hone ke baad login
      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };


  // =====================================================
  // Verify OTP
  // =====================================================

  const verifyOtp = async () => {

    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {

      const response = await axios.post(

        // 🔵 EXISTING CODE: Verify OTP API
        `${import.meta.env.VITE_API_URL}/users/verify-otp`,

        {
          email: email,
          otp: otp
        }
      );

      alert(response.data.message);

      // 🔵 EXISTING CODE
      setOtpVerified(true);

      // 🔵 EXISTING CODE
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

          {/* =====================================================
              Name
          ===================================================== */}

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


          {/* =====================================================
              Email
          ===================================================== */}

          <div className="form-group">

            <label>Email</label>

            {/* 🟢 CHANGED: Email ke saath Send OTP button */}
            <div className="otp-row">

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  // 🟢 NEW CODE:
                  // Email change hone par verification reset
                  setOtpSent(false);
                  setOtpVerified(false);
                  setOtp("");
                }}
              />

              {/* 🟢 NEW CODE: Send OTP button */}
              <button
                type="button"
                className="otp-button"
                onClick={sendOtp}
              >
                Send OTP
              </button>

            </div>

          </div>


          {/* =====================================================
              Phone
          ===================================================== */}

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


          {/* =====================================================
              Password
          ===================================================== */}

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


          {/* =====================================================
              Address
          ===================================================== */}

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


          {/* =====================================================
              🟢 NEW CODE: OTP Section
          ===================================================== */}

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


          {/* =====================================================
              🟢 NEW CODE: Email Verified message
          ===================================================== */}

          {otpVerified && (

            <p className="otp-success">
              ✓ Email Verified
            </p>

          )}


          {/* =====================================================
              🔴 OLD CODE: Register button
          ===================================================== */}

          {/*
          {!otpSent && (

            <button
              type="submit"
              className="login-button"
            >
              Register
            </button>

          )}
          */}


          {/* =====================================================
              🟢 NEW CODE: Register button
              Sirf OTP verification ke baad dikhega
          ===================================================== */}

          {otpVerified && (

            <button
              type="submit"
              className="login-button"
            >
              Register
            </button>

          )}


          {/* =====================================================
              🔴 OLD CODE: Go to Login
          ===================================================== */}

          {/*
          {otpVerified && (

            <button
              type="button"
              className="login-button"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>

          )}
          */}


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