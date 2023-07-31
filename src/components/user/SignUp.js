import "./Signup.css";
import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useNavigate, useState } from "react-router-dom";

function Signup({RecruitConnect}) {
  const [first_name, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTermsAndPrivacy, setAgreeToTermsAndPrivacy] = useState(false);
  //   const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4001/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name,
        surname,
        middle_name,
        email,
        phonenumber,
        username,
        password,
        password_confirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(() => {
          setFirstName("");
          setSurname("");
          setMiddleName("");
          setEmail("");
          setPhoneNumber("");
          setUsername("");
          setPassword("");
          setPasswordConfirmation("");
          setErrors([]);
          alert(`Created Account!`);
          
        });
      } else {
        r.json().then((e) => setErrors(e.errors));
      }
    });
  }
//   const handleCheckboxPasswordChange = (e) => {
//     setShowPassword(e.target.checked);
//   };
  const handleCheckboxPasswordConfirmChange = (e) => {
    setShowConfirmPassword(e.target.checked);
  };
  const handleCheckboxRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };
  const handleCheckboxTermsAndPrivacyChange = (event) => {
    setAgreeToTermsAndPrivacy(event.target.checked);
  };
  return (
    <>
      <div className="signup">
        <div className="signup-container">
          <div className="signup-information">
            <p>Where Innovative Job seekers Meet Innovative Recruiters </p>
            <div className="background-circle">
              <img
                className="jobs-image"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmn6jkolnFNhsjhLUK989ov2Jc0ETGRndheg&usqp=CAU"
                alt="apartment"
              />
            </div>
          </div>
          <div className="signup-form-container">
            <h2>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9O5KNl_GEhNkm_gDxaoJHWFjVaY7iAZPbE_HmPd-hpkrD4wWVhYJFdRdBh894Y4_riZI&usqp=CAU"
                alt="Jobs Logo"
                className="jobs-logo"
              />
              Recruit Connect
            </h2>
            <h3>Create Account</h3>
            <form action="/signup" onSubmit={handleSubmit} autoComplete="on">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                value={first_name}
                placeholder="Enter First Name"
                id="first_name"
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="first_name"
                required
              />
              <label htmlFor="first_name">SurName</label>
              <input
                type="text"
                value={surname}
                placeholder="Enter Surname"
                id="surname"
                onChange={(e) => setSurname(e.target.value)}
                autoComplete="surname"
                required
              />

              <label htmlFor="middle_name">Middle Name </label>
              <input
                type="text"
                value={middle_name}
                placeholder="Enter Middle Name"
                id="middle_name"
                onChange={(e) => setMiddleName(e.target.value)}
                autoComplete="middle_name"
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                placeholder="Enter Your Email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <label htmlFor="phonenumber">Phone Number</label>
              <input
                type="phonenumber"
                value={phonenumber}
                placeholder="Enter Your PhoneNumber"
                id="phonenumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                autoComplete="phonenumber"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter New Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              {/* <label className="signup-checkbox-label">
                <input
                  type="checkbox"
                  className="show-password-toggle"
                  checked={showPassword}
                  onChange={handleCheckboxPasswordChange}
                />
                Show Password
              </label> */}
              <label htmlFor="password-confirm">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                id="password-confirm"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="new-password"
                required
              />
              <label className="signup-checkbox-label">
                <input
                  type="checkbox"
                  className="show-password-toggle"
                  checked={showConfirmPassword}
                  onChange={handleCheckboxPasswordConfirmChange}
                />
                Show Password
              </label>
              <div>
                <p className="forgot-password">
                  <a href="/reset-pass">Forgot Password?</a>
                </p>
              </div>
              <label
                className="signup-checkbox-label"
                htmlFor="rememberMeCheckbox"
              >
                <input
                  type="checkbox"
                  className="remember-me-toggle"
                  id="rememberMeCheckbox"
                  checked={rememberMe}
                  onChange={handleCheckboxRememberMeChange}
                />
                Remember Me
              </label>
              <label
                className="signup-checkbox-label"
                htmlFor="IagreetoalltheTermsandPrivacypolicyCheckbox"
              >
                <input
                  type="checkbox"
                  className="IagreetoalltheTermsandPrivacypolicy"
                  id="IagreetoalltheTermsandPrivacypolicyCheckbox"
                  checked={agreeToTermsAndPrivacy}
                  onChange={handleCheckboxTermsAndPrivacyChange}
                />
                I agree to all the <a href="/terms">Terms</a>and
                <a href="/privacy-policy">Privacy Policy</a>
              </label>
              <div className="signup-form-buttons">
                <button type="submit" className="signup-btn">Create Account</button>
                <button className="signup-with-google">
                  Sign-in with Google
                </button>
              </div>
              <p className="dont-have-an-account">
                 Have an account? <a 
                 href="/login">Log In</a>
              </p>
              <div style={{ color: "red", fontSize: "14px", padding: "10px" }}>
                {errors.map((e, index) => (
                  <p key={index}>{e}</p>
                ))}
              </div>
            </form>
            <div className="signup-container">
                <p>@{new Date().getFullYear()}<span className="signup-container">{RecruitConnect}</span>.All Rights Reserved</p>
                <p>Powered by <span className="signup-container">{RecruitConnect}</span></p>   
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;