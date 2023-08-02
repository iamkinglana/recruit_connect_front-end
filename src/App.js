
import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import Apply from "./components/user/Apply";
import JobDetails from "./components/user/JobDetails";
import Profile from "./components/user/Profile";
import Footer from './components/user/Footer';
import Signup from './components/user/SignUp';
import Header from "./components/user/Header";
const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Signup />
        <JobDetails />
        <Apply />
        <Profile />
      </div>
    </Router>
  );
};


export default App;
