import "./Login.css";
import React, { useState } from "react";


const Login = ({ setUser }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("")
    const [formData, setFormData] = useState({
      username: '',
      password:''
    })
  const handlesubmit = (e) => {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
    },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user)
        //   navigate('/')
        });
      } else {
        console.error('Error:', res.status);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckboxChange = (e) => {
    setShowPassword(e.target.checked);
  };

  const handleLogout = () => {
    // setLoggedInUser(null);
    setUsername("");
    setShowPassword("");
    localStorage.removeItem("user");
  };

  return (
    <div className="login">
        <div className="login-holder">
            <div className="login-container">
                <div className="welcome-text">
                    <h1 className="welcome-text-title">
                        Recruit-Connect <br />
                        welcome
                    </h1>
                    <p className="welcome-text-desc">
                   Find your Dream Job
                    </p>
                   
                    <div className="login-background">
                        <img className="job-image"
                        scr="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2EAK_eLedCwuEP5XUN_veE9uLo4kKi9WQ5g&usqp=CAU"
                        alt="job" />
                    </div>
                </div>

                <div className="login-form-holder">
                    <h3>Jobs</h3>
                    <p>Searching For Your Dream Job</p>
                    <h2>Login</h2>


                    <form onSubmit={handlesubmit} autoComplete="on">
                        <div className="login-form-wrapper">
                            <label htmlFor="username">Username</label>
                            <input 
                            type="text"
                            name="username"
                            value={formData.username}
                            placeholder=" Enter Your Username"
                            className="login-input"
                            onChange={handleChange}
                            autoComplete="text"
                            required
                            />
                        </div>
                        <div className="login-form-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                            type="password" 
                            name="password"
                            value={formData.password}
                            placeholder="Enter Your Password" 
                            className="login-input" 
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                            />
                            <label className="boxcheck">
                                <input
                                type="checkbox"
                                className="show-toggle"
                                checked={showPassword}
                                onChange={handleCheckboxChange}
                                />
                                Show Password
                            </label>
                        </div>
                        <p className="forgot-password">
                            <a href="/reset-password">Forgot Password?</a>
                        </p>
                        <div className="login-form-buttons">
                            <button type="Submit" className="login-btn">
                                Login
                            </button>
                        </div>
                        <div className="signup-wrapper">
                    <p className="signup-text">Do you Have an Account?  <a href="/signup">Create Account</a>
                    </p>
                    {/* <button><Link to={'/signup'}>Sign up here</Link></button> */}
                   </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}
export default Login;