import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ current_user, len, setSearch }) {
  const nav = useNavigate();

  const [searchDisplay, setSearchDisplay] = useState({ display: 'none' });
  const [searchIconDisplay, setSearchIconDisplay] = useState({
    display: 'block',
    fontSize: '20px',
  });

  function handleLogout(e) {
    e.preventDefault();
    localStorage.setItem('current_user', JSON.stringify({}));
    window.location.reload();
  }

  function showNavInput(e) {
    e.preventDefault();
    document.querySelector('.nav-to-toggle').style.display = 'none';
    document.querySelector('input').style.display = 'block';
    document.querySelector('.times-show-icon').style.display = 'block';
  }

  function hideInputShowNav(e) {
    e.preventDefault();
    document.querySelector('.nav-to-toggle').style.display = 'flex';
    document.querySelector('input').style.display = 'none';
    document.querySelector('.times-show-icon').style.display = 'none';
  }

  function showInput(e) {
    e.preventDefault();
    document.querySelector('.header__left').style.display = 'none';
    document.querySelector('.bars-icon').style.display = 'none';
    document.querySelector('.search-icon').style.display = 'none';
    document.querySelector('.times-icon').style.display = 'block';
    document.querySelector('input').style.display = 'block';
  }

  function hideInput(e) {
    e.preventDefault();
    document.querySelector('.header__left').style.display = 'block';
    document.querySelector('.bars-icon').style.display = 'block';
    document.querySelector('.search-icon').style.display = 'block';
    document.querySelector('.times-icon').style.display = 'none';
    document.querySelector('input').style.display = 'none';
  }

  function showNav(e) {
    e.preventDefault();
    document.querySelector('.header__left').style.display = 'none';
    document.querySelector('.bars-icon').style.display = 'none';
    document.querySelector('.search-icon').style.display = 'none';
    document.querySelector('.nav-to-toggle').style.display = 'block';
  }

  function hideNav(e) {
    e.preventDefault();
    document.querySelector('.header__left').style.display = 'block';
    document.querySelector('.bars-icon').style.display = 'block';
    document.querySelector('.search-icon').style.display = 'block';
    document.querySelector('.nav-to-toggle').style.display = 'none';
  }

  function handleSearch(e, searchValue) {
    e.preventDefault();
    nav('/search');
    console.log(searchValue);
  }

  const userName = current_user?.name || '';

  return (
    <>
      <div className="header" style={{ width: `${window.screen.width}px` }}>
        <i className="las la-bars bars-icon" onClick={(e) => showNav(e)}></i>
        <div className="header__left">
          <h2>RECRUIT CONNECT</h2>
        </div>
        <div className="header__center">
          <div className="search-bar">
            <form onSubmit={(e) => handleSearch(e)}>
              <input
                onKeyDown={(e) => nav('/search')}
                type="text"
                className="search-input"
                placeholder="Search for Jobs"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
          <i className="las la-search search-icon" onClick={(e) => showInput(e)}></i>
          <i className="las la-times times-icon" onClick={(e) => hideInput(e)}></i>
          <i className="las la-times times-show-icon" onClick={(e) => hideInputShowNav(e)}></i>
          <div className="nav-to-toggle">
            <i className="las la-times times-nav-icon" onClick={(e) => hideNav(e)}></i>
            <ul className="header__lists">
              <li>
                <i className="las la-search nav-search-icon" onClick={(e) => showNavInput(e)}></i>
              </li>
              <li>
                <a className="header_link" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="header_link" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="header_link" href="#">
                  Contact
                </a>
              </li>
            </ul>
            {userName === '' ? (
              <>
                <a href="/sign">
                  <button id="sign_btn">Sign Up</button>
                </a>
                <a href="/sign">
                  <button id="log_btn" className="last">
                    Log In
                  </button>
                </a>
              </>
            ) : (
              <a href="/">
                <button id="sign_btn" onClick={(e) => handleLogout(e)} className="logout-btn">
                  Log out
                </button>
              </a>
            )}
          </div>
        </div>
        <div className="header__right">
          <a onClick={() => nav('/cart')} className="fixed-icon">
            <i className="las la-shopping-cart cart-icon"></i>
            <p className="cart-quantity">{len}</p>
          </a>
        </div>
      </div>

      <nav className="navbar navbar-phone navbar-expand-lg navbar-light bg-light">
        <div className="header-first">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <h5 style={{ color: 'red' }}>RECRUIT CONNECT</h5>
          <i
            className="las la-search"
            style={searchIconDisplay}
            onClick={() => {
              setSearchDisplay({ display: 'block' });
              setSearchIconDisplay({ display: 'none', fontSize: '20px' });
            }}
          ></i>
          <i
            className="las la-times times-icon"
            style={searchDisplay}
            onClick={() => {
              setSearchDisplay({ display: 'none' });
              setSearchIconDisplay({ display: 'block', fontSize: '20px' });
            }}
          ></i>
        </div>

        <input
          onKeyDown={(e) => nav('/search')}
          type="text"
          className="search-input"
          placeholder="Search for Apparel, etc"
          onChange={(e) => setSearch(e.target.value)}
          style={searchDisplay}
        />

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
          </ul>
          {userName === '' ? (
            <>
              <a className="nav-link" href="/sign">
              Sign Up
            </a>
          </>
        ) : (
          <a href="/" className="nav-link" onClick={(e) => handleLogout(e)}>
            Log out
          </a>
        )}
      </div>
    </nav>
  </>
);
}

export default Header;
