import React, { useState } from 'react';
import './Login.css';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

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
                                <span className="padding-bottom--15">Create an account</span>
                                <form id="stripe-signup">
                                    <div className="field padding-bottom--24">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" required />
                                    </div>
                                    <div className="field padding-bottom--24">
                                        <div className="grid--50-50">
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="password-toggle">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                placeholder="Password"
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
                                                <input type="radio" name="role" value="jobseeker" required />
                                                Job Seeker
                                            </label>
                                            <label>
                                                <input type="radio" name="role" value="employer" required />
                                                Employer
                                            </label>
                                        </div>
                                    </div>
                                    <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                                        <label htmlFor="checkbox">
                                            <input type="checkbox" name="checkbox" required /> I agree to the terms and conditions
                                        </label>
                                    </div>
                                    <div className="field padding-bottom--24">
                                        <input type="submit" name="submit" value="Sign Up" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
