import React, { useState, createContext , useEffect} from "react";
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

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);


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
        <Route path="signup" element={<Signup setUser={setUser}/>} />
        <Route path='home' element={<Home />} />
        <Route path='jobs' element={<AllJobs />} />
        <Route path='jobs' element={<AllJobs />} />
        <Route path='jobs/:id' element={<JobDetails />} />
        <Route path="/ApplicationsAndSavedJobs" element={<ApplicationsAndSavedJobs />} />
        <Route path='notifications' element={<Notification />} />
        <Route path='profile' element={<Profile />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
