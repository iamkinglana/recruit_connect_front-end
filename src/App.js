import React, { useState, createContext, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import LoginPage from "./components/user/Authentication/Login";
import Signup from './components/user/Authentication/SignUp';
import Home from "./components/user/Homepage/Home";
import AllJobs from "./components/user/AllJobs";
import JobDetails from "./components/user/JobDetails";
import Notification from "./components/user/Notification";
import NavBar from "./components/user/Navbar/NavBar";
import ApplicationsAndSavedJobs from "./components/user/SavedJobsandApplications";
import Profile from "./components/user/Profile";

import JobApplication from "./components/user/JobApplication";
import Employers from "./components/user/Employers/Employers";
import EmployerDetails from "./components/user/Employers/EmployerDetails";


export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState(null); // Initialize user state

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      fetch('http://localhost:3000/login', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
        })
        .catch((error) => {
          console.log("Error fetching user data:", error);
        });
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
        <Route path='applications/:id' element={<JobApplication/>} />
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
