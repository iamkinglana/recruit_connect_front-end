import EmployerBar from "./EmployerBar";
import React, { useState, createContext, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import EmployerAllJobs from "./EmployerAllJobs";
import AddJobForm from "./AddJobForm";
import EmployerProfile from "./EmployerProfile";
import StatsPage from "./Stats";


export const UserContext = createContext();


const EmployerDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        try {
            const payload = JSON.parse(atob(authToken.split('.')[1]));
            setUser(payload.user);
            fetch(`/users/${payload.user_id}`)
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
      <EmployerBar />
      <Routes>
        <Route path='' element={<EmployerProfile />} />

        <Route path="/all-jobs" element={<EmployerAllJobs /> }/>
        <Route path="/add-job" element={<AddJobForm />} />
        <Route path="/employer-profile" element={<EmployerProfile />} />
    
        <Route path="/stats" element={<StatsPage />} />

      </Routes>
    </UserContext.Provider>
  );
};

export default EmployerDashboard;
