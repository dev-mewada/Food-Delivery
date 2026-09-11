import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
function Login({ onClose, onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();


const handleLogin = (e) => {
  e.preventDefault();

  if (
  username === "admin@gmail.com" &&
  password === "123456"
) {
  localStorage.setItem("isLoggedIn", "true");

  const user = {
    name: "Devendra Mewada",
    email: "admin@gmail.com"
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Login successful");
  navigate("/");
}
};

//   const handleLogin = (e) => {
//   e.preventDefault();

//   if (!username || !password) {
//     alert("Please enter email and password");
//     return;
//   }
   
//   else {
//        <Link to ="/">alert("Login successful");</Link>
     
//   }


  
// };


  return (
    <div className="login-overlay">

      <div className="login-modal">


         <button
  className="close-button"
  onClick={() => navigate("/")}
>
  ×
</button>
        


        <h2>Login</h2>


        <form >

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

   <p>login id : admin@gmail.com</p>
   <p>password: 123456</p>
          <button
            type="submit"
            className="login-button"
            onClick={handleLogin}
          >
            Login
          </button>

        </form>


        <p className="register-text">

          New user?
         <Link to="/register"><button className="register-link">Register</button></Link>
         
        </p>

      </div>

    </div>
  );
}


export default Login;