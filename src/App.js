import React, { useState, createContext, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import LoginPage from "./components/user/Authentication/Login";
import Signup from './components/user/Authentication/SignUp';
import Home from "./components/user/Homepage/Home";
import AllJobs from "./components/user/Jobs/AllJobs";
import JobDetails from "./components/user/Jobs/JobDetails";
import Notification from "./components/user/Notification";
import NavBar from "./components/user/Navbar/NavBar";
import ApplicationsAndSavedJobs from "./components/user/SavedJobsandApplications";
import JobApplication from "./components/user/JobApplication";
import JobApplicationForm from "./components/user/Applications/JobApplicationForm.js";
import Employers from "./components/user/Employers/Employers";
import EmployerDetails from "./components/user/Employers/EmployerDetails";
import Profile from "./components/user/Profile/Profile";

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState(null); // Initialize user state

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        try {
            const payload = JSON.parse(atob(authToken.split('.')[1]));
            setUser(payload.user); 
            fetch(`http://localhost:3000/users/${payload.user_id}`)
                .then((response) => response.json())
                .then((completeUserData) => {
                    setUser(completeUserData); 
                    console.log("Login sucess")
                })
                .catch((error) => {
                    console.error('Error fetching complete user data:', error);
                });
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
}, []);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavBar />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='login' element={<LoginPage setUser={setUser} />} />
        <Route path="signup" element={<Signup setUser={setUser} />} />
        <Route path='home' element={<Home />} />
        <Route path='jobs' element={<AllJobs />} />
        <Route path='jobs/:id' element={<JobDetails />} />
        <Route path='applications/:id' element={<JobApplicationForm />} />
         <Route path='employers' element={<Employers />} />
        <Route path='employers/:id' element={<EmployerDetails/>} />
        <Route path="/ApplicationsAndSavedJobs" element={<ApplicationsAndSavedJobs />} />
        <Route path='notifications' element={<Notification />} />
        <Route path='profile' element={<Profile />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
