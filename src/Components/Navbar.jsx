import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaCircleUser } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { useUser } from '../context/UserContext';
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/LogoPittogramma.svg';
import './Navbar.scss';


export default function () {

  const navigate = useNavigate();
  const { user, logOut } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (

    <nav className='navbar'>

      <figure className='logo'>
        <a href="/">
          <img src={Logo} alt="Ethereal" />
        </a>
      </figure>


      <div className='nav-wrapper'>

        {user ? (
          <div>
            <Link className='icon-a' onClick={() => {
              logOut();
              navigate('/login');
            }}>
              <FaCircleUser size={19} />
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/signup" className='icon-b'><FaRegUserCircle size={19} /></Link>
          </div>
        )}

        <div className='menu-wrapper'>
          {isMenuOpen ? (
            <FaTimes className='menu-icon' size={18} onClick={handleMenuToggle} />
          ) : (
            <FaBars className='menu-icon' size={18} onClick={handleMenuToggle} />
          )}
           <div className="menu-overlay">
          <Menu className='menu' right isOpen={isMenuOpen} onStateChange={({ isOpen }) => setIsMenuOpen(isOpen)}>
            <a href="/" className="menu-item">Home</a>
            <hr />
            <a href="#" className="menu-item">About</a>
            <hr />
            <a href="#" className="menu-item">Contact</a>
            <hr />
          </Menu>
        </div>
        </div>
       
      </div>

    </nav>

  );
  
}