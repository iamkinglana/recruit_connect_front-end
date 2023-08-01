
import React from "react";
import Apply from "./components/user/Apply";
import JobDetails from "./components/user/JobDetails";
import Profile from "./components/user/Profile";
import Footer from './components/user/Footer';
import Signup from './components/user/SignUp';
import AllJobs from "./components/user/AllJobs";
const App = () => {
  return (
    <div>
      <Signup/>
      <JobDetails />
      <AllJobs/>
      <Apply />
      <Profile/>

    </div>
  );
};

export default App;
