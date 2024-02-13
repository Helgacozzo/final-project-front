import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../assets/Logo.svg';
import { FaCircleUser } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { useUser } from '../context/UserContext';
import { Link, useNavigate } from "react-router-dom";
import './Navbar.scss';

const Navbar = () => {

  const navigate = useNavigate();
  const { user, logOut } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (

    <nav className='navbar'>

      {user ? (

        <div>

          <a className='icon-a' onClick={() => {
            logOut();
            navigate('/login');
          }}>
            <FaCircleUser size={19} />
          </a>

        </div>

      ) : (

        <div>
          <Link to="/signup" className='icon-b'><FaRegUserCircle size={19} /></Link>
        </div>

      )}

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

        {isMenuOpen ? (
          <FaTimes className='menu-icon' size={18} onClick={handleMenuToggle} />
        ) : (
          <FaBars className='menu-icon' size={18} onClick={handleMenuToggle} />
        )}

        <Menu className='menu' right isOpen={isMenuOpen} onStateChange={({ isOpen }) => setIsMenuOpen(isOpen)}>
          <Link to="/" className="menu-item">Home</Link>
          <Link to="#" className="menu-item">About</Link>
          <Link to="#" className="menu-item">Contact</Link>
        </Menu>

      </div>

    </nav>
  );
}

export default Navbar;
