import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FaBars } from 'react-icons/fa';
import Logo from '../assets/Logo.svg';
import { useUser } from '../context/UserContext';
import { Link, useNavigate } from "react-router-dom";
import './Navbar.scss';

const Navbar = () => {

  const navigate = useNavigate();

  const { user, logOut } = useUser();

  return (
    <nav className='navbar'>

      <div className='logo-container'>
        <hr />
        <figure className='logo'>
          <Link to="/">
            <img src={Logo} alt="Ethereal" />
          </Link>
        </figure>
        <hr />
      </div>

      <div className='menu-wrapper'>
        <FaBars className='menu-icon' />
        <Menu className='menu' right>
          <Link to="/" className="menu-item">Home</Link>
          <Link to="#" className="menu-item">About</Link>
          <Link to="#" className="menu-item">Contact</Link>

          {user ? (
            <a onClick={() => {
              logOut();
              navigate('/login');
            }}>Logout</a>
          ) : (
            <div className='SignupLogin-btn'>
              <a href="/signup" alt="SignUp"><button>SignUp</button></a>
              <a href="/login" alt="LogIn"><button>Login</button></a>
            </div>
          )}

        </Menu>
      </div>
    </nav>
  );
}

export default Navbar;
