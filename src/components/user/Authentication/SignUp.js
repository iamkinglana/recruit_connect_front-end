import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from "react-router-dom";


const SignUp = ({setUser}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        password_confirmation: passwordConfirmation,
        name,
        role
      })
      ,
    })
      .then((r) => {
        if (r.ok) {
          return r.json();

        } else {
          throw new Error("Sign Up Failed!");
        }
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/home');
        console.log("Signup Successful");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  return (
    <div className="login-root">
      <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>
        <div className="loginbackground box-background--white ">
          <div className="loginbackground-gridContainer">
          </div>
        </div>
        <div className="box-rootflex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
          <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
            <h1 className='header'>Recruit Connect</h1>
          </div>
          <div className="formbg-outer">
            <div className="formbg">
              <div className="formbg-inner padding-horizontal--48">
                <span className="padding-bottom--15">Create an account</span>
                <form id="stripe-signup">
                  <div className="field padding-bottom--24">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required />
                  </div>
                  <div className="field padding-bottom--24">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required />
                  </div>
                  <div className="field padding-bottom--24">
                    <label htmlFor="email">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required />
                  </div>
                  <div className="field padding-bottom--24">
                    <div className="grid--50-50">
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="password-toggle">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                    </div>
                  </div>
                  <div className="field padding-bottom--24">
                    <div className="grid--50-50">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                    <div className="password-toggle">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="button"
                      className="toggle-password-btn"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className="field padding-bottom--24">
                    <label htmlFor="role">Role</label>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="role"
                          value="jobseeker"
                          checked={role === "jobseeker"}
                          onChange={handleRoleChange}
                          required
                        />                                                Job Seeker
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="role"
                          value="employer"
                          checked={role === "employer"}
                          onChange={handleRoleChange}
                          required
                        />                                                Employer
                      </label>
                    </div>
                  </div>
                  <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                    <label htmlFor="checkbox">
                      <input type="checkbox" name="checkbox" required /> I agree to the terms and conditions
                    </label>
                  </div>
                  <div className="field padding-bottom--24">
                    <input type="submit" name="submit" onClick={handleSubmit} value="Sign Up" />
                  </div>
                </form>
              </div>

            </div>
          </div>
          <div className="footer-link padding-top--24">
            <span>Already have an account? <a href="/login">Sign In</a></span>
            <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
              <span><a href="#">© Recruit Connect</a></span>
              <span><a href="#">Contact</a></span>
              <span><a href="#">Privacy & terms</a></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SignUp;
