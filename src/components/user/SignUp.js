import React, { useState } from 'react';
import './Login.css';
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






















// import "./Signup.css";
// import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useNavigate, useState } from "react-router-dom";

// function Signup({RecruitConnect}) {
//   // const [first_name, setFirstName] = useState("");
//   // const [surname, setSurname] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   // const [phonenumber, setPhoneNumber] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [password_confirmation, setPasswordConfirmation] = useState("");
//   const [role, setRole] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [agreeToTermsAndPrivacy, setAgreeToTermsAndPrivacy] = useState(false);
  
//   // const [jobseeker, setJobSeeker] =useState(false);
//   //   const navigate = useNavigate();
//   function handleSubmit(e) {
//     e.preventDefault();
//     fetch("/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         // first_name,
//         // surname,
//         name,
//         email,
//         // phonenumber,
//         username,
//         password,
//         password_confirmation,
//         role,
//       }),
//     }).then((r) => {
//       if (r.ok) {
//         r.json().then(() => {
//           // setFirstName("");
//           // setSurname("");
//           setName("");
//           setEmail("");
//           // setPhoneNumber("");
//           setUsername("");
//           setPassword("");
//           setPasswordConfirmation("");
//           setRole("");
//           setErrors([]);
//           alert(`Created Account!`);
          
//         });
//       } else {
//         r.json().then((e) => setErrors(e.errors));
//       }
//     });
//   }
// //   const handleCheckboxPasswordChange = (e) => {
// //     setShowPassword(e.target.checked);
// //   };
//   const handleCheckboxPasswordConfirmChange = (e) => {
//     setShowConfirmPassword(e.target.checked);
//   };
//   const handleCheckboxRememberMeChange = (event) => {
//     setRememberMe(event.target.checked);
//   };
//   const handleCheckboxTermsAndPrivacyChange = (event) => {
//     setAgreeToTermsAndPrivacy(event.target.checked);
//   };

//   const handleRoleChange = (event) => {
//     setRole(event.target.value);
//   };

//   // const handleCheckboxJobSeekerChange = (e) => {
//   //   setJobSeeker(e.target.checked);
//   // };


//   return (
//     <>
//       <div className="signup">
//         <div className="signup-container">
//           <div className="signup-information">
//             <p>The Job portal.Where Innovative Job seekers Meet Innovative Recruiters </p>
//             <div className="background-circle">
//               <img
//                 className="jobs-image"
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmn6jkolnFNhsjhLUK989ov2Jc0ETGRndheg&usqp=CAU"
//                 // scr="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwRS6BuZedqxdw44yDrvET5DcJxwLnn42Jzg&usqp=CAU"
//                 alt="jobs"
//               />
//             </div>
//           </div>
//           <div className="signup-form-container">
//             <h2>
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9O5KNl_GEhNkm_gDxaoJHWFjVaY7iAZPbE_HmPd-hpkrD4wWVhYJFdRdBh894Y4_riZI&usqp=CAU"
//                 alt="Jobs Logo"
//                 className="jobs-logo"
//               />
//               Recruit Connect
//             </h2>
//             <h3>Create Account</h3>
//             <form action="/signup" onSubmit={handleSubmit} autoComplete="on">
//               {/* <label htmlFor="first_name">First Name</label>
//               <input
//                 type="text"
//                 value={first_name}
//                 placeholder="Enter First Name"
//                 id="first_name"
//                 onChange={(e) => setFirstName(e.target.value)}
//                 autoComplete="first_name"
//                 required
//               /> */}
//               {/* <label htmlFor="first_name">SurName</label>
//               <input
//                 type="text"
//                 value={surname}
//                 placeholder="Enter Surname"
//                 id="surname"
//                 onChange={(e) => setSurname(e.target.value)}
//                 autoComplete="surname"
//                 required
//               /> */}

//               <label htmlFor="name">Name </label>
//               <input
//                 type="text"
//                 value={name}
//                 placeholder="Enter Full Name"
//                 id="name"
//                 onChange={(e) => setName(e.target.value)}
//                 autoComplete="name"
//                 required
//               />
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 placeholder="Enter Your Email"
//                 id="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 autoComplete="email"
//                 required
//               />
//               {/* <label htmlFor="phonenumber">Phone Number</label>
//               <input
//                 type="phonenumber"
//                 value={phonenumber}
//                 placeholder="Enter Your PhoneNumber"
//                 id="phonenumber"
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 autoComplete="phonenumber"
//                 required
//               /> */}
//               <label htmlFor="username">Username</label>
//               <input
//                 type="text"
//                 value={username}
//                 placeholder="Enter Username"
//                 id="username"
//                 onChange={(e) => setUsername(e.target.value)}
//                 autoComplete="username"
//                 required
//               />

