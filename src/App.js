
import React from "react";
import { useState, useEffect } from 'react';
import { Route, Routes} from 'react-router-dom';
// import Apply from "./components/user/Apply";
import JobDetails from "./components/user/JobDetails";
import Profile from "./components/user/Profile";
// import Footer from './components/user/Footer';
import Signup from './components/user/Authentication/SignUp';
import Home from "./components/user/Homepage/Home";
import AllJobs from "./components/user/AllJobs";
import Notification from "./components/user/Notification";
import NavBar from "./components/user/Navbar/NavBar";

const App = () => {
  return (
    <>
    <NavBar/>
        <Routes>
      <Route path='' element={<Home />}></Route>
      <Route path='login' ></Route>
      <Route path="signup" element={<Signup/>}></Route>
      <Route path='home' element={<Home />}></Route>
      <Route path='jobs' element={<AllJobs />}></Route>
      <Route path='jobs/:id' element={<JobDetails/>}></Route>
      <Route path='notifications' element={<Notification/>}></Route>
      {/* <Route path='applications' element={<Applications/>}></Route> */}
      <Route path='profile' element={<Profile/>} ></Route>
    </Routes>  
  </>
  );
};


export default App;
