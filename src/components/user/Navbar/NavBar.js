import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import Logo from '../../homepage-icons/logo.png';
import './NavBar.css'
import { useEffect, useState } from 'react';


const NavBar = ({ isLoggedIn, user }) => {
    const [activeLink, setActiveLink] = useState('');



    return (
        <Navbar bg="light" expand="lg" className='navbar border m-0 p-2'>
            <Navbar.Brand as={Link} to="/" className='navbrand'>
                <img className="navbar-logo" src={Logo} alt="" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto nav-links">
                    <Nav.Link
                        as={Link}
                        to="/home"
                        className={activeLink === 'home' ? 'active' : ''}
                        onClick={() => setActiveLink('home')}
                    >
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link}
                        to="/jobs"
                        className={activeLink === 'jobs' ? 'active' : ''}
                        onClick={() => setActiveLink('jobs')}
                    >
                        Jobs
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/notifications"
                        className={activeLink === 'notifications' ? 'active' : ''}
                        onClick={() => setActiveLink('notifications')}
                    >
                        Notifications
                    </Nav.Link>
                </Nav>
                <Nav className='login-section'>
                    {isLoggedIn ? (
                        <NavDropdown title={`Welcome ${user}`} id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/profile">
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>Logout</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">
                                <button class="cssbuttons-io-button"> Sign Up
                                    <div class="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                                    </div>
                                </button>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/signup">
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
export default NavBar;