//               <label htmlFor="password">Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter New Password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 autoComplete="new-password"
//                 required
//               />
//               {/* <label className="signup-checkbox-label">
//                 <input
//                   type="checkbox"
//                   className="show-password-toggle"
//                   checked={showPassword}
//                   onChange={handleCheckboxPasswordChange}
//                 />
//                 Show Password
//               </label> */}
//               <label htmlFor="password-confirm">Confirm Password</label>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm new password"
//                 id="password-confirm"
//                 value={password_confirmation}
//                 onChange={(e) => setPasswordConfirmation(e.target.value)}
//                 autoComplete="new-password"
//                 required
//               />
//               <label className="signup-checkbox-label">
//                 <input
//                   type="checkbox"
//                   className="show-password-toggle"
//                   checked={showConfirmPassword}
//                   onChange={handleCheckboxPasswordConfirmChange}
//                 />
//                 Show Password
//               </label>
//               {/* <div>
//                 <p className="forgot-password">
//                   <a href="/reset-password">Forgot Password?</a>
//                 </p>
//               </div> */}
              
//               {/* <label
//                 className="signup-checkbox-label"
//                 htmlFor="rememberMeCheckbox"
//               >
//                 <input
//                   type="checkbox"
//                   className="remember-me-toggle"
//                   id="rememberMeCheckbox"
//                   checked={rememberMe}
//                   onChange={handleCheckboxRememberMeChange}
//                 />
//                 Remember Me
//               </label> */}

//               {/* <div>
//                 <p className="forgot-password">
//                   <a href="/reset-password">Forgot Password?</a>
//                 </p>
//               </div> */}
              
//               {/* <label
//                 className="signup-checkbox-label"
//                 htmlFor="IagreetoalltheTermsandPrivacypolicyCheckbox"
//               >
//                 <input
//                   type="checkbox"
//                   className="IagreetoalltheTermsandPrivacypolicy"
//                   id="IagreetoalltheTermsandPrivacypolicyCheckbox"
//                   checked={agreeToTermsAndPrivacy}
//                   onChange={handleCheckboxTermsAndPrivacyChange}
//                 />
//                 I agree to all the <a href="/terms">Terms</a>and
//                 <a href="/privacy-policy">Privacy Policy</a>
//               </label> */}
//               {/* <label
//                 className="signup-checkupbox-label"
//                 htmlFor="roleCheckbox"
//               >
//                 <input
//                   type="checkbox"
//                   className="employer"
//                   id="employerCheckbox"
//                   checked={role}
//                   onChange={handleRoleChange}
//                 />
//                 EMPLOYER
//               </label>
//               <label
//                 className="signup-checkupbox-label"
//                 htmlFor="roleCheckbox"
//               >
//                 <input
//                   type="checkbox"
//                   className="jobseeker"
//                   id="roleCheckbox"
//                   checked={role}
//                   onChange={handleCheckboxRoleChange}
//                 />
//                 JOB SEEKER
//               </label> */}
//               <div className="field padding-bottom--24">
//                     <label htmlFor="role">Role</label>
//                     <div className="radio-group">
//                       <label>
//                         <input
//                           type="radio"
//                           name="role"
//                           value="jobseeker"
//                           checked={role === "jobseeker"}
//                           onChange={handleRoleChange}
//                           required
//                         />                                                Job Seeker
//                       </label>
//                       <label>
//                         <input
//                           type="radio"
//                           name="role"
//                           value="employer"
//                           checked={role === "employer"}
//                           onChange={handleRoleChange}
//                           required
//                         />                                                Employer
//                       </label>
//                     </div>
//                   </div>

//               <label
//                 className="signup-checkbox-label"
//                 htmlFor="rememberMeCheckbox"
//               >
//                 <input
//                   type="checkbox"
//                   className="remember-me-toggle"
//                   id="rememberMeCheckbox"
//                   checked={rememberMe}
//                   onChange={handleCheckboxRememberMeChange}
//                 />
//                 Remember Me
//               </label>


//               <label
//                 className="signup-checkbox-label"
//                 htmlFor="IagreetoalltheTermsandPrivacypolicyCheckbox"
//               >
//                 <input
//                   type="checkbox"
//                   className="IagreetoalltheTermsandPrivacypolicy"
//                   id="IagreetoalltheTermsandPrivacypolicyCheckbox"
//                   checked={agreeToTermsAndPrivacy}
//                   onChange={handleCheckboxTermsAndPrivacyChange}
//                 />
//                 I agree to all the <a href="/terms">Terms</a>and
//                 <a href="/privacy-policy">Privacy Policy</a>
//               </label>

//               <div>
//                 <p className="forgot-password">
//                   <a href="/reset-password">Forgot Password?</a>
//                 </p>
//               </div>
//               {/* <div className="signup-options">
//                 <button type="submit" className="options-btn">Employer</button>

//                 <button className="options-btn">Job seeker</button>
//               </div> */}
//               <div className="signup-form-buttons">
//                 <button type="submit" className="signup-btn">Create Account</button>
//                 {/* <button className="signup-with-google">
//                   Sign-in with Google
//                 </button> */}
//               </div>
//               <p className="dont-have-an-account">
//                  Have an account? <a 
//                  href="/login">Log In</a>
//               </p>
//               {/* <div style={{ color: "red", fontSize: "14px", padding: "10px" }}>
//                 {errors.map((e, index) => (
//                   <p key={index}>{e}</p>
//                 ))}
//               </div> */}
//             </form>
//             <div className="signup-container">
                
//                 <p>CopyRights My RecruitConnect<span className="signup-container">{RecruitConnect}</span></p>
//                 <p>{new Date().getFullYear()}<span className="signup-container">{RecruitConnect}</span>.All Rights Reserved</p>   
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default Signup;