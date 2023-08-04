import "./Login.css";
import React, { useState } from "react";


const Login = ({ setUser }) => {
   
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [password,setPassword]=useState('')

    const [formData, setFormData] = useState({
      email: '',
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
        // throw new Error("Login failed!");
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
    setEmail("");
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
                        welcome! 
                    </h1>
                    
                    <p className="welcome-text-desc">
                   Find your Dream Job
                    </p>
                   
                    <div className="login-background">
                        <img className="job-image"
                        scr="https://i0.wp.com/www.pd.co.ke/wp-content/uploads/2021/02/jobs.jpg"
                        alt="job" />
                    </div>
                </div>

                <div className="login-form-holder">
                    <h3>Jobs</h3>
                    <p>Searching For Your Dream Job</p>
                    <h2>LogIn</h2>


                    <form onSubmit={handlesubmit} autoComplete="on">
                        <div className="login-form-wrapper">
                            <label htmlFor="email">Email</label>
                            <input 
                            type="text"
                            name="email"
                            value={formData.email}
                            placeholder=" Enter Your Email"
                            className="login-input"
                            onChange={handleChange}
                            autoComplete="text"
                            required
                            />
                        </div>
                        <div className="login-form-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                            type={showPassword ? "text" : "password"} 
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
                            {/* <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                                        <label htmlFor="checkbox">
                                            <input type="checkbox" name="checkbox" /> Stay signed in
                                        </label>
                                    </div>
                        </div> */}
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
                     {/* <div className="footer-link padding-top--24">
                            <span>Don't have an account? <a href="/signup">Sign up</a></span>
                            <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                                <span><a href="#">© Recruit Connect</a></span>
                                <span><a href="#">Contact</a></span>
                                <span><a href="#">Privacy & terms</a></span>
                            </div> */}
                            
                   <div className="logged-in-container">
                                   <button onClick={handleLogout}>Logout</button>
                        </div>
                        <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                                        <label htmlFor="checkbox">
                                            <input type="checkbox" name="checkbox" /> Stay signed in
                                        </label>
                                    </div>
                        </div>
                    </form>
                    {/* <div className="footer-link padding-top--24">
                            <span>Don't have an account? <a href="/signup">Sign up</a></span>
                            <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                                <span><a href="#">© Recruit Connect</a></span>
                                <span><a href="#">Contact</a></span>
                                <span><a href="#">Privacy & terms</a></span>
                            </div> */}
                </div>
            </div>
        </div>
    </div>
  );
}
export default Login;



// import React from 'react';
// import './Login.css';
// import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// const LoginPage = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const togglePasswordVisibility = () => {
//         setShowPassword(prevShowPassword => !prevShowPassword);
//     };
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         fetch("/login", {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email, password }),
//         })
//             .then((r) => {
//                 setIsLoading(false);
//                 if (r.ok) {
//                     navigate('/home');
//                     console.log("Login Successful");
//                 }
//                 else {
//                     throw new Error("Login failed!");
//                 }
//             })
//             .catch((error) => {
//                 console.log("Error:", error);
//             });
//     }
//     return (
//         <div className="login-root">
//             <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>
//                 <div className="loginbackground box-background--white padding-top--64">
//                     <div className="loginbackground-gridContainer">
//                     </div>
//                 </div>
//                 <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
//                     <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
//                         <h1 className='header'>Recruit Connect</h1>
//                     </div>
//                     <div className="formbg-outer">
//                         <div className="formbg">
//                             <div className="formbg-inner padding-horizontal--48">
//                                 <span className="padding-bottom--15">Sign in to your account</span>
//                                 <form id="stripe-login">
//                                     <div className="field padding-bottom--24">
//                                         <label htmlFor="email">Email</label>
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             onChange={(e) => setEmail(e.target.value)}
//                                         />
//                                     </div>
//                                     <div className="field padding-bottom--24">
//                                         <div className="grid--50-50">
//                                             <label htmlFor="password">Password</label>
//                                             <div className="reset-pass">
//                                                 <a href="#">Forgot your password?</a>
//                                             </div>
//                                         </div>
//                                         <div className="password-toggle ">
//                                             <input
//                                                 type={showPassword ? 'text' : 'password'}
//                                                 name="password"
//                                                 placeholder="Password"
//                                                 onChange={(e) => setPassword(e.target.value)}
//                                             />
//                                             <button
//                                                 type="button"
//                                                 className="toggle-password-btn"
//                                                 onClick={togglePasswordVisibility}
//                                             >
//                                                 {showPassword ? 'Hide' : 'Show'}
//                                             </button>
//                                         </div>
//                                     </div>
//                                     <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
//                                         <label htmlFor="checkbox">
//                                             <input type="checkbox" name="checkbox" /> Stay signed in
//                                         </label>
//                                     </div>
//                                     <div className="field padding-bottom--24">
//                                         <input type="submit" onClick={handleSubmit} name="submit" value="Continue" />
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                         <div className="footer-link padding-top--24">
//                             <span>Don't have an account? <a href="/signup">Sign up</a></span>
//                             <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
//                                 <span><a href="#">© Recruit Connect</a></span>
//                                 <span><a href="#">Contact</a></span>
//                                 <span><a href="#">Privacy & terms</a></span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default LoginPage;