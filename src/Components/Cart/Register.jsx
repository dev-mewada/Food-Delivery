import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Register({ onClose, onLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);


//   const sendOtp = () => {

//     if (!phone) {
//       alert("Please enter phone number");
//       return;
//     }

//     setOtpSent(true);

//     alert("Demo OTP sent: 1234");
//   };


//   const verifyOtp = () => {

//     if (otp === "1234") {

//       setOtpVerified(true);

//       alert("OTP verified");

//     } else {

//       alert("Invalid OTP");

//     }

//   };


//   const handleRegister = (e) => {
//   e.preventDefault();

//   if (!otpVerified) {
//     alert("Please verify OTP first");
//     return;
//   }

//   alert("Registration successful");

//   onLogin();
// };


  return (
    <div className="login-overlay">

      <div className="login-modal">
       <Link to ="/"
       ><button
          className="close-button"
          onClick={onClose}
        >
          ×
        </button></Link>
        


        <h2>Register</h2>


        <form >

          <div className="form-group">

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>


          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>


          <div className="form-group">

            <label>Phone Number</label>

            <div className="otp-row">

              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <button
                type="button"
                className="otp-button"
                // onClick={sendOtp}
              >
                Send OTP
              </button>

            </div>

          </div>


          {otpSent && (

            <div className="form-group">

              <label>OTP</label>

              <div className="otp-row">

                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button
                  type="button"
                  className="otp-button"
                  // onClick={verifyOtp}
                >
                  Verify
                </button>

              </div>

            </div>

          )}


          {otpVerified && (
            <p className="otp-success">
              ✓ OTP Verified
            </p>
          )}


          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>


          {/* {otpVerified && (

            <button
              type="submit"
              className="login-button"
            >
              Register
            </button>

          )} */}

 <button
              type="submit"
              className="login-button"
            >
              Register
            </button>
        </form>


        <p className="register-text">

          Already have an account?


           <Link to="/Login"><button
            className="register-link"
           
          >
            Login
          </button></Link>
          {/* <button
            className="register-link"
            onClick={onLogin}
          >
            Login
          </button> */}

        </p>

      </div>

    </div>
  );
}


export default Register;