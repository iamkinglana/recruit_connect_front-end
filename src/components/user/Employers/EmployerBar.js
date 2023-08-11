// import React from 'react';
// import { Link } from 'react-router-dom';
// import './SideBar.css'

// const SideBar = ({ userName, onLogout }) => {
//   const getCurrentGreeting = () => {
//     const currentHour = new Date().getHours();
//     if (currentHour >= 0 && currentHour < 12) {
//       return 'Good morning';
//     } else if (currentHour >= 12 && currentHour < 18) {
//       return 'Good afternoon';
//     } else {
//       return 'Good evening';
//     }
//   };

//   return (
//     <div className="sidebar">
//       <div className="user-details">
//         <div className="user-name">{userName}</div>
//         {/* Other user details go here */}
//       </div>
//       <div className="greeting">
//         {`${getCurrentGreeting()}, ${userName}`}
//       </div>

//       <ul className="sidebar-links">
//         <li className="sidebar-link">
//           <Link to="/stats">Stats</Link>
//         </li>
//         <li className="sidebar-link">
//           <Link to="/all-jobs">All Jobs</Link>
//         </li>
//         <li className="sidebar-link">
//           <Link to="/add-job">Add Job</Link>
//         </li>
//         <li className="sidebar-link">
//           <Link to="/employer-profile">Employer Profile</Link>
//         </li>
//       </ul>
//       <button className="logout-button" onClick={onLogout}>Logout</button>
//     </div>
//   );
// };

// export default SideBar;

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import Logo from '../../homepage-icons/recruit-connect-logo.png';
// import './NavBar.css'
import { useEffect,useContext, useState } from 'react';
import { UserContext } from '../../../App';
import { useNavigate } from 'react-router-dom';


const EmployerBar = () => {
    const [activeLink, setActiveLink] = useState('');
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        navigate('/login')
    };


    return (
        <Navbar bg="light" expand="xl" className='navbar border m-0 p-2'>
            <Navbar.Brand as={Link} to="/" className='navbrand'>
                <img className="navbar-logo" src={Logo} alt="" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto nav-links">
                    <Nav.Link
                        as={Link}
                        to="/employer-profile"
                        className={activeLink === 'employer-profile' ? 'active' : ''}
                        onClick={() => setActiveLink('employer-profile')}
                    >
                        Employer Profile
                    </Nav.Link>
                    <Nav.Link as={Link}
                        to="/add-job"
                        className={activeLink === 'add-job' ? 'active' : ''}
                        onClick={() => setActiveLink('add-job')}
                    >
                        Add Jobs
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/all-jobs"
                        className={activeLink === 'all-jobs' ? 'active' : ''}
                        onClick={() => setActiveLink('all-jobs')}
                    >
                        All Jobs
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/stats"
                        className={activeLink === 'stats' ? 'active' : ''}
                        onClick={() => setActiveLink('stats')}
                    >
                        Stats
                    </Nav.Link>
                    

                </Nav>
                <Nav className='login-section'>
                    {user ? (
                        <NavDropdown title={`Welcome ${user.name}`} id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/profile">
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/signup">
                                <button class="cssbuttons-io-button"> Sign Up
                                    <div class="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                                    </div>
                                </button>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login">
                                <button class="cssbuttons-io-button"> Login
                                    <div class="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                                    </div>
                                </button>
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}
export default EmployerBar;
