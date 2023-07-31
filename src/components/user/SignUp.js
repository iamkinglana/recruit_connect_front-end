import React, { useState } from "react";
// import { useNavigate, useState } from "react-router-dom";
import "./Signup.css";
function Signup() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
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
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name,
        last_name,
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
          setLastName("");
          setEmail("");
          setPhoneNumber("");
          setUsername("");
          setPassword("");
          setPasswordConfirmation("");
          setErrors([]);
          alert(`Account successfully!`);
          //   navigate("/login");
        });
      } else {
        r.json().then((e) => setErrors(e.errors));
      }
    });
  }
  const handleCheckboxPasswordChange = (e) => {
    setShowPassword(e.target.checked);
  };
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
      <div className="signup-page">
        <div className="signup-container">
          <div className="signup-information">
            <p>The Job portal.Where Innovative Job seekers Meet Innovative Recruiters </p>
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
                alt="House Logo"
                className="house-logo"
              />
              Jobs
            </h2>
            <h3>Create Account</h3>
            <form action="/signup" onSubmit={handleSubmit} autoComplete="on">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                value={first_name}
                placeholder="Enter Fist Name"
                id="first_name"
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="first_name"
                required
              />
              <label htmlFor="last_name">Last Name </label>
              <input
                type="text"
                value={last_name}
                placeholder="Enter Last Name"
                id="last_name"
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="last_name"
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
              <label className="signup-checkbox-label">
                <input
                  type="checkbox"
                  className="show-password-toggle"
                  checked={showPassword}
                  onChange={handleCheckboxPasswordChange}
                />
                Show Password
              </label>
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
                 Do You have an account? <a href="/login">Log In</a>
              </p>
              <div style={{ color: "red", fontSize: "14px", padding: "10px" }}>
                {errors.map((e, index) => (
                  <p key={index}>{e}</p>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;