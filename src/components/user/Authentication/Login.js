import React from 'react';
import './Login.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const LoginPage = ({ setUser }) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                console.log(r)
                 return r.json();
                }
                else {
                    throw new Error("Login failed!");
                }
            })
            .then((data) => {
                const { user, token } = data;
                localStorage.setItem('authToken', token);
                setUser(user);
                navigate('/home');
                console.log("Login Successful");
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }

    return (
        <div className="login-root">
            <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>
                <div className="loginbackground box-background--white padding-top--64">
                    <div className="loginbackground-gridContainer">
                    </div>
                </div>
                <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
                    <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                        <h1 className='header'>Recruit Connect</h1>
                    </div>
                    <div className="formbg-outer">
                        <div className="formbg">
                            <div className="formbg-inner padding-horizontal--48">
                                <span className="padding-bottom--15">Sign in to your account</span>
                                <form id="stripe-login">
                                    <div className="field padding-bottom--24">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="field padding-bottom--24">
                                        <div className="grid--50-50">
                                            <label htmlFor="password">Password</label>
                                            <div className="reset-pass">
                                                <a href="#">Forgot your password?</a>
                                            </div>
                                        </div>
                                        <div className="password-toggle ">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="toggle-password-btn"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                                        <label htmlFor="checkbox">
                                            <input type="checkbox" name="checkbox" /> Stay signed in
                                        </label>
                                    </div>
                                    <div className="field padding-bottom--24">
                                        <input type="submit" onClick={handleSubmit} name="submit" value="Continue" />
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className="footer-link padding-top--24">
                            <span>Don't have an account? <a href="/signup">Sign up</a></span>
                            <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                                <span><a href="#">© Recruit Connect</a></span>
                                <span><a href="#">Contact</a></span>
                                <span><a href="#">Privacy & terms</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